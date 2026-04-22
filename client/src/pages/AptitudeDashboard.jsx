import { useNavigate } from "react-router-dom";

function AptitudeDashboard() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Logical Reasoning",
      path: "/aptitude-topics/Logical",
      img: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    },
    {
      title: "Quantitative Aptitude",
      path: "/aptitude-topics/Quant",
      img: "https://cdn-icons-png.flaticon.com/512/2936/2936886.png",
    },
    {
      title: "Verbal Ability",
      path: "/aptitude-topics/Verbal",
      img: "https://cdn-icons-png.flaticon.com/512/4207/4207249.png",
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Aptitude Dashboard</h1>

      <div style={styles.grid}>
        {sections.map((item, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => navigate(item.path)}
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
            <img src={item.img} alt={item.title} style={styles.image} />
            <h3 style={{ color: "#333" }}>{item.title}</h3>
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
    background: "#198754",
    minHeight: "100vh",
  },

  heading: {
    color: "white",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "25px",
    padding: "10px",
    maxWidth: "700px",
    margin: "0 auto",
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

export default AptitudeDashboard;