import { useEffect, useState } from "react";
import axios from "axios";

function WeakTopicsCard() {
  const [data, setData] = useState(null);

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    loadWeakTopics();
  }, []);

  const loadWeakTopics = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/analytics/weak-topics?student_id=${studentId}`
      );

      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSuggestions = (data) => {
    const list = [];

    if (data?.technical?.length > 0) {
      list.push(`Practice ${data.technical[0].topic} questions`);
    }

    if (data?.programming?.length > 0) {
      list.push(`Revise ${data.programming[0].topic} concepts`);
    }

    if (data?.aptitude?.length > 0) {
      list.push(`Solve ${data.aptitude[0].topic} aptitude problems`);
    }

    list.push("Attempt 1 coding challenge today");

    return list;
  };

  if (!data) {
    return <p style={styles.loading}>Loading Weak Topics...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Weak Topics Analysis</h1>

      <p style={styles.subtext}>
        Focus on these areas to improve faster
      </p>

      <div style={styles.grid}>
        <SectionCard
          title="Technical"
          icon="💻"
          items={data.technical}
        />

        <SectionCard
          title="Programming"
          icon="🧠"
          items={data.programming}
        />

        <SectionCard
          title="Aptitude"
          icon="📘"
          items={data.aptitude}
        />
      </div>

      {/* Suggestions Section */}
      <div style={styles.suggestionBox}>
        <h2 style={styles.suggestionTitle}>
          Recommended Focus Today
        </h2>

        <div style={styles.suggestionList}>
          {getSuggestions(data).map((item, index) => (
            <div key={index} style={styles.suggestionItem}>
              ✅ {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, icon, items }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.icon}>{icon}</span>
        <h2 style={styles.cardTitle}>{title}</h2>
      </div>

      {items.length === 0 ? (
        <p style={styles.empty}>No attempts yet</p>
      ) : (
        items.map((item, index) => (
          <div key={index} style={styles.topicRow}>
            <p style={styles.topicName}>{item.topic}</p>

            <span
              style={{
                ...styles.score,
                background:
                  item.accuracy < 40
                    ? "#dc3545"
                    : item.accuracy < 70
                    ? "#ffc107"
                    : "#198754",
              }}
            >
              {item.accuracy}%
            </span>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#198754,#146c43)",
    padding: "50px 30px",
  },

  heading: {
    color: "white",
    textAlign: "center",
    fontSize: "38px",
    marginBottom: "10px",
  },

  subtext: {
    color: "#d1fae5",
    textAlign: "center",
    marginBottom: "35px",
    fontSize: "16px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: "25px",
    maxWidth: "1300px",
    margin: "0 auto",
  },

  card: {
    background: "white",
    borderRadius: "18px",
    padding: "25px",
    boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "18px",
  },

  icon: {
    fontSize: "28px",
  },

  cardTitle: {
    color: "#198754",
    fontSize: "24px",
    margin: 0,
  },

  topicRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: "1px solid #eee",
  },

  topicName: {
    margin: 0,
    fontSize: "16px",
    color: "#222",
    fontWeight: "500",
  },

  score: {
    color: "white",
    padding: "6px 12px",
    borderRadius: "999px",
    fontWeight: "bold",
    fontSize: "14px",
    minWidth: "70px",
    textAlign: "center",
  },

  empty: {
    color: "#666",
    paddingTop: "10px",
  },

  suggestionBox: {
    marginTop: "35px",
    background: "white",
    borderRadius: "18px",
    padding: "25px",
    maxWidth: "1300px",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
  },

  suggestionTitle: {
    color: "#198754",
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
  },

  suggestionList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: "15px",
  },

  suggestionItem: {
    background: "#f8f9fa",
    padding: "14px",
    borderRadius: "12px",
    fontWeight: "500",
    color: "#222",
    borderLeft: "5px solid #198754",
  },

  loading: {
    minHeight: "100vh",
    background: "#198754",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
  },
};

export default WeakTopicsCard;