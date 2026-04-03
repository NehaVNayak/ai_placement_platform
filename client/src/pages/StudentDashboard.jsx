import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "Student";

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome, {name} 👋</h1>
      <p style={styles.subtext}>Choose what you want to do today</p>

      <div style={styles.grid}>
        
        {/* Start Practice */}
        <div
          style={styles.card}
          onClick={() => navigate("/practice")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";
          }}
        >
          <div style={styles.icon}>🚀</div>
          <h3>Start Practice</h3>
          <p>Solve coding questions topic-wise</p>
        </div>

        {/* Resume */}
        <div
          style={styles.card}
          onClick={() => navigate("/resume")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";
          }}
        >
          <div style={styles.icon}>📄</div>
          <h3>Analyse Resume</h3>
          <p>Improve your resume with insights</p>
        </div>

        {/* Interview */}
        <div
          style={styles.card}
          onClick={() => navigate("/interview")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";
          }}
        >
          <div style={styles.icon}>🎤</div>
          <h3>Practice Interview</h3>
          <p>Mock interviews with feedback</p>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    minHeight: "100vh",
    background: "#198754", // ✅ same as your current
  },

  heading: {
    fontSize: "30px",
    marginBottom: "10px",
    color: "white", // ✅ FIXED contrast
  },

  subtext: {
    marginBottom: "30px",
    color: "#d1d5db", // ✅ softer text
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.3s ease",
    borderTop: "5px solid #198754", // 🔥 accent
  },

  icon: {
    fontSize: "40px", // ✅ bigger icons
    marginBottom: "12px",
  },
};

export default StudentDashboard;