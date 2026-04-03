import { useNavigate } from "react-router-dom";

function TechnicalSubjects() {
  const navigate = useNavigate();

  const subjects = [
    {
      name: "DSA",
      img: "https://cdn-icons-png.flaticon.com/512/2721/2721271.png",
    },
    {
      name: "DBMS",
      img: "https://cdn-icons-png.flaticon.com/512/4248/4248443.png",
    },
    {
      name: "OOPS",
      img: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
    },
    {
      name: "CN",
      label: "Computer Networks",
      img: "https://cdn-icons-png.flaticon.com/512/906/906175.png",
    },
    {
      name: "OS",
      label: "Operating Systems",
      img: "https://cdn-icons-png.flaticon.com/512/2282/2282188.png",
    },
  ];

  const selectSubject = (subject) => {
    navigate(`/technical-practice/${subject}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Technical Subjects</h1>

      <div style={styles.grid}>
        {subjects.map((sub, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => selectSubject(sub.name)}
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
            <img src={sub.img} alt={sub.name} style={styles.image} />
            <h3 style={{ color: "#333" }}>
              {sub.label || sub.name}
            </h3>
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
    background: "#198754", // ✅ SAME THEME
    minHeight: "100vh",
  },

  heading: {
    color: "white",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // ✅ 2 per row
    gap: "25px",
    maxWidth: "600px",
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

export default TechnicalSubjects;