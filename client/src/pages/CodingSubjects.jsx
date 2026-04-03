import { useNavigate } from "react-router-dom";
import {
  List,
  Brain,
  Network,
  Database,
  Link,
  Grid3X3,
  ArrowUpDown,
  Type,
  Layers,
  GitBranch,
  Mountain,
  MoveHorizontal,
  ScanLine,
  Search,
  TreePine,
  Undo2,
  DollarSign,
  Clock,
  Cpu,
  Triangle
} from "lucide-react";

function CodingSubjects() {
  const navigate = useNavigate();

  const topics = [
  { name: "arrays", icon: <List /> },
  { name: "dynamic-programming", icon: <Brain /> },
  { name: "graph", icon: <Network /> },
  { name: "hashing", icon: <Database /> },
  { name: "linked-list", icon: <Link /> },
  { name: "matrix", icon: <Grid3X3 /> },
  { name: "sorting", icon: <ArrowUpDown /> },
  { name: "string", icon: <Type /> },
  { name: "stack", icon: <Layers /> },
  { name: "tree", icon: <TreePine /> },
  { name: "heap", icon: <Mountain /> },
  { name: "two-pointers", icon: <MoveHorizontal /> },
  { name: "sliding-window", icon: <ScanLine /> },
  { name: "binary-search", icon: <Search /> },
  { name: "trie", icon: <GitBranch /> },
  { name: "backtracking", icon: <Undo2 /> },
  { name: "greedy", icon: <DollarSign /> },
  { name: "intervals", icon: <Clock /> },
  { name: "bit-manipulation", icon: <Cpu /> },
  { name: "math-geometry", icon: <Triangle /> },
];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🚀 Select Coding Topic</h1>

      <div style={styles.grid}>
        {topics.map((topic) => (
          <div
            key={topic.name}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 10px rgba(0,0,0,0.2)";
            }}
            onClick={() => navigate(`/coding/${topic.name}`)}
          >
            <div style={styles.icon}>{topic.icon}</div>
            <div style={styles.title}>
              {topic.name.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #198754, #157347)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },

  heading: {
    color: "white",
    fontSize: "32px",
    marginBottom: "40px",
    fontWeight: "600",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "30px",
    width: "100%",
    maxWidth: "700px",
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },

  icon: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  title: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
  },
};
export default CodingSubjects;