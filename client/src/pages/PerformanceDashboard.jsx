import { useEffect, useState } from "react";
import axios from "axios";

function PerformanceDashboard() {
  const [data, setData] = useState(null);

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    loadPerformance();
  }, []);

  const loadPerformance = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/score/student-score?student_id=${studentId}`
      );

      setData(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  if (!data) return <p style={styles.loading}>Loading Performance...</p>;

  const highest = Math.max(
    data.technical,
    data.programming,
    data.coding,
    data.aptitude
  );

  const lowest = Math.min(
    data.technical,
    data.programming,
    data.coding,
    data.aptitude
  );

  const readiness =
    data.overall >= 80
      ? "Ready for Placements 🚀"
      : data.overall >= 60
      ? "Improving 📈"
      : "Needs Practice 📚";

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Performance Dashboard</h1>

      <div style={styles.grid}>
        <Card title="Technical Quiz" value={data.technical} />
        <Card title="Programming Quiz" value={data.programming} />
        <Card title="Coding Test" value={data.coding} />
        <Card title="Aptitude" value={data.aptitude} />
      </div>

      <div style={styles.bigCard}>
        <h2>Overall Score</h2>
        <h1 style={{ color: "#198754" }}>{data.overall}%</h1>
        <p>{readiness}</p>
      </div>

      <div style={styles.infoRow}>
        <div style={styles.smallCard}>
          <h3>Strength</h3>
          <p>{highest}%</p>
        </div>

        <div style={styles.smallCard}>
          <h3>Weak Area</h3>
          <p>{lowest}%</p>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <h2 style={{ color: "#198754" }}>{value}%</h2>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#198754",
    padding: "40px",
    textAlign: "center",
  },

  heading: {
    color: "white",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
  },

  bigCard: {
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    marginBottom: "30px",
  },

  infoRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  smallCard: {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
  },

  loading: {
    marginTop: "100px",
    fontSize: "20px",
  },
};

export default PerformanceDashboard;