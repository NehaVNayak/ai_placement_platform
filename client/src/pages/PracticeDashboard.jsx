import { useNavigate } from "react-router-dom";

function PracticeDashboard() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Technical Subjects",
      path: "/technical",
      img: "https://cdn-icons-png.flaticon.com/512/2721/2721271.png",
    },
    {
      title: "Programming Languages",
      path: "/languages",
      img: "https://cdn-icons-png.flaticon.com/512/2721/2721293.png",
    },
    {
      title: "Aptitude",
      path: "/aptitude",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      title: "Coding Practice",
      path: "/coding-subjects",
      img: "https://cdn-icons-png.flaticon.com/512/6062/6062646.png",
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Practice Dashboard</h1>

      <div style={styles.grid}>
        {categories.map((cat, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => navigate(cat.path)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0,0,0,0.2)";
            }}
          >
            <img src={cat.img} alt={cat.title} style={styles.image} />
            <h3 style={{ color: "#333" }}>{cat.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    background: "#198754", // ✅ YOUR COLOR KEPT
    minHeight: "100vh",
  },

  heading: {
    color: "white",
    marginBottom: "30px",
  },

  grid: {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)", // ✅ EXACTLY 2 per row
  gap: "25px",
  padding: "10px",
  maxWidth: "600px",   // optional: keeps it centered nicely
  margin: "0 auto",    // center align
},

  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  image: {
    width: "70px",
    height: "70px",
    marginBottom: "15px",
  },
};

export default PracticeDashboard;