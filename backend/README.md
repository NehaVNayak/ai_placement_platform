# Resume Analyser

Domain-aware, ATS-optimised resume scoring system.

## Project Structure
- `backend/` — FastAPI + ML scoring engine (Python)
- `frontend/` — React UI (Vite)

## Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Frontend Setup
```bash
cd frontend/resume-frontend
npm install
npm run dev
```

## API
- `POST /evaluate` — upload PDF or TXT file
- `POST /evaluate-text` — paste raw text
- `GET /health` — status check

## Model Files
Download `resume_model.pkl` and `vectorizer.pkl` from:
[Google Drive link here]
Place them in `backend/models/`