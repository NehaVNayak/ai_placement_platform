import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import axios from "axios";

function CodingPage() {
  const { topic } = useParams();

  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("print('Hello')");
  const [output, setOutput] = useState("");
  const [selectedLang, setSelectedLang] = useState("python");
  const [activeTest, setActiveTest] = useState(0);
  const query = new URLSearchParams(window.location.search);
  const questionId = query.get("q");

  useEffect(() => {
  fetchQuestion();
}, [topic, questionId]);

  const fetchQuestion = async () => {
  try {
    let url = "";

    if (questionId) {
      url = `http://127.0.0.1:8000/api/coding/question-by-id?question_id=${questionId}`;
    } else {
      url = `http://127.0.0.1:8000/api/coding/question?topic=${topic}`;
    }

    const res = await axios.get(url);
    setQuestion(res.data);

  } catch (err) {
    console.error("Error fetching question:", err);
  }
};
  const fetchLastCode = async () => {
    const studentId = localStorage.getItem("studentId");

    if (!studentId || !question?._id) return;

    const res = await axios.get(
      `http://127.0.0.1:8000/api/coding/submission?studentId=${studentId}&question_id=${question._id}`
    );

    if (res.data.code) {
      setCode(res.data.code);
    }
  };

  useEffect(() => {
    if (question) fetchLastCode();
  }, [question]);

  const runCode = async () => {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/coding/run",
      {
        code,
        language: selectedLang,
      }
    );

    setOutput(res.data.output || res.data.error);
  };

  const submitCode = async () => {
  const studentId = localStorage.getItem("studentId");

  if (!studentId) {
    alert("Student not logged in");
    return;
  }

  const res = await axios.post(
    "http://127.0.0.1:8000/api/coding/submit",
    {
      code,
      language: selectedLang,
      question_id: question._id,
      studentId: studentId,   // ✅ FIXED
    }
  );

  const { status, results } = res.data;

  let outputText = `Final Verdict: ${status}\n\n`;

  results.forEach((r) => {
    outputText += `Testcase ${r.testcase}: ${
      r.passed ? "✅ Passed" : "❌ Failed"
    }\n`;
  });

  setOutput(outputText);
};
 return (
  <div style={styles.container}>
    
    {/* LEFT PANEL */}
    <div style={styles.left}>
      <h2 style={styles.title}>{question?.title}</h2>
      <p style={styles.desc}>{question?.description}</p>

      <h3 style={styles.section}>Sample Testcases</h3>

      {/* Tabs */}
      <div style={styles.tabs}>
        {question?.sample_testcases?.map((_, i) => (
          <button
            key={i}
            style={{
              ...styles.tab,
              ...(activeTest === i ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTest(i)}
          >
            Case {i + 1}
          </button>
        ))}
      </div>

      {/* Testcase */}
      {question?.sample_testcases && (
        <div style={styles.testBox}>
          <p><strong>Input:</strong></p>
          <pre>{question.sample_testcases[activeTest].input}</pre>

          <p><strong>Output:</strong></p>
          <pre>{question.sample_testcases[activeTest].output}</pre>
        </div>
      )}
    </div>

    {/* RIGHT PANEL */}
    <div style={styles.right}>
      
      {/* Top Bar */}
      <div style={styles.topBar}>
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          style={styles.dropdown}
        >
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>

        <button style={styles.runBtn} onClick={runCode}>
          Run
        </button>

        <button style={styles.submitBtn} onClick={submitCode}>
          Submit
        </button>
      </div>

      {/* Editor */}
      <Editor
        height="65%"
        theme="vs-light"   // ✅ LIGHT THEME (important)
        language={selectedLang}
        value={code}
        onChange={(value) => setCode(value)}
      />

      {/* Console */}
      <div style={styles.console}>
  <div style={styles.consoleHeader}>💻 Output Console</div>
  <pre>{output || "Run your code to see output..."}</pre>
</div>
    </div>
  </div>
);
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#198754", // ✅ SAME GREEN
  },

  left: {
    width: "40%",
    padding: "20px",
    background: "#ffffff",
    borderRadius: "16px",
    margin: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    overflowY: "auto",
  },

  right: {
    width: "60%",
    margin: "20px",
    display: "flex",
    flexDirection: "column",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },

  title: {
    color: "#198754",
    marginBottom: "10px",
  },

  desc: {
    color: "#333",
  },

  section: {
    marginTop: "20px",
    color: "#198754",
  },

  tabs: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },

  tab: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    background: "#ccc",
    cursor: "pointer",
  },

  activeTab: {
    background: "#198754",
    color: "white",
  },

  testBox: {
    background: "#f8f9fa",
    padding: "10px",
    borderRadius: "10px",
  },

  topBar: {
    display: "flex",
    gap: "10px",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },

  dropdown: {
    padding: "6px",
    borderRadius: "6px",
  },

  runBtn: {
    background: "#0d6efd",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  submitBtn: {
    background: "#198754",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  console: {
  background: "#f1f5f9",   // soft light gray
  color: "#111",
  padding: "15px",
  height: "25%",
  overflow: "auto",
  borderTop: "1px solid #ddd",
  borderRadius: "0 0 16px 16px",
},

consoleHeader: {
  fontWeight: "600",
  fontSize: "16px",
  marginBottom: "8px",
  color: "#198754",
}
};

export default CodingPage;