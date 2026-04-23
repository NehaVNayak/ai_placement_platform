import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

/* ---------------- Helpers ---------------- */

function CircularProgress({ value = 0, size = 90 }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;

  return (
    <svg width={size} height={size} viewBox="0 0 88 88">
      <circle
        cx="44"
        cy="44"
        r={r}
        fill="none"
        stroke="#e8f5ee"
        strokeWidth="8"
      />

      <circle
        cx="44"
        cy="44"
        r={r}
        fill="none"
        stroke="#198754"
        strokeWidth="8"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 44 44)"
      />

      <text
        x="44"
        y="49"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill="#111"
      >
        {value}%
      </text>
    </svg>
  );
}

function ScoreBar({ value }) {
  return (
    <div style={styles.barBg}>
      <div
        style={{
          ...styles.barFill,
          width: `${value}%`,
          background: value >= 70 ? "#198754" : "#dc3545",
        }}
      />
    </div>
  );
}

/* ---------------- Main ---------------- */

function PerformanceDashboard() {
  const [data, setData] = useState(null);
  const [range, setRange] = useState("6M");

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
      console.log(error);
    }
  };

  if (!data) {
    return <p style={styles.loading}>Loading Performance...</p>;
  }

  const readiness =
    data.overall >= 80
      ? "Ready for Placements 🚀"
      : data.overall >= 60
      ? "Improving 📈"
      : "Needs Practice 📚";

  const scoreCards = [
    {
      key: "technical",
      label: "TECHNICAL",
      value: data.technical,
    },
    {
      key: "programming",
      label: "PROGRAMMING",
      value: data.programming,
    },
    {
      key: "coding",
      label: "CODING",
      value: data.coding,
    },
    {
      key: "aptitude",
      label: "APTITUDE",
      value: data.aptitude,
    },
  ];

  const barData = [
    { name: "TECH", score: data.technical },
    { name: "PROG", score: data.programming },
    { name: "CODE", score: data.coding },
    { name: "APT", score: data.aptitude },
  ];

  const radarData = [
    { skill: "Technical", score: data.technical },
    { skill: "Programming", score: data.programming },
    { skill: "Coding", score: data.coding },
    { skill: "Aptitude", score: data.aptitude },
  ];

  const trend6M = [
    { month: "Jan", score: 30 },
    { month: "Feb", score: 42 },
    { month: "Mar", score: 52 },
    { month: "Apr", score: 61 },
    { month: "May", score: 72 },
    { month: "Now", score: data.overall },
  ];

  const trend1M = [
    { month: "W1", score: data.overall - 12 },
    { month: "W2", score: data.overall - 8 },
    { month: "W3", score: data.overall - 4 },
    { month: "W4", score: data.overall },
  ];

  const lineData = range === "1M" ? trend1M : trend6M;

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <div style={styles.nav}>
        <div style={styles.logoWrap}>
          <div style={styles.dot}></div>
          <span style={styles.logoText}>AI Placement Prep</span>
        </div>

        <span style={styles.navRight}>PERFORMANCE CENTER</span>
      </div>

      <div style={styles.wrapper}>
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <div style={styles.tag}>✦ AI GROWTH ANALYTICS</div>

            <h1 style={styles.heading}>Performance Dashboard</h1>

            <p style={styles.subtext}>
              Real-time performance analytics across Technical, Programming,
              Coding and Aptitude modules.
            </p>
          </div>

          <div style={styles.overallCard}>
            <CircularProgress value={data.overall} />

            <div>
              <h3 style={{ margin: 0 }}>{readiness}</h3>

              <p style={styles.grayText}>
                Top {data.percentile}% of candidates
              </p>
            </div>
          </div>
        </div>

        {/* SCORE GRID */}
        <div style={styles.grid}>
          {scoreCards.map((item) => (
            <div key={item.key} style={styles.card}>
              <div style={styles.cardTop}>
                <span style={styles.smallLabel}>{item.label}</span>
                <span style={styles.bigValue}>{item.value}%</span>
              </div>

              <ScoreBar value={item.value} />
            </div>
          ))}
        </div>

        {/* STRONG / WEAK */}
        <div style={styles.dualGrid}>
          <div style={styles.strongCard}>
            <p style={styles.topMini}>STRONGEST AREA</p>
            <h2>{data.strongest}</h2>
            <h1 style={{ color: "#4ade80" }}>
              {Math.max(
                data.technical,
                data.programming,
                data.coding,
                data.aptitude
              )}
              %
            </h1>
          </div>

          <div style={styles.weakCard}>
            <p style={styles.topMiniGray}>NEEDS FOCUS</p>
            <h2>{data.weakest}</h2>
            <h1 style={{ color: "#dc3545" }}>
              {Math.min(
                data.technical,
                data.programming,
                data.coding,
                data.aptitude
              )}
              %
            </h1>
          </div>
        </div>

        {/* CHARTS */}
        <div style={styles.chartGrid}>
          {/* BAR */}
          <div style={styles.chartCard}>
            <h3>Category Comparison</h3>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar
                  dataKey="score"
                  fill="#198754"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* RADAR */}
          <div style={styles.chartCard}>
            <h3>Skill Balance</h3>

            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  dataKey="score"
                  stroke="#198754"
                  fill="#198754"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LINE CHART */}
        <div style={styles.chartWide}>
          <div style={styles.flexBetween}>
            <h3>Growth Trend</h3>

            <div>
              <button
                style={styles.toggle(range === "1M")}
                onClick={() => setRange("1M")}
              >
                1M
              </button>

              <button
                style={styles.toggle(range === "6M")}
                onClick={() => setRange("6M")}
              >
                6M
              </button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={lineData}>
              <defs>
                <linearGradient
                  id="colorUv"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#198754"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="#198754"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="score"
                stroke="#198754"
                fillOpacity={1}
                fill="url(#colorUv)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* STATS */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <p style={styles.grayText}>Solved</p>
            <h3>{data.solved} Problems</h3>
          </div>

          <div style={styles.statCard}>
            <p style={styles.grayText}>Interviews</p>
            <h3>{data.mock_interviews} Sessions</h3>
          </div>

          <div style={styles.statCard}>
            <p style={styles.grayText}>Resume</p>
            <h3>{data.resume_score} Score</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Styles ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#e9f7e9",
    fontFamily: "Segoe UI",
  },

  nav: {
    background: "#12311e",
    padding: "16px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#4ade80",
  },

  logoText: {
    color: "white",
    fontWeight: "bold",
  },

  navRight: {
    color: "#9ca3af",
    fontSize: "13px",
  },

  wrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "35px 25px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },

  tag: {
    background: "#e8f5ee",
    color: "#198754",
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  heading: {
    marginTop: "15px",
    fontSize: "40px",
    marginBottom: "10px",
  },

  subtext: {
    color: "#666",
    maxWidth: "500px",
  },

  overallCard: {
    background: "white",
    borderRadius: "18px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  grayText: {
    color: "#777",
    margin: 0,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "25px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "18px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
  },

  smallLabel: {
    color: "#888",
    fontSize: "12px",
    fontWeight: "bold",
  },

  bigValue: {
    fontWeight: "bold",
    fontSize: "22px",
  },

  barBg: {
    height: "8px",
    background: "#e8f5ee",
    borderRadius: "10px",
    marginTop: "12px",
  },

  barFill: {
    height: "100%",
    borderRadius: "10px",
  },

  dualGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "25px",
  },

  strongCard: {
    background: "#12311e",
    color: "white",
    padding: "25px",
    borderRadius: "18px",
  },

  weakCard: {
    background: "white",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
  },

  topMini: {
    color: "#86efac",
    fontSize: "12px",
    fontWeight: "bold",
  },

  topMiniGray: {
    color: "#888",
    fontSize: "12px",
    fontWeight: "bold",
  },

  chartGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "25px",
  },

  chartCard: {
    background: "white",
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
  },

  chartWide: {
    background: "white",
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
    marginBottom: "25px",
  },

  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  toggle: (active) => ({
    padding: "8px 14px",
    border: "none",
    borderRadius: "20px",
    marginLeft: "8px",
    cursor: "pointer",
    background: active ? "#12311e" : "#eee",
    color: active ? "white" : "#333",
  }),

  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
  },

  statCard: {
    background: "white",
    padding: "20px",
    borderRadius: "18px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
  },

  loading: {
    textAlign: "center",
    marginTop: "120px",
    fontSize: "24px",
  },
};

export default PerformanceDashboard;