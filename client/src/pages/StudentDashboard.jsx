import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "Student";

  const cards = [
    {
      title: "Start Practice",
      desc: "Solve coding questions topic-wise",
      icon: "🚀",
      path: "/practice",
    },
    {
      title: "Analyse Resume",
      desc: "Improve your resume with insights",
      icon: "📄",
      path: "/resume",
    },
    {
      title: "Practice Interview",
      desc: "Mock interviews with feedback",
      icon: "🎤",
      path: "/interview",
    },
    {
      title: "View Performance",
      desc: "Track scores, progress and readiness",
      icon: "📊",
      path: "/performance",
    },
    {
      title: "Weak Topics",
      desc: "See topics that need more practice",
      icon: "📉",
      path: "/weak-topics",
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome, {name} 👋</h1>
      <p style={styles.subtext}>Choose what you want to do today</p>

      <div style={styles.grid}>
        {cards.map((card, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => navigate(card.path)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.25)";
            }}
          >
            <div style={styles.icon}>{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
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
    fontSize: "30px",
    marginBottom: "10px",
    color: "white",
  },

  subtext: {
    marginBottom: "30px",
    color: "#d1d5db",
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
    borderTop: "5px solid #198754",
  },

  icon: {
    fontSize: "40px",
    marginBottom: "12px",
  },
};

export default StudentDashboard;