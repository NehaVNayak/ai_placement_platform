# AI Placement Prep Platform

A full-stack AI-powered placement preparation platform for students, featuring coding practice, mock interviews, aptitude tests, resume analysis, and performance tracking.

---

## 📁 Project Structure

```
ai_placement_platform/
├── server/                        # Main backend (FastAPI)
│   ├── app/
│   │   ├── config/
│   │   │   └── database.py        # MongoDB connection
│   │   ├── middleware/
│   │   ├── models/
│   │   │   ├── faculty_model.py
│   │   │   ├── question_model.py
│   │   │   ├── student_model.py   ← MODIFIED (resume_score field added)
│   │   │   ├── resume_model.pkl   ← NEW (Resume ML model)
│   │   │   └── vectorizer.pkl     ← NEW (Resume ML vectorizer)
│   │   ├── routes/
│   │   │   ├── resume_routes.py   ← NEW (Resume Analyser API)
│   │   │   ├── resume_scorer.py   ← NEW (Resume scoring logic)
│   │   │   └── ... (other routes)
│   │   └── main.py                ← MODIFIED (resume router registered)
│   └── requirements.txt           ← NEW
├── src/                           # React frontend
│   └── pages/
│       ├── Resume/
│       │   ├── ResumePage.jsx         ← NEW
│       │   ├── ResumeInputpanel.jsx   ← NEW
│       │   ├── ResumeResultspanel.jsx ← NEW
│       │   ├── ResumeNavbar.jsx       ← NEW
│       │   ├── ResumeFooter.jsx       ← NEW
│       │   └── resume.css             ← NEW
│       ├── StudentDashboard.jsx       ← MODIFIED (dynamic resume score)
│       └── ...
├── App.jsx                            ← MODIFIED (/resume route added)
└── README.md
```

---

## ✅ What Was Added / Changed (Pooja's Contribution)

### 🔧 Backend Changes

#### 1. `server/app/routes/resume_routes.py` ← NEW FILE
- Integrated the standalone Resume Analyser FastAPI backend into the main server
- Added three API endpoints:
  - `POST /api/resume/evaluate` — accepts PDF or TXT file upload + optional `student_id`, returns AI analysis and saves score to MongoDB
  - `POST /api/resume/evaluate-text` — accepts pasted resume text + optional `student_id`, returns AI analysis and saves score to MongoDB
  - `GET /api/resume/score?student_id=xxx` — returns the student's last resume score from MongoDB for the dashboard
- Handles PDF text extraction using `pdfplumber`
- ML model prediction using `scikit-learn` + `joblib`
- Rule-based scoring using `resume_scorer.py`
- Saves `resume_score` to student's MongoDB document after every analysis

#### 2. `server/app/routes/resume_scorer.py` ← NEW FILE
- Copied and renamed from the standalone `backend/step8_scorer.py`
- Contains all rule-based resume scoring logic (technical, soft skills, ATS, action verbs, length)
- Used by `resume_routes.py` to generate scores and suggestions

#### 3. `server/app/models/resume_model.pkl` ← NEW FILE
- Pre-trained ML classification model for predicting job role from resume text

#### 4. `server/app/models/vectorizer.pkl` ← NEW FILE
- TF-IDF vectorizer used alongside the ML model

#### 5. `server/app/models/student_model.py` ← MODIFIED
Added `resume_score` field to store the last analysis result:
```python
resume_score: Optional[int] = None
```

#### 6. `server/app/main.py` ← MODIFIED
Added these two lines to register the resume router:
```python
from app.routes.resume_routes import router as resume_router
app.include_router(resume_router, prefix="/api/resume")
```

---

### 🎨 Frontend Changes

#### 1. `src/pages/Resume/ResumePage.jsx` ← NEW FILE
- Main resume analyser page component
- Sends `student_id` from localStorage to the backend with every analysis request
- After analysis, score is automatically saved to MongoDB via the backend
- File mode: `student_id` appended to `FormData`
- Text mode: `student_id` included in JSON body

#### 2. `src/pages/Resume/ResumeInputpanel.jsx` ← NEW FILE
- Handles file upload (PDF/TXT), text paste mode, job description accordion
- Drag and drop support

#### 3. `src/pages/Resume/ResumeResultspanel.jsx` ← NEW FILE
- Displays radar chart, score bars, overall score ring, and AI suggestions
- Uses `recharts` for visualizations

#### 4. `src/pages/Resume/ResumeNavbar.jsx` ← NEW FILE
- Resume analyser's own navbar

#### 5. `src/pages/Resume/ResumeFooter.jsx` ← NEW FILE
- Resume analyser's own footer

#### 6. `src/pages/Resume/resume.css` ← NEW FILE
- Contains all CSS variables (`--green`, `--border`, `--radius` etc.) and animations used by resume components

#### 7. `src/pages/StudentDashboard.jsx` ← MODIFIED
- Added `resumeScore` state
- Added `fetchResumeScore()` function that calls `GET /api/resume/score` on page load
- **Resume Status bar** now shows real score from MongoDB instead of static 92%
- **Resume Score stat tile** now shows real score from MongoDB instead of static 84/100
- Shows `N/A` / `—` if student hasn't analysed their resume yet

#### 8. `src/App.jsx` ← MODIFIED
Added import and protected route for `/resume`:
```jsx
import ResumePage from "./pages/Resume/ResumePage";

<Route
  path="/resume"
  element={
    <ProtectedRoute allowedRole="STUDENT">
      <ResumePage />
    </ProtectedRoute>
  }
/>
```

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.10+ (3.12 works)
- Node.js 18+
- npm or yarn
- MongoDB running locally on port 27017
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/NehaVNayak/ai_placement_platform
cd ai_placement_platform
```

---

### 2. Backend Setup

```bash
cd server
```

#### Create and activate virtual environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python -m venv venv
source venv/bin/activate
```

#### Install all dependencies
```bash
pip install -r requirements.txt
```

#### Download NLTK data (one time only)
```bash
python -c "import nltk; nltk.download('stopwords'); nltk.download('wordnet')"
```

#### Set up environment variables
Create a `.env` file inside `server/` with:
```
DATABASE_URL=mongodb://localhost:27017
SECRET_KEY=your_secret_key_here
```

#### Run the backend
```bash
uvicorn app.main:app --reload --port 8000
```

Backend will be running at: `http://localhost:8000`

---

### 3. Frontend Setup

Open a new terminal from the project root:

```bash
npm install
npm run dev
```

Frontend will be running at: `http://localhost:5173`

---

### 4. Start MongoDB

Make sure MongoDB is running before starting the backend:
```bash
# Windows (if installed as service it starts automatically)
# Or run manually:
mongod

# Mac/Linux
sudo systemctl start mongod
```

---

### 5. Verify Resume Analyser is Working

Once both are running:
1. Log in as a student
2. Click **"Analyse Resume"** from the dashboard
3. Upload a PDF resume or paste resume text
4. Click **"Begin Scholarly Evaluation"**
5. Results appear with scores and suggestions
6. Go back to dashboard — **Resume Status bar** and **Resume Score tile** now show the real score

You can also test the API directly:
```
GET  http://localhost:8000/                                    → {"message": "Backend running"}
POST http://localhost:8000/api/resume/evaluate                 → file upload
POST http://localhost:8000/api/resume/evaluate-text            → text paste
GET  http://localhost:8000/api/resume/score?student_id=xxx     → fetch score for dashboard
```

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `fastapi` | Backend web framework |
| `uvicorn` | ASGI server |
| `pymongo` | MongoDB connection |
| `pdfplumber` | Extract text from PDF resumes |
| `joblib` | Load ML model and vectorizer |
| `nltk` | Text preprocessing |
| `scikit-learn` | ML model (resume role prediction) |
| `librosa` | Audio processing for mock interview |
| `openai-whisper` | Speech to text for mock interview |
| `recharts` | Charts in resume results panel |
| `python-multipart` | Handle file uploads in FastAPI |

---

## 🔗 API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Student login |
| POST | `/api/auth/register` | Student register |
| GET | `/api/dashboard/stats` | Dashboard stats |
| POST | `/api/resume/evaluate` | Analyse resume (file upload) — saves score to DB |
| POST | `/api/resume/evaluate-text` | Analyse resume (text paste) — saves score to DB |
| GET | `/api/resume/score` | Get student's last resume score for dashboard |
| GET | `/api/practice/...` | Practice routes |
| GET | `/api/aptitude/...` | Aptitude routes |
| POST | `/api/interview/...` | Mock interview routes |

---

## ⚠️ Common Issues

**`ModuleNotFoundError: No module named 'librosa'`**
```bash
pip install librosa soundfile audioread
```

**`FileNotFoundError: resume_model.pkl`**
- Make sure `resume_model.pkl` and `vectorizer.pkl` are inside `server/app/models/`

**`ModuleNotFoundError: No module named 'pdfplumber'`**
```bash
pip install pdfplumber
```

**Resume score not showing on dashboard**
- Make sure you have analysed your resume at least once via the Analyse Resume page
- Check that `student_id` is stored in localStorage after login
- Verify MongoDB is running and the student document exists

**Frontend not connecting to backend**
- Make sure backend is running on port 8000
- Check that CORS is enabled in `main.py`

---

## 🌿 Git Branch Info

This feature was developed on branch: `pooja/resume-analyser`

```bash
# To switch to this branch
git checkout pooja/resume-analyser

# To see all branches
git branch -a
```
Also added analytics part
