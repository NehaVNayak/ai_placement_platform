import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNextQuestion, submitAnswer } from "../api/practiceApi";

function TechnicalPractice() {
  const { subject } = useParams();

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null); // true / false

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    if (studentId) {
      loadQuestion();
    }
  }, [studentId, subject]);

  const loadQuestion = async () => {
    try {
      setLoading(true);
      const q = await getNextQuestion(studentId, subject);

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
    if (selected) return; // prevent multiple clicks

    setSelected(option);

    try {
      const res = await submitAnswer({
        student_id: studentId,
        question_id: question._id,
        selected_option: option
      });

      setResult(res.correct);

      // auto next question after 2 sec
      setTimeout(() => {
        loadQuestion();
      }, 2000);

    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  if (!studentId) return <p style={styles.text}>Please login again.</p>;
  if (loading) return <p style={styles.text}>Loading question...</p>;
  if (!question) return <p style={styles.text}>No question available.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{subject} Practice</h2>

      <div style={styles.card}>
        <h3 style={styles.question}>{question.question_text}</h3>

        <div style={styles.options}>
          {question.options.map((opt, index) => {
            let bg = "#198754";

            if (selected) {
              if (opt === selected) {
                bg = result ? "#28a745" : "#dc3545"; // green/red
              } else if (opt === question.correct_answer) {
                bg = "#28a745"; // show correct answer
              } else {
                bg = "#6c757d"; // disabled gray
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

        {/* RESULT + EXPLANATION */}
        {selected && (
          <div style={styles.resultBox}>
            <h4 style={{ color: result ? "green" : "red" }}>
              {result ? "✅ Correct Answer!" : "❌ Wrong Answer"}
            </h4>

            <p style={styles.explanation}>
              <strong>Explanation: </strong>
              {question.explanation || "No explanation available"}
            </p>
          </div>
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
    marginBottom: "30px",
  },

  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    maxWidth: "650px",
    margin: "0 auto",
    boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
  },

  question: {
    color: "#333",
    marginBottom: "20px",
  },

  options: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
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
  },

  text: {
    marginTop: "50px",
    fontSize: "18px",
  },
};

export default TechnicalPractice;