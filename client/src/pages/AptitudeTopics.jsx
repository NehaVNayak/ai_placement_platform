import { useParams, useNavigate } from "react-router-dom";

function AptitudeTopics() {
  const { section } = useParams();
  const navigate = useNavigate();

  const topics = {
    Logical: [
      {
        name: "Series",
        img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      },
      {
        name: "Coding-Decoding",
        img: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
      },
      {
        name: "Blood Relations",
        img: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
      },
      {
        name: "Seating Arrangement",
        img: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",
      },
      {
        name: "Puzzle",
        img: "https://cdn-icons-png.flaticon.com/512/993/993891.png",
      },
      {
        name: "Direction Sense",
        img: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      },
    ],

    Quant: [
      {
        name: "Percentages",
        img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      },
      {
        name: "Ratio",
        img: "https://cdn-icons-png.flaticon.com/512/2721/2721293.png",
      },
      {
        name: "Profit Loss",
        img: "https://cdn-icons-png.flaticon.com/512/2331/2331941.png",
      },
      {
        name: "Time Work",
        img: "https://cdn-icons-png.flaticon.com/512/747/747310.png",
      },
      {
        name: "Speed Distance",
        img: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png",
      },
      {
        name: "Probability",
        img: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
      },
    ],

    Verbal: [
      {
        name: "Grammar",
        img: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
      },
      {
        name: "Sentence Correction",
        img: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png",
      },
      {
        name: "Synonyms",
        img: "https://cdn-icons-png.flaticon.com/512/4207/4207249.png",
      },
      {
        name: "Antonyms",
        img: "https://cdn-icons-png.flaticon.com/512/4207/4207253.png",
      },
      {
        name: "Reading Comprehension",
        img: "https://cdn-icons-png.flaticon.com/512/3145/3145765.png",
      },
      {
        name: "Para Jumbles",
        img: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
      },
    ],
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{section} Topics</h1>

      <div style={styles.grid}>
        {topics[section].map((topic, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() =>
              navigate(`/aptitude-practice/${section}/${topic.name}`)
            }
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
            <img src={topic.img} alt={topic.name} style={styles.image} />
            <h3 style={{ color: "#333" }}>{topic.name}</h3>
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
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
    maxWidth: "900px",
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

export default AptitudeTopics;