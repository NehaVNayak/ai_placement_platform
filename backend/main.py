# main.py  —  FastAPI backend for AI Resume Evaluator
# ─────────────────────────────────────────────────────────────
#  Run locally:
#    uvicorn main:app --reload --port 8000
#
#  Endpoints:
#    POST /evaluate        → upload a PDF or TXT file
#    POST /evaluate-text   → paste raw resume text
# ─────────────────────────────────────────────────────────────

import io
import os
import re
import joblib
import pdfplumber
import nltk

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

from step8_scorer import score_resume

# ── NLTK setup ────────────────────────────────────────────────
nltk.download('stopwords', quiet=True)
nltk.download('wordnet',   quiet=True)

lemmatizer = WordNetLemmatizer()
stop_words  = set(stopwords.words('english'))

# ── Load ML model once at startup ─────────────────────────────
try:
    BASE_DIR   = os.path.dirname(__file__)
    model      = joblib.load(os.path.join(BASE_DIR, 'models', 'resume_model.pkl'))
    vectorizer = joblib.load(os.path.join(BASE_DIR, 'models', 'vectorizer.pkl'))
    print("✅ Model loaded successfully")
except FileNotFoundError as e:
    raise RuntimeError(
        f"❌ Model file missing: {e}\n"
        "Make sure resume_model.pkl and vectorizer.pkl are in the same folder."
    )

# ── FastAPI app ────────────────────────────────────────────────
app = FastAPI(
    title="AI Resume Evaluator API",
    description="Upload a resume and get instant AI-powered feedback.",
    version="1.0.0",
)

# ── CORS — allow React dev server + your future domain ────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://localhost:3000",   # CRA fallback
        "*",                       # remove this in production!
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Shared helpers ─────────────────────────────────────────────

def clean_for_model(text: str) -> str:
    """Heavy normalization — only for ML model prediction."""
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
    """Light normalization — preserves numbers, dates, symbols for rule-based scoring."""
    text = str(text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text.lower()


def extract_text_from_pdf(file_bytes: bytes) -> str:
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        return '\n'.join(page.extract_text() or '' for page in pdf.pages)


def run_evaluation(raw_resume: str, raw_jd: str | None = None) -> dict:

    # For ML model — heavy clean
    model_input = clean_for_model(raw_resume)
    word_count  = len(model_input.split())

    if word_count < 20:
        raise HTTPException(
            status_code=422,
            detail="Resume too short or text could not be extracted."
        )

    # For rule-based scoring — light clean, keeps numbers/dates/symbols
    scoring_input  = clean_for_scoring(raw_resume)
    scoring_jd     = clean_for_scoring(raw_jd) if raw_jd and raw_jd.strip() else None

    # ML prediction uses heavy-cleaned text
    vec        = vectorizer.transform([model_input])
    category   = model.predict(vec)[0]
    proba      = model.predict_proba(vec)[0]
    confidence = round(float(max(proba)) * 100, 1)

    # Scoring uses lightly-cleaned text — numbers/dates/emails intact
    scores, suggestions = score_resume(scoring_input, scoring_jd)

    if confidence >= 70:
        conf_label = "High"
    elif confidence >= 45:
        conf_label = "Medium"
    else:
        conf_label = "Low"

    return {
        "predicted_role"  : category,
        "confidence"      : confidence,
        "confidence_label": conf_label,
        "word_count"      : len(raw_resume.split()),  # show real word count
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

@app.post("/evaluate")
async def evaluate_file(
    file: UploadFile = File(...),
    jd: UploadFile = File(None),   # optional job description file
):
    # -------------------------------
    # 1. Safe filename handling
    # -------------------------------
    filename = file.filename or ""

    if not filename:
        raise HTTPException(
            status_code=400,
            detail="Resume file must have a valid filename."
        )

    if not filename.lower().endswith(('.pdf', '.txt')):
        raise HTTPException(
            status_code=400,
            detail="Only .pdf and .txt files are supported."
        )

    # -------------------------------
    # 2. Read file
    # -------------------------------
    file_bytes = await file.read()

    if not file_bytes:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty."
        )

    # -------------------------------
    # 3. Extract resume text
    # -------------------------------
    if filename.lower().endswith('.pdf'):
        try:
            raw_resume = extract_text_from_pdf(file_bytes)
        except Exception:
            raise HTTPException(
                status_code=422,
                detail="Could not read PDF. Make sure it is not password-protected or image-only."
            )
    else:
        raw_resume = file_bytes.decode('utf-8', errors='ignore')

    # -------------------------------
    # 4. Extract JD (optional)
    # -------------------------------
    raw_jd = None
    if jd:
        jd_bytes = await jd.read()
        if jd_bytes:
            raw_jd = jd_bytes.decode('utf-8', errors='ignore')

    # -------------------------------
    # 5. Run evaluation
    # -------------------------------
    return run_evaluation(raw_resume, raw_jd)

# ── Endpoint 2: Paste text directly ───────────────────────────

class TextInput(BaseModel):
    resume_text: str
    jd_text    : str | None = None   # optional job description


@app.post("/evaluate-text")
async def evaluate_text(body: TextInput):
    if not body.resume_text or not body.resume_text.strip():
        raise HTTPException(status_code=400, detail="resume_text cannot be empty.")
    return run_evaluation(body.resume_text, body.jd_text)


# ── Health check ───────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": True}


# ── Run directly ───────────────────────────────────────────────
if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)