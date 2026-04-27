import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
        <div style={styles.navIcon}>🔔</div>
        <div style={styles.navIcon}>⚡</div>
        <div style={styles.avatar}>S</div>
      </div>
    </nav>
  );
}

function AptitudePractice() {
  const { section, topic } = useParams();

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    if (studentId) {
      loadQuestion();
    }
  }, [studentId, section, topic]);

  const loadQuestion = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:8000/api/aptitude/next-question?student_id=${studentId}&section=${section}&topic=${topic}`
      );

      setQuestion(res.data);
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
      const res = await axios.post(
        "http://localhost:8000/api/aptitude/submit-answer",
        {
          student_id: studentId,
          question_id: question._id,
          selected_option: option,
        }
      );

      setResult(res.data.correct);
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
        <h1 style={styles.title}>{topic} Practice</h1>

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
    background: "linear-gradient(90deg,#0c3b0c 0%, #0d4d12 100%)",
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
    fontSize: "20px",
  },

  navIcon: {
    cursor: "pointer",
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
    boxShadow: "0 2px 24px rgba(0,0,0,0.07)",
    border: "1px solid rgba(0,0,0,0.06)",
  },

  questionText: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a1f1a",
    marginBottom: "24px",
    lineHeight: "1.4",
  },

  optionsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  optionBtn: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px 16px",
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
    color: "#222",
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
    color: "#333",
  },
};

export default AptitudePractice;