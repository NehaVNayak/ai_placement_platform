# server/app/routes/resume_routes.py

import io
import re
import joblib
import pdfplumber
import nltk
import os

from typing import Optional
from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

from app.services.resume_scorer import score_resume

# Download NLTK data
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

router = APIRouter(prefix="/resume", tags=["Resume"])

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Load models
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "resume_model.pkl")
VEC_PATH = os.path.join(BASE_DIR, "models", "vectorizer.pkl")

try:
    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VEC_PATH)
    print("✅ Resume model loaded")
except FileNotFoundError as e:
    print(f"❌ Resume model missing: {e}")
    model = None
    vectorizer = None


# ──────────────────────────────────────────
# TEXT CLEANING
# ──────────────────────────────────────────
def clean_text(text: str) -> str:
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


# ──────────────────────────────────────────
# PDF TEXT EXTRACTION
# ──────────────────────────────────────────
def extract_text_from_pdf(file_bytes: bytes) -> str:
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        return '\n'.join(page.extract_text() or '' for page in pdf.pages)


# ──────────────────────────────────────────
# MAIN EVALUATION LOGIC
# ──────────────────────────────────────────
def run_evaluation(raw_resume: str, raw_jd: Optional[str] = None) -> dict:
    cleaned_resume = clean_text(raw_resume)
    word_count = len(cleaned_resume.split())

    if word_count < 20:
        raise HTTPException(
            status_code=422,
            detail="Resume too short or text could not be extracted."
        )

    cleaned_jd: Optional[str] = (
        clean_text(raw_jd) if raw_jd and raw_jd.strip() else None
    )

    # ML Prediction
    if model and vectorizer:
        vec = vectorizer.transform([cleaned_resume])
        category = model.predict(vec)[0]
        proba = model.predict_proba(vec)[0]
        confidence = round(float(max(proba)) * 100, 1)
    else:
        category = "Unknown"
        confidence = 0.0

    # Safe scorer call
    scores, suggestions = score_resume(cleaned_resume, cleaned_jd or "")

    # Confidence label
    if confidence >= 70:
        conf_label = "High"
    elif confidence >= 45:
        conf_label = "Medium"
    else:
        conf_label = "Low"

    return {
        "predicted_role": category,
        "confidence": confidence,
        "confidence_label": conf_label,
        "word_count": word_count,
        "jd_provided": cleaned_jd is not None,
        "scores": scores,
        "suggestions": suggestions,
    }


# ──────────────────────────────────────────
# API ENDPOINTS
# ──────────────────────────────────────────

@router.post("/evaluate")
async def evaluate_file(
    file: UploadFile = File(...),
    jd: Optional[UploadFile] = File(None),
):
    filename = file.filename or ""

    if not filename.lower().endswith(('.pdf', '.txt')):
        raise HTTPException(
            status_code=400,
            detail="Only .pdf and .txt files are supported."
        )

    file_bytes = await file.read()

    if not file_bytes:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty."
        )

    # Resume extraction
    if filename.lower().endswith('.pdf'):
        try:
            raw_resume = extract_text_from_pdf(file_bytes)
        except Exception:
            raise HTTPException(
                status_code=422,
                detail="Could not read PDF."
            )
    else:
        raw_resume = file_bytes.decode('utf-8', errors='ignore')

    # JD extraction
    raw_jd: Optional[str] = None

    if jd:
        jd_bytes = await jd.read()
        if jd_bytes:
            raw_jd = jd_bytes.decode('utf-8', errors='ignore')

    return run_evaluation(raw_resume, raw_jd)


# ──────────────────────────────────────────
# TEXT INPUT MODEL
# ──────────────────────────────────────────
class TextInput(BaseModel):
    resume_text: str
    jd_text: Optional[str] = None


@router.post("/evaluate-text")
async def evaluate_text(body: TextInput):
    if not body.resume_text or not body.resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="resume_text cannot be empty."
        )

    return run_evaluation(body.resume_text, body.jd_text)


# ──────────────────────────────────────────
# HEALTH CHECK
# ──────────────────────────────────────────
@router.get("/health")
def health():
    return {
        "status": "ok",
        "model_loaded": model is not None
    }