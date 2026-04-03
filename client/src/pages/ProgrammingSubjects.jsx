import { useNavigate } from "react-router-dom";

function ProgrammingSubjects() {
  const navigate = useNavigate();

  const subjects = [
    {
      name: "Java",
      img: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
    },
    {
      name: "Python",
      img: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
    },
    {
      name: "C",
      img: "https://cdn-icons-png.flaticon.com/512/6132/6132222.png",
    },
    {
      name: "C++",
      img: "https://cdn-icons-png.flaticon.com/512/6132/6132221.png",
    },
    {
      name: "JavaScript",
      img: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    },
  ];

  const selectSubject = (subject) => {
    navigate(`/programming-practice/${subject}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Programming Languages</h1>

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
            <h3 style={{ color: "#333" }}>{sub.name}</h3>
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
    gridTemplateColumns: "repeat(3, 1fr)", // 3 per row
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

export default ProgrammingSubjects;