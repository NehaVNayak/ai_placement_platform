import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CodingQuestions() {
  const { topic } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [attempted, setAttempted] = useState([]);

  useEffect(() => {
    fetchQuestions();
    fetchAttempted();
  }, []);

  const fetchQuestions = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/coding/questions?topic=${topic}`
    );
    setQuestions(res.data);
  };

  const fetchAttempted = async () => {
    const studentId = localStorage.getItem("studentId");

    const res = await axios.get(
  `http://127.0.0.1:8000/api/coding/attempted?studentId=${studentId}&topic=${topic}`
);

    setAttempted(res.data);
  };

  const solvedCount = attempted.length;
  const totalCount = questions.length;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        {topic.toUpperCase()} Problems
      </h2>

      {/* 🔥 PROGRESS BAR */}
      <div style={styles.progressBox}>
        <span style={styles.progressText}>
          {solvedCount} / {totalCount} Attempted
        </span>
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width:
                totalCount === 0
                  ? "0%"
                  : `${(solvedCount / totalCount) * 100}%`,
            }}
          />
        </div>
      </div>

      <div style={styles.list}>
        {questions.map((q, index) => {
          const isAttempted = attempted.includes(q._id);

          return (
            <div
              key={q._id}
              style={styles.row}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f8f9fa";
                e.currentTarget.style.transform = "scale(1.01)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onClick={() =>
                navigate(`/coding/${topic}/problem?q=${q._id}`)
              }
            >
              {/* LEFT */}
              <div style={styles.left}>
                <span style={styles.index}>{index + 1}.</span>
                <span style={styles.title}>{q.title}</span>
              </div>

              {/* RIGHT */}
              <div style={styles.right}>
                <span
                  style={{
                    ...styles.difficulty,
                    ...(q.difficulty === "easy"
                      ? styles.easy
                      : q.difficulty === "medium"
                      ? styles.medium
                      : styles.hard),
                  }}
                >
                  {q.difficulty}
                </span>

                {/* STATUS */}
                {isAttempted && (
                  <span style={styles.attempted}>✅</span>
                )}

                {/* ARROW */}
                <span style={styles.arrow}>›</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    minHeight: "100vh",
    background: "#198754",
  },

  heading: {
    color: "white",
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "600",
  },

  /* 🔥 PROGRESS */
  progressBox: {
    marginBottom: "20px",
  },

  progressText: {
    color: "white",
    fontSize: "14px",
    marginBottom: "5px",
    display: "block",
  },

  progressBar: {
    width: "100%",
    height: "8px",
    background: "#ccc",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "#0d6efd",
    transition: "width 0.3s ease",
  },

  /* LIST */
  list: {
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  index: {
    color: "#888",
    fontSize: "14px",
  },

  title: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#222",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  difficulty: {
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "20px",
    textTransform: "capitalize",
    fontWeight: "600",
  },

  easy: {
    background: "#d1e7dd",
    color: "#0f5132",
  },

  medium: {
    background: "#fff3cd",
    color: "#664d03",
  },

  hard: {
    background: "#f8d7da",
    color: "#842029",
  },

  attempted: {
    fontSize: "14px",
  },

  arrow: {
    fontSize: "18px",
    color: "#999",
  },
  
};

export default CodingQuestions;