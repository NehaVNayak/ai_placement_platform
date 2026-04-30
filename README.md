# 🎯 AI Placement Preparation Platform

An intelligent web-based platform designed to help students prepare for placements through **AI-driven mock interviews, coding practice, aptitude training, and performance analytics**.

---

## 🚀 Features

### 👨‍🎓 Student Module

* AI-powered mock interviews (HR + Technical)
* Coding practice with real-time evaluation
* MCQ-based aptitude tests
* Personalized performance dashboard
* Progress tracking & recommendations

### 🧑‍🏫 Faculty Module

* Monitor student performance
* Analyze subject-wise progress
* Provide guidance & feedback

### 🏢 TPO (Training & Placement Officer) Module

* Track overall placement readiness
* View department-wise analytics
* Manage notifications & announcements

### 🤖 AI Integration

* Dynamic question generation
* Interview simulation using LLM APIs
* Smart feedback system

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* CSS / Custom UI Components

### Backend

* FastAPI (Python)
* REST APIs

### Database

* MongoDB

### AI / ML

* Groq API (LLM-based responses)
* Custom logic for question generation

---

## 📂 Project Structure

```
ai_placement_platform/
│
├── client/                # Frontend (React)
│   ├── src/
│   └── public/
│
├── server/                # Backend (FastAPI)
│   ├── app/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── utils/
│   │   └── services/
│   └── main.py
│
├── .gitignore
├── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ai_placement_platform.git
cd ai_placement_platform
```

---

### 2️⃣ Backend Setup

```bash
cd server
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

Create `.env` file:

```
GROQ_API_KEY=your_api_key_here
```

Run backend:

```bash
uvicorn main:app --reload
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside `server/`:

```
GROQ_API_KEY=your_api_key
MONGO_URI=your_mongodb_connection
```

⚠️ Never commit `.env` to GitHub.

---

## 📊 Key Functionalities

* AI Mock Interviews
* Coding Problem Evaluation
* Aptitude MCQ System
* Role-based Dashboards (Student / Faculty / TPO)
* Performance Analytics

---

## 🎯 Future Enhancements

* Resume analysis using AI
* Video-based mock interviews
* Company-specific preparation modules
* Real-time coding contests
* Deployment with Docker & CI/CD

---

## 🤝 Contributors

* Neha Nayak
* Pooja S D
* Smital Kaginkar
* Ambika Chavan

---

## 📌 Note

This project is developed as part of a placement preparation system to enhance student readiness using AI technologies.

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
