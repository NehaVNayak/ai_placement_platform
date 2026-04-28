import io
import os
import re
import joblib
import pdfplumber
import nltk
from app.config.database import students_collection
from bson import ObjectId

from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from pydantic import BaseModel
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from app.routes.resume_scorer import score_resume

nltk.download('stopwords', quiet=True)
nltk.download('wordnet',   quiet=True)

lemmatizer = WordNetLemmatizer()
stop_words  = set(stopwords.words('english'))

BASE_DIR   = os.path.dirname(os.path.dirname(__file__))  # → server/app/
MODELS_DIR = os.path.join(BASE_DIR, 'models')            # → server/app/models/
model      = joblib.load(os.path.join(MODELS_DIR, 'resume_model.pkl'))
vectorizer = joblib.load(os.path.join(MODELS_DIR, 'vectorizer.pkl'))


router = APIRouter()

def clean_for_model(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r'http\S+|www\S+', '', text)
    text = re.sub(r'\S+@\S+', '', text)
    text = re.sub(r'[\+\(]?[1-9][0-9\s\-\(\)]{8,}[0-9]', '', text)
    text = re.sub(r'[^a-z\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    tokens = [
        lemmatizer.lemmatize(w)
        for w in text.split()
        if w not in stop_words and len(w) > 2
    ]
    return ' '.join(tokens)

def clean_for_scoring(text: str) -> str:
    text = str(text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text.lower()

def extract_text_from_pdf(file_bytes: bytes) -> str:
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        return '\n'.join(page.extract_text() or '' for page in pdf.pages)

def run_evaluation(raw_resume: str, raw_jd: str | None = None) -> dict:
    model_input = clean_for_model(raw_resume)
    word_count  = len(model_input.split())

    if word_count < 20:
        raise HTTPException(status_code=422, detail="Resume too short or text could not be extracted.")

    scoring_input = clean_for_scoring(raw_resume)
    scoring_jd    = clean_for_scoring(raw_jd) if raw_jd and raw_jd.strip() else None

    vec        = vectorizer.transform([model_input])
    category   = model.predict(vec)[0]
    proba      = model.predict_proba(vec)[0]
    confidence = round(float(max(proba)) * 100, 1)

    scores, suggestions = score_resume(scoring_input, scoring_jd)

    conf_label = "High" if confidence >= 70 else "Medium" if confidence >= 45 else "Low"

    return {
        "predicted_role"  : category,
        "confidence"      : confidence,
        "confidence_label": conf_label,
        "word_count"      : len(raw_resume.split()),
        "jd_provided"     : scoring_jd is not None,
        "scores": {
            "technical"   : scores["technical"],
            "soft"        : scores["soft"],
            "action_verbs": scores["action_verbs"],
            "length"      : scores["length"],
            "ats"         : scores["ats"],
            "overall"     : scores["overall"],
        },
        "suggestions": suggestions,
    }


# ── Endpoint 1: File upload (PDF or TXT) ──────────────────────

@router.post("/evaluate")
async def evaluate_file(
    file: UploadFile = File(...),
    jd: UploadFile = File(None),
    student_id: str = Form(None),   # ← accepts student_id from FormData
):
    filename = file.filename or ""
    if not filename:
        raise HTTPException(status_code=400, detail="Resume file must have a valid filename.")
    if not filename.lower().endswith(('.pdf', '.txt')):
        raise HTTPException(status_code=400, detail="Only .pdf and .txt files are supported.")

    file_bytes = await file.read()
    if not file_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    if filename.lower().endswith('.pdf'):
        try:
            raw_resume = extract_text_from_pdf(file_bytes)
        except Exception:
            raise HTTPException(status_code=422, detail="Could not read PDF. Make sure it is not password-protected or image-only.")
    else:
        raw_resume = file_bytes.decode('utf-8', errors='ignore')

    raw_jd = None
    if jd:
        jd_bytes = await jd.read()
        if jd_bytes:
            raw_jd = jd_bytes.decode('utf-8', errors='ignore')

    result = run_evaluation(raw_resume, raw_jd)

    # Save score to MongoDB if student_id provided
    if student_id:
        try:
            students_collection.update_one(
                {"_id": ObjectId(student_id)},
                {"$set": {"resume_score": result["scores"]["overall"]}}
            )
        except Exception as e:
            print(f"Warning: Could not save resume score: {e}")

    return result


# ── Endpoint 2: Paste text directly ───────────────────────────

class TextInput(BaseModel):
    resume_text: str
    jd_text    : str | None = None
    student_id : str | None = None   # ← added


@router.post("/evaluate-text")
async def evaluate_text(body: TextInput):
    if not body.resume_text or not body.resume_text.strip():
        raise HTTPException(status_code=400, detail="resume_text cannot be empty.")

    result = run_evaluation(body.resume_text, body.jd_text)

    # Save score to MongoDB if student_id provided
    if body.student_id:
        try:
            students_collection.update_one(
                {"_id": ObjectId(body.student_id)},
                {"$set": {"resume_score": result["scores"]["overall"]}}
            )
        except Exception as e:
            print(f"Warning: Could not save resume score: {e}")

    return result


# ── Endpoint 3: Get resume score for dashboard ────────────────

@router.get("/score")
def get_resume_score(student_id: str):
    try:
        student = students_collection.find_one({"_id": ObjectId(student_id)})
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")
        return {"resume_score": student.get("resume_score", None)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid student_id: {e}")