import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getNextProgrammingQuestion,
  submitProgrammingAnswer,
} from "../api/practiceApi";

const OPTION_LABELS = ["A", "B", "C", "D"];

/* HEADER */
function Header() {
  return (
    <nav style={styles.nav}>
      <div style={styles.navBrand}>
        <div style={styles.brandDot} />
        AI Placement Prep
      </div>

      <div style={styles.navActions}>
        {/* Bell */}
        <div style={styles.navIcon}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="18"
            height="18"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>

        {/* Bolt */}
        <div style={styles.navIcon}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="18"
            height="18"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>

        {/* Avatar */}
        <div style={styles.avatar}>S</div>
      </div>
    </nav>
  );
}

function ProgrammingPractice() {
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

      const q = await getNextProgrammingQuestion(studentId, subject);

      setQuestion(q);
      setSelected(null);
      setResult(null);
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (option) => {
    if (selected !== null) return;

    setSelected(option);

    try {
      const res = await submitProgrammingAnswer({
        studentId,
        question_id: question._id,
        selected_option: option,
      });

      setResult(res.correct);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const getOptionStyle = (opt) => {
    const base = { ...styles.optionBtn };

    if (!selected) return base;

    if (opt === question.correct_answer) {
      return { ...base, ...styles.optionCorrect };
    }

    if (opt === selected && !result) {
      return { ...base, ...styles.optionWrong };
    }

    return { ...base, ...styles.optionDim };
  };

  const getLabelStyle = (opt) => {
    const base = { ...styles.optionLabel };

    if (!selected) return base;

    if (opt === question.correct_answer) {
      return { ...base, ...styles.labelCorrect };
    }

    if (opt === selected && !result) {
      return { ...base, ...styles.labelWrong };
    }

    return { ...base, ...styles.labelDim };
  };

  if (!studentId) {
    return (
      <>
        <Header />
        <p style={styles.stateText}>Please login again.</p>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Header />
        <p style={styles.stateText}>Loading question...</p>
      </>
    );
  }

  if (!question) {
    return (
      <>
        <Header />
        <p style={styles.stateText}>No question available.</p>
      </>
    );
  }

  return (
    <>
      <Header />

      <div style={styles.container}>
        {/* Badge */}
        <div style={styles.badge}>
          <span style={styles.badgeDot}>✦</span>
          SMART PRACTICE ENGINE
        </div>

        {/* Title */}
        <h1 style={styles.title}>{subject} Practice</h1>

        <p style={styles.subtitle}>
          Answer adaptive interview questions and improve topic mastery.
        </p>

        {/* Card */}
        <div style={styles.card}>
          <h2 style={styles.questionText}>{question.question_text}</h2>

          <div style={styles.optionsWrapper}>
            {question.options.map((opt, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(opt)}
                disabled={!!selected}
                style={getOptionStyle(opt)}
              >
                <span style={getLabelStyle(opt)}>
                  {OPTION_LABELS[index]}
                </span>

                <span style={styles.optionText}>{opt}</span>

                {selected && opt === question.correct_answer && (
                  <span style={styles.checkIcon}>✓</span>
                )}
              </button>
            ))}
          </div>

          {/* Result */}
          {selected && (
            <>
              <div
                style={{
                  ...styles.resultBox,
                  borderLeftColor: result ? "#1a7a4a" : "#c0392b",
                  background: result ? "#f0fdf4" : "#fff5f5",
                }}
              >
                <p
                  style={{
                    ...styles.resultLabel,
                    color: result ? "#1a7a4a" : "#c0392b",
                  }}
                >
                  {result ? "✓ Correct Answer!" : "✗ Wrong Answer"}
                </p>

                <p style={styles.explanationText}>
                  <strong>Explanation: </strong>
                  {question.explanation || "No explanation available."}
                </p>
              </div>

              <div style={styles.nextRow}>
                <button onClick={loadQuestion} style={styles.nextBtn}>
                  Next Question →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  /* NAVBAR */
  nav: {
    height: "64px",
    background:
      "linear-gradient(90deg, #0c3b0c 0%, #0d4d12 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  navBrand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "700",
  },

  brandDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#22c55e",
  },

  navActions: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    color: "#34d399",
  },

  navIcon: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#fff",
    color: "#111",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "14px",
  },

  /* PAGE */
  container: {
    minHeight: "100vh",
    background: "#f5f7f0",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Geist', 'DM Sans', system-ui, sans-serif",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(26,122,74,0.1)",
    color: "#1a7a4a",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.1em",
    padding: "5px 14px",
    borderRadius: "20px",
    marginBottom: "16px",
    border: "1px solid rgba(26,122,74,0.2)",
  },

  badgeDot: {
    fontSize: "10px",
  },

  title: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#1a1f1a",
    textAlign: "center",
    marginBottom: "8px",
    letterSpacing: "-0.02em",
  },

  subtitle: {
    fontSize: "15px",
    color: "#6b7a6b",
    textAlign: "center",
    marginBottom: "32px",
  },

  card: {
  background: "#fff",
  borderRadius: "20px",
  padding: "28px 26px 24px",
  width: "100%",
  maxWidth: "720px",
  },

  questionText: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1a1f1a",
    marginBottom: "24px",
  },

  optionsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  optionBtn: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px",
    border: "1.5px solid #e5e7e5",
    borderRadius: "12px",
    background: "#fff",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
  },

  optionCorrect: {
    border: "1.5px solid #1a7a4a",
    background: "#f0fdf4",
  },

  optionWrong: {
    border: "1.5px solid #c0392b",
    background: "#fff5f5",
  },

  optionDim: {
    opacity: 0.55,
  },

  optionLabel: {
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    background: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
  },

  labelCorrect: {
    background: "#1a7a4a",
    color: "#fff",
  },

  labelWrong: {
    background: "#c0392b",
    color: "#fff",
  },

  labelDim: {
    background: "#e8e8e8",
    color: "#aaa",
  },

  optionText: {
    flex: 1,
    fontSize: "16px",
  },

  checkIcon: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1a7a4a",
  },

  resultBox: {
    marginTop: "20px",
    padding: "16px 18px",
    borderRadius: "10px",
    borderLeft: "4px solid",
  },

  resultLabel: {
    fontSize: "14px",
    fontWeight: "700",
    marginBottom: "6px",
  },

  explanationText: {
    fontSize: "14px",
    color: "#444",
    lineHeight: "1.6",
  },

  nextRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "18px",
  },

  nextBtn: {
    padding: "12px 24px",
    background: "#143d14",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  stateText: {
    marginTop: "50px",
    textAlign: "center",
    fontSize: "18px",
    color: "#555",
  },
};

export default ProgrammingPractice;