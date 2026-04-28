import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNextQuestion, submitAnswer } from "../api/practiceApi";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .tp-root {
    min-height: 100vh;
    background: #eef4e8;
    font-family: 'Manrope', sans-serif;
    color: #1a2a1a;
    display: flex;
    flex-direction: column;
  }

  /* NAV */
  .tp-nav {
    background: #1a3a1a;
    height: 52px;
    display: flex;
    align-items: center;
    padding: 0 28px;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .tp-nav-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
  }

  .tp-brand-dot {
    width: 9px; height: 9px;
    border-radius: 50%;
    background: #3ab43a;
    box-shadow: 0 0 0 2px rgba(58,180,58,0.25);
  }

  .tp-nav-actions {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .tp-nav-icon {
    width: 32px; height: 32px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: #3ab43a;
    cursor: pointer;
    transition: background 0.15s;
  }

  .tp-nav-icon:hover { background: rgba(255,255,255,0.1); }
  .tp-nav-icon svg { width: 17px; height: 17px; }
  .tp-nav-icon.bell { color: rgba(255,255,255,0.7); }

  .tp-nav-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: #4a7a4a;
    border: 2px solid rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #fff;
    cursor: pointer;
  }

  /* MAIN */
  .tp-main {
    flex: 1;
    max-width: 760px;
    margin: 0 auto;
    padding: 52px 24px 64px;
    width: 100%;
  }

  /* HERO */
  .tp-hero {
    text-align: center;
    margin-bottom: 36px;
  }

  .tp-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #2a7a2a;
    background: rgba(255,255,255,0.75);
    border: 1px solid rgba(60,160,60,0.2);
    border-radius: 20px;
    padding: 5px 14px;
    margin-bottom: 14px;
  }

  .tp-badge svg { width: 13px; height: 13px; }

  .tp-hero h1 {
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 800;
    color: #1a2a1a;
    letter-spacing: -0.025em;
    margin-bottom: 10px;
  }

  .tp-hero p {
    font-size: 15px;
    color: #7a906a;
  }

  /* QUESTION CARD */
  .tp-card {
    background: #fff;
    border-radius: 22px;
    border: 1px solid rgba(100,160,100,0.12);
    padding: 40px 40px 36px;
    box-shadow: 0 4px 20px rgba(60,100,60,0.07);
  }

  .tp-question-text {
    font-size: 22px;
    font-weight: 800;
    color: #1a2a1a;
    letter-spacing: -0.02em;
    line-height: 1.35;
    margin-bottom: 32px;
  }

  /* OPTIONS */
  .tp-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 0;
  }

  .tp-option {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 18px;
    border-radius: 14px;
    border: 1.5px solid #e0eadc;
    background: #fafcf8;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s, transform 0.1s;
    text-align: left;
    font-family: inherit;
    width: 100%;
    position: relative;
  }

  .tp-option:hover:not(:disabled) {
    border-color: #9aca9a;
    background: #f4faf4;
    transform: translateX(2px);
  }

  .tp-option:disabled { cursor: default; }

  .tp-option.correct {
    border-color: #198754;
    background: #f0faf4;
  }

  .tp-option.wrong {
    border-color: #e24b4a;
    background: #fef5f5;
  }

  .tp-option.dimmed {
    border-color: #e8ede8;
    background: #f8faf8;
    opacity: 0.6;
  }

  .tp-option-letter {
    width: 34px; height: 34px;
    border-radius: 10px;
    background: #eef4e8;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px;
    font-weight: 700;
    color: #5a7a5a;
    flex-shrink: 0;
    transition: background 0.15s, color 0.15s;
  }

  .tp-option.correct .tp-option-letter {
    background: #198754;
    color: #fff;
  }

  .tp-option.wrong .tp-option-letter {
    background: #e24b4a;
    color: #fff;
  }

  .tp-option-text {
    font-size: 15px;
    font-weight: 500;
    color: #2a3a2a;
    flex: 1;
    line-height: 1.4;
  }

  .tp-option.correct .tp-option-text { font-weight: 700; color: #1a3a1a; }

  .tp-option-check {
    width: 24px; height: 24px;
    border-radius: 50%;
    background: #198754;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .tp-option-check svg { width: 13px; height: 13px; color: #fff; }

  .tp-option-x {
    width: 24px; height: 24px;
    border-radius: 50%;
    background: #e24b4a;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .tp-option-x svg { width: 13px; height: 13px; color: #fff; }

  /* RESULT BOX */
  .tp-result {
    margin-top: 24px;
    padding: 18px 20px;
    border-radius: 14px;
    background: #f4faf4;
    border-left: 4px solid #198754;
  }

  .tp-result.wrong-result {
    background: #fef5f5;
    border-left-color: #e24b4a;
  }

  .tp-result-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .tp-result-title.correct-title { color: #198754; }
  .tp-result-title.wrong-title   { color: #e24b4a; }

  .tp-result-title svg { width: 18px; height: 18px; }

  .tp-result-body {
    font-size: 14px;
    color: #3a4a3a;
    line-height: 1.6;
  }

  .tp-result-body strong { color: #1a2a1a; }

  /* NEXT BTN */
  .tp-next-row {
    display: flex;
    justify-content: flex-end;
    margin-top: 28px;
  }

  .tp-next-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #1a3a1a;
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 15px 28px;
    font-size: 15px;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
    letter-spacing: -0.01em;
  }

  .tp-next-btn:hover { background: #198754; }
  .tp-next-btn:active { transform: scale(0.97); }
  .tp-next-btn svg { width: 17px; height: 17px; }

  /* STATES */
  .tp-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    gap: 16px;
    padding: 80px 24px;
    text-align: center;
  }

  .tp-state p {
    font-size: 16px;
    color: #6a806a;
  }

  .tp-spinner {
    width: 36px; height: 36px;
    border: 3px solid #d0e8d0;
    border-top-color: #198754;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  

  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 600px) {
    .tp-card { padding: 24px 20px; }
    .tp-question-text { font-size: 18px; }
    .tp-main { padding: 32px 12px 48px; }
  }
`;

const LETTERS = ["A", "B", "C", "D", "E"];

function TechnicalPractice() {
  const { subject } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    if (studentId) loadQuestion();
  }, [studentId, subject]);

  const loadQuestion = async () => {
    try {
      setLoading(true);
      const q = await getNextQuestion(studentId, subject);
      setQuestion(q);
      setSelected(null);
      setResult(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (opt) => {
    if (selected) return;
    setSelected(opt);
    try {
      const res = await submitAnswer({
        student_id: studentId,
        question_id: question._id,
        selected_option: opt,
      });
      setResult(res.correct);
    } catch (err) {
      console.error(err);
    }
  };

  const getOptionClass = (opt) => {
    if (!selected) return "";
    if (opt === question.correct_answer) return "correct";
    if (opt === selected && !result) return "wrong";
    return "dimmed";
  };

  const renderNav = () => (
    <nav className="tp-nav">
      <div className="tp-nav-brand">
        <div className="tp-brand-dot" />
        AI Placement Prep
      </div>
      <div className="tp-nav-actions">
        <div className="tp-nav-icon bell">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </div>
        <div className="tp-nav-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
        <div className="tp-nav-avatar">S</div>
      </div>
    </nav>
  );

  if (!studentId) return (
    <>
      <style>{css}</style>
      <div className="tp-root">{renderNav()}<div className="tp-state"><p>Please login again.</p></div></div>
    </>
  );

  if (loading) return (
    <>
      <style>{css}</style>
      <div className="tp-root">{renderNav()}<div className="tp-state"><div className="tp-spinner" /><p>Loading question...</p></div></div>
    </>
  );

  if (!question) return (
    <>
      <style>{css}</style>
      <div className="tp-root">{renderNav()}<div className="tp-state"><p>No question available for this subject.</p></div></div>
    </>
  );

  return (
    <>
      <style>{css}</style>
      <div className="tp-root">
        {renderNav()}

        <main className="tp-main">

          {/* HERO */}
          <div className="tp-hero">
            <div className="tp-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              Smart Practice Engine
            </div>
            <h1>{subject} Practice</h1>
            <p>Answer adaptive interview questions and improve topic mastery.</p>
          </div>

          {/* QUESTION CARD */}
          <div className="tp-card">
            <p className="tp-question-text">{question.question_text}</p>

            <div className="tp-options">
              {question.options.map((opt, i) => {
                const cls = getOptionClass(opt);
                const isCorrectSelected = selected && opt === question.correct_answer;
                const isWrongSelected = selected && opt === selected && !result;

                return (
                  <button
                    key={i}
                    className={`tp-option ${cls}`}
                    onClick={() => handleAnswer(opt)}
                    disabled={!!selected}
                  >
                    <div className="tp-option-letter">{LETTERS[i]}</div>
                    <span className="tp-option-text">{opt}</span>
                    {isCorrectSelected && (
                      <div className="tp-option-check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                    )}
                    {isWrongSelected && (
                      <div className="tp-option-x">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* RESULT */}
            {selected && (
              <>
                <div className={`tp-result ${result ? "" : "wrong-result"}`}>
                  <div className={`tp-result-title ${result ? "correct-title" : "wrong-title"}`}>
                    {result ? (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        Correct Answer!
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="15" y1="9" x2="9" y2="15"/>
                          <line x1="9" y1="9" x2="15" y2="15"/>
                        </svg>
                        Wrong Answer
                      </>
                    )}
                  </div>
                  <div className="tp-result-body">
                    <strong>Explanation: </strong>
                    {question.explanation || "No explanation available."}
                  </div>
                </div>

                <div className="tp-next-row">
                  <button className="tp-next-btn" onClick={loadQuestion}>
                    Next Question
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>

        </main>
      </div>
    </>
  );
}

export default TechnicalPractice;