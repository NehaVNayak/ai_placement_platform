// WeakTopicsCard.jsx

import { useEffect, useState } from "react";
import axios from "axios";

/* ── Circular progress (SVG donut) ─────────────────────── */
function CircularProgress({ value = 64, size = 100 }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 96 96">
      <circle cx="48" cy="48" r={r} fill="none" stroke="#e2ede7" strokeWidth="9" />
      <circle
        cx="48" cy="48" r={r} fill="none"
        stroke="#198754" strokeWidth="9"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 48 48)"
      />
      <text x="48" y="54" textAnchor="middle" fontSize="16" fontWeight="800" fill="#111" fontFamily="inherit">
        {value}%
      </text>
    </svg>
  );
}

/* ── accuracy badge colour ──────────────────────────────── */
function badgeStyle(accuracy) {
  if (accuracy < 40) return { background: "#fde8e8", color: "#c0392b" };
  if (accuracy < 70) return { background: "#fef3cd", color: "#b45309" };
  return { background: "#d1fae5", color: "#065f46" };
}

/* ── icon map ───────────────────────────────────────────── */
const ICONS = {
  Technical:   "🖥️",
  Programming: "⚙️",
  Coding:      "🚀",
  Aptitude:    "📘",
};

/* ── tag label map for recommendations ─────────────────── */
const TAG_LABELS = ["URGENT", "CONCEPTUAL", "SPEED BOOST", "PRACTICE", "FUNDAMENTALS", "ALGORITHM"];

/* ── SectionCard ────────────────────────────────────────── */
function SectionCard({ title, items }) {
  return (
    <div style={s.card}>
      <div style={s.cardHeader}>
        <span style={s.cardIconWrap}>{ICONS[title] ?? "📌"}</span>
        <span style={s.cardTitle}>{title}</span>
      </div>

      <div style={s.topicList}>
        {!items || items.length === 0 ? (
          <p style={s.empty}>No attempts yet</p>
        ) : (
          items.map((item, i) => (
            <div key={i} style={s.topicRow}>
              <span style={s.topicName}>{item.topic}</span>
              <span style={{ ...s.badge, ...badgeStyle(item.accuracy) }}>
                {item.accuracy}%
              </span>
            </div>
          ))
        )}
      </div>

      <button style={s.viewLink}>VIEW MODULE DETAILS →</button>
    </div>
  );
}

/* ── main component ─────────────────────────────────────── */
function WeakTopicsCard() {
  const [data, setData] = useState(null);

  const studentId =
    typeof localStorage !== "undefined" ? localStorage.getItem("studentId") : null;

  useEffect(() => {
    loadWeakTopics();
  }, []);

  const loadWeakTopics = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/analytics/weak-topics?student_id=${studentId}`
      );
      setData(res.data);
    } catch (error) {
      console.error(error);
      // fallback mock for preview
      setData({
        technical:   [{ topic: "DBMS", accuracy: 42 }, { topic: "CN", accuracy: 51 }, { topic: "OS", accuracy: 60 }],
        programming: [{ topic: "Java", accuracy: 78 }, { topic: "Python", accuracy: 56 }, { topic: "C++", accuracy: 49 }],
        coding:      [{ topic: "DP", accuracy: 38 }, { topic: "Graph", accuracy: 46 }, { topic: "Trie", accuracy: 58 }],
        aptitude:    [{ topic: "Probability", accuracy: 44 }, { topic: "Speed Math", accuracy: 52 }, { topic: "Reasoning", accuracy: 61 }],
        recommendations: [
          "Solve 5 DP problems",
          "Revise DBMS Normalization",
          "Practice Probability shortcuts",
          "Attempt 1 mock interview",
          "Review Python OOP concepts",
          "Solve 2 Graph BFS questions",
        ],
      });
    }
  };

  if (!data) {
    return (
      <div style={s.loadingPage}>
        <p style={{ fontSize: 20, color: "#198754", fontWeight: 600 }}>Loading Weak Topics…</p>
      </div>
    );
  }

  /* derive improvement score from average accuracy */
  const allAccuracies = [
    ...(data.technical   || []),
    ...(data.programming || []),
    ...(data.coding      || []),
    ...(data.aptitude    || []),
  ].map((i) => i.accuracy);
  const improvScore = allAccuracies.length
    ? Math.round(allAccuracies.reduce((a, b) => a + b, 0) / allAccuracies.length)
    : 64;

  const statusLabel = improvScore >= 75 ? "On Track 🎯" : improvScore >= 55 ? "Needs Focus 📚" : "Critical ⚠️";
  const statusStyle = improvScore >= 75
    ? { background: "#d1fae5", color: "#065f46" }
    : improvScore >= 55
    ? { background: "#fef3cd", color: "#b45309" }
    : { background: "#fde8e8", color: "#c0392b" };

  const recommendations = data.recommendations || [];

  return (
    <div style={s.page}>

      {/* ── NAV ── */}
      <nav style={s.nav}>
        <div style={s.navBrand}>
          <span style={s.navDot} />
          <span style={s.navTitle}>PreP AI</span>
        </div>
        <span style={s.navCenter}>AI Insights Center</span>
        <span />
      </nav>

      <div style={s.body}>

        {/* ── HEADER ROW ── */}
        <div style={s.headerRow}>
          <div style={s.headerLeft}>
            <div style={s.chip}>✦ PERSONALIZED IMPROVEMENT ENGINE</div>
            <h1 style={s.mainTitle}>Weak Topics Analysis</h1>
            <p style={s.subtitle}>
              AI-generated recommendations based on your real performance patterns. Our
              engine has identified key conceptual gaps that are slowing your placement journey.
            </p>
          </div>
          <div style={s.scoreCard}>
            <CircularProgress value={improvScore} size={100} />
            <div style={s.scoreText}>
              <div style={s.scoreLabel}>Improvement Score</div>
              <div style={s.scoreRow}>
                <span style={s.scoreStatus}>Status</span>
                <span style={{ ...s.statusBadge, ...statusStyle }}>{statusLabel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION CARDS ── */}
        <div style={s.grid}>
          <SectionCard title="Technical"   items={data.technical} />
          <SectionCard title="Programming" items={data.programming} />
          <SectionCard title="Coding"      items={data.coding} />
          <SectionCard title="Aptitude"    items={data.aptitude} />
        </div>

        {/* ── RECOMMENDED FOCUS ── */}
        <div style={s.focusBox}>
          <div style={s.focusHeader}>
            <h2 style={s.focusTitle}>Recommended Focus Today</h2>
            <div style={s.aiChip}>
              <span style={s.aiDot} /> AI GEN-FOCUS ACTIVE
            </div>
          </div>

          <div style={s.recGrid}>
            {recommendations.map((item, i) => (
              <div key={i} style={s.recCard}>
                <div style={s.recAccent} />
                <div style={s.recContent}>
                  <div style={s.recText}>{item}</div>
                  <div style={s.recTag}>{TAG_LABELS[i % TAG_LABELS.length]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── styles ─────────────────────────────────────────────── */
const s = {
  page: {
    minHeight: "100vh",
    background: "#f0f7f2",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    color: "#111",
  },
  loadingPage: {
    minHeight: "100vh", display: "flex",
    alignItems: "center", justifyContent: "center",
    background: "#f0f7f2",
  },

  /* nav */
  nav: {
    background: "#12311e",
    display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
    alignItems: "center",
    padding: "0 40px", height: 54,
  },
  navBrand: { display: "flex", alignItems: "center", gap: 8 },
  navDot: {
    width: 10, height: 10, borderRadius: "50%",
    background: "#4ade80", display: "inline-block",
  },
  navTitle: { color: "#fff", fontWeight: 700, fontSize: 15 },
  navCenter: { color: "#d1fae5", fontSize: 14, fontWeight: 500, textAlign: "center" },

  /* body */
  body: { maxWidth: 1200, margin: "0 auto", padding: "36px 32px 60px" },

  /* header */
  headerRow: {
    display: "flex", alignItems: "flex-start",
    justifyContent: "space-between", gap: 32, marginBottom: 36,
  },
  headerLeft: { flex: 1 },
  chip: {
    display: "inline-block", background: "#d1fae5", color: "#198754",
    padding: "5px 14px", borderRadius: 99,
    fontSize: 12, fontWeight: 700, letterSpacing: "0.07em", marginBottom: 14,
  },
  mainTitle: { fontSize: 38, fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.02em" },
  subtitle: { color: "#4b5563", fontSize: 15, lineHeight: 1.65, maxWidth: 520, margin: 0 },

  scoreCard: {
    background: "#fff", borderRadius: 20,
    padding: "22px 28px", display: "flex", alignItems: "center", gap: 20,
    boxShadow: "0 2px 20px rgba(0,0,0,.06)", minWidth: 300,
  },
  scoreText: {},
  scoreLabel: { fontSize: 20, fontWeight: 800, marginBottom: 8 },
  scoreRow: { display: "flex", alignItems: "center", gap: 10 },
  scoreStatus: { fontSize: 14, color: "#6b7280" },
  statusBadge: {
    padding: "4px 12px", borderRadius: 99,
    fontSize: 13, fontWeight: 700,
  },

  /* section cards */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 18, marginBottom: 28,
  },
  card: {
    background: "#fff", borderRadius: 18,
    padding: "22px 20px 16px",
    boxShadow: "0 2px 16px rgba(0,0,0,.05)",
    display: "flex", flexDirection: "column",
  },
  cardHeader: { display: "flex", alignItems: "center", gap: 10, marginBottom: 18 },
  cardIconWrap: {
    width: 34, height: 34, background: "#e8f5ee", borderRadius: 8,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 17,
  },
  cardTitle: { fontSize: 18, fontWeight: 700 },
  topicList: { flex: 1 },
  topicRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "11px 0", borderBottom: "1px solid #f3f4f6",
  },
  topicName: { fontSize: 14, color: "#374151", fontWeight: 500 },
  badge: {
    padding: "4px 12px", borderRadius: 99,
    fontSize: 13, fontWeight: 700, minWidth: 56, textAlign: "center",
  },
  empty: { color: "#9ca3af", fontSize: 14 },
  viewLink: {
    marginTop: 18, background: "none", border: "none",
    color: "#198754", fontSize: 12, fontWeight: 700,
    letterSpacing: "0.06em", cursor: "pointer",
    textAlign: "left", padding: 0,
  },

  /* recommendations */
  focusBox: {
    background: "#fff", borderRadius: 20,
    padding: "28px 32px",
    boxShadow: "0 2px 16px rgba(0,0,0,.05)",
  },
  focusHeader: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", marginBottom: 24,
  },
  focusTitle: { fontSize: 24, fontWeight: 800, margin: 0 },
  aiChip: {
    display: "flex", alignItems: "center", gap: 7,
    background: "#e8f5ee", color: "#198754",
    padding: "6px 14px", borderRadius: 99,
    fontSize: 12, fontWeight: 700, letterSpacing: "0.07em",
  },
  aiDot: {
    width: 8, height: 8, borderRadius: "50%",
    background: "#198754", display: "inline-block",
  },
  recGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
  },
  recCard: {
    display: "flex", alignItems: "stretch",
    background: "#f8faf8", borderRadius: 14,
    overflow: "hidden",
  },
  recAccent: { width: 4, background: "#198754", flexShrink: 0 },
  recContent: { padding: "16px 18px" },
  recText: { fontSize: 15, fontWeight: 600, color: "#111", marginBottom: 6 },
  recTag: {
    fontSize: 11, fontWeight: 700, color: "#198754",
    letterSpacing: "0.09em",
  },
};

export default WeakTopicsCard;