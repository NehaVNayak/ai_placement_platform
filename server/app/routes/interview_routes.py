from fastapi import APIRouter, UploadFile, File
import shutil
import os
import whisper
import subprocess
from dotenv import load_dotenv
import librosa
import numpy as np
import re

router = APIRouter()

load_dotenv()

VIDEO_FOLDER = "uploads/interviews"
AUDIO_FOLDER = "uploads/audio"
TRANSCRIPT_FOLDER = "uploads/transcripts"

os.makedirs(VIDEO_FOLDER, exist_ok=True)
os.makedirs(AUDIO_FOLDER, exist_ok=True)
os.makedirs(TRANSCRIPT_FOLDER, exist_ok=True)

print("Loading Whisper model...")
model = whisper.load_model("base")
print("Whisper model loaded successfully")

# ─────────────────────────── QUESTIONS ─────────────────────────── #

tech_questions = [
    "Explain object-oriented programming and its four pillars.",
    "What is polymorphism? Give a real-world example.",
    "What is database normalization and why does it matter?",
    "Explain REST API design principles.",
    "What is the difference between SQL and NoSQL databases?",
    "What is a primary key and how does it differ from a foreign key?",
    "Explain database indexing and when you would use it.",
    "What is Git and explain branching strategies you've used.",
    "Explain the MVC architecture pattern.",
    "What is the difference between synchronous and asynchronous programming?",
    "Walk me through your most impactful project.",
    "What is machine learning and name a use case you find interesting?",
    "How does OAuth2 work for API authentication?",
    "What are the benefits of cloud computing over on-premise infrastructure?",
    "What are microservices and when would you choose them over a monolith?",
]

nontech_questions = [
    "Tell me about yourself and your journey so far.",
    "Why should we hire you over other candidates?",
    "What are your top three strengths?",
    "Describe a weakness and how you're actively working on it.",
    "Tell me about a challenging situation you faced and how you resolved it.",
    "Where do you see yourself in five years?",
    "Why do you want to work at this company specifically?",
    "Tell me about a time you led a team or initiative.",
    "How do you handle pressure and tight deadlines?",
    "What motivates you to do your best work?",
    "Describe a failure you experienced and what you learned from it.",
    "How do you prioritize tasks when everything feels urgent?",
    "Tell me about a time you had to collaborate with a difficult teammate.",
    "How do you respond to constructive criticism?",
    "What are your long-term career goals?",
]

@router.get("/questions/{category}")
def get_questions(category: str):
    if category == "tech":
        return {"questions": tech_questions}
    if category == "nontech":
        return {"questions": nontech_questions}
    return {"questions": []}


# ─────────────────────────── AUDIO EXTRACTION ─────────────────────────── #

def extract_audio(video_path: str, audio_path: str) -> bool:
    try:
        subprocess.run(
            ["ffmpeg", "-i", video_path, "-vn", "-ac", "1", "-ar", "16000", audio_path, "-y"],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True
        )
        return True
    except Exception as e:
        print("FFmpeg error:", e)
        return False


# ─────────────────────────── VOICE ANALYSIS ─────────────────────────── #

def analyze_voice(audio_path: str, transcript: str) -> dict:
    try:
        y, sr = librosa.load(audio_path, sr=None)
        duration = librosa.get_duration(y=y, sr=sr)
        words = len(transcript.split())
        wpm = (words / duration * 60) if duration > 0 else 0

        rms = float(np.mean(librosa.feature.rms(y=y)))
        energy_score = min(100, rms * 5000)

        pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
        active = pitches[magnitudes > np.max(magnitudes) * 0.1]
        pitch_std = float(np.std(active)) if len(active) > 0 else 0
        expressiveness_score = min(100, pitch_std * 2)

        if 120 <= wpm <= 160:
            pace_score = 100
        elif 90 <= wpm < 120 or 160 < wpm <= 180:
            pace_score = 75
        elif 60 <= wpm < 90 or 180 < wpm <= 210:
            pace_score = 50
        else:
            pace_score = 30

        voice_confidence = round(
            energy_score * 0.4 + expressiveness_score * 0.3 + pace_score * 0.3, 1
        )

        return {
            "speaking_speed_wpm": round(wpm, 1),
            "duration_sec": round(duration, 1),
            "energy_score": round(energy_score, 1),
            "expressiveness_score": round(expressiveness_score, 1),
            "pace_score": round(pace_score, 1),
            "voice_confidence": voice_confidence,
        }

    except Exception as e:
        print("Voice analysis error:", e)
        return {
            "speaking_speed_wpm": 0,
            "duration_sec": 0,
            "energy_score": 50,
            "expressiveness_score": 50,
            "pace_score": 50,
            "voice_confidence": 50,
        }


# ─────────────────────────── TEXT FEATURE EXTRACTION ─────────────────────────── #

def extract_text_features(transcript: str) -> dict:
    words = transcript.split()
    word_count = len(words)

    sentences = re.split(r"[.!?]+", transcript)
    sentences = [s.strip() for s in sentences if s.strip()]
    sentence_count = max(len(sentences), 1)
    avg_sentence_length = word_count / sentence_count

    fillers = ["um", "uh", "like", "you know", "basically", "literally",
               "kind of", "sort of", "i mean", "right", "actually"]
    filler_count = sum(transcript.lower().count(f) for f in fillers)
    filler_rate = filler_count / max(word_count, 1)

    star_keywords = {
        "situation": ["situation", "context", "background", "was working", "at the time", "i was"],
        "task": ["task", "responsibility", "goal", "needed to", "had to", "my role"],
        "action": ["i did", "i took", "i implemented", "i built", "i led", "i decided",
                   "i reached out", "i created", "action", "approached"],
        "result": ["result", "outcome", "achieved", "improved", "reduced", "increased",
                   "successfully", "as a result", "which led to", "impact"],
    }

    star_score = sum(
        1 for kws in star_keywords.values()
        if any(kw in transcript.lower() for kw in kws)
    )

    tech_keywords = [
        "api", "database", "sql", "algorithm", "system", "design", "react", "python",
        "backend", "frontend", "server", "architecture", "rest", "microservice", "cloud",
        "docker", "kubernetes", "cache", "queue", "async", "oop", "class", "function",
        "endpoint", "schema", "index", "query", "nosql", "redis",
    ]

    tech_count = sum(1 for w in words if w.lower() in tech_keywords)
    tech_density = min(1.0, tech_count / max(word_count, 1) * 10)

    quantified = bool(re.search(r"\b\d+\s*(%|percent|users|customers|ms|seconds|x|times|hours|days)\b", transcript.lower()))

    return {
        "word_count": word_count,
        "sentence_count": sentence_count,
        "avg_sentence_length": round(avg_sentence_length, 2),
        "filler_count": filler_count,
        "filler_rate": round(filler_rate, 4),
        "star_score": star_score,
        "tech_count": tech_count,
        "tech_density": round(tech_density, 3),
        "quantified": quantified,
    }


# ─────────────────────────── MAIN EVALUATION ─────────────────────────── #

def evaluate(transcript: str, audio_path: str) -> dict:
    features = extract_text_features(transcript)
    voice    = analyze_voice(audio_path, transcript)

    wc  = features["word_count"]
    asl = features["avg_sentence_length"]
    fr  = features["filler_rate"]

    comm = 0

    if 12 <= asl <= 20:
        comm += 35
    elif 8 <= asl < 12 or 20 < asl <= 26:
        comm += 22
    elif 5 <= asl < 8:
        comm += 12
    else:
        comm += 5

    if wc >= 120:
        comm += 30
    elif wc >= 80:
        comm += 22
    elif wc >= 50:
        comm += 14
    elif wc >= 20:
        comm += 7

    comm += features["star_score"] * 6

    filler_penalty = min(10, int(fr * 200))
    comm = max(0, comm - filler_penalty)

    if features["quantified"]:
        comm = min(100, comm + 6)

    comm = round(min(100, comm))

    tech = round(min(100, features["tech_density"] * 50))

    conf = round(min(100, voice["voice_confidence"]))

    overall_score = round(comm * 0.35 + tech * 0.35 + conf * 0.30, 1)

    return {
        "communication": comm,
        "technical": tech,
        "confidence": conf,
        "overall_score": overall_score,
    }


# ─────────────────────────── UPLOAD ENDPOINT ─────────────────────────── #

@router.post("/upload")
async def upload_interview(video: UploadFile = File(...)):
    try:
        filename = video.filename.replace(" ", "_")
        video_path = os.path.join(VIDEO_FOLDER, filename)

        with open(video_path, "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)

        audio_name = filename.rsplit(".", 1)[0] + ".wav"
        audio_path = os.path.join(AUDIO_FOLDER, audio_name)

        if not extract_audio(video_path, audio_path):
            return {"error": "Audio extraction failed"}

        result     = model.transcribe(audio_path)
        transcript = result["text"].strip()

        evaluation   = evaluate(transcript, audio_path)
        voice_details = analyze_voice(audio_path, transcript)

        return {
            "transcript": transcript,
            "evaluation": evaluation,
            "voice_details": voice_details,
            "confidence_score": evaluation["confidence"],
        }

    except Exception as e:
        print("UPLOAD ERROR:", e)
        return {"error": str(e)}