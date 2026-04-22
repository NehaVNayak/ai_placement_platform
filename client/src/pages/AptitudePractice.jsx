import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
    if (selected) return;

    setSelected(option);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/aptitude/submit-answer",
        {
          student_id: studentId,
          question_id: question._id,
          selected_option: option
        }
      );

      setResult(res.data.correct);

    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  if (!studentId) return <p style={styles.text}>Please login again.</p>;
  if (loading) return <p style={styles.text}>Loading question...</p>;
  if (!question) return <p style={styles.text}>No question available.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{topic} Practice</h2>

      <div style={styles.card}>
        <h3 style={styles.question}>{question.question_text}</h3>

        <div style={styles.options}>
          {question.options.map((opt, index) => {
            let bg = "#198754";

            if (selected) {
              if (opt === selected) {
                bg = result ? "#28a745" : "#dc3545";
              } else if (opt === question.correct_answer) {
                bg = "#28a745";
              } else {
                bg = "#6c757d";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(opt)}
                style={{ ...styles.button, background: bg }}
                disabled={!!selected}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selected && (
          <>
            <div style={styles.resultBox}>
              <h4 style={{ color: result ? "green" : "red" }}>
                {result ? "✅ Correct Answer!" : "❌ Wrong Answer"}
              </h4>

              <p style={styles.explanation}>
                <strong>Explanation: </strong>
                {question.explanation || "No explanation available"}
              </p>
            </div>

            <button onClick={loadQuestion} style={styles.nextButton}>
              Next Question →
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    background: "#198754",
    minHeight: "100vh",
  },

  heading: {
    color: "white",
    marginBottom: "20px",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    maxWidth: "650px",
    margin: "0 auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },

  question: {
    marginBottom: "20px",
    color: "#333",
    lineHeight: "1.5",
  },

  options: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    color: "white",
    fontSize: "16px",
    transition: "all 0.2s ease",
  },

  resultBox: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "10px",
    background: "#f8f9fa",
  },

  explanation: {
    marginTop: "10px",
    color: "#333",
    lineHeight: "1.5",
  },

  nextButton: {
    marginTop: "15px",
    padding: "10px 15px",
    background: "#0d6efd",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
  },

  text: {
    marginTop: "50px",
    fontSize: "18px",
    color: "white",
  },
};

export default AptitudePractice;