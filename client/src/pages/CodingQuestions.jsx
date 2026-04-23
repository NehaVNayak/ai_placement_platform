import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CodingQuestions() {
  const { topic } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [attempted, setAttempted] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchQuestions();
    fetchAttempted();
  }, []);

  const fetchQuestions = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/coding/questions?topic=${topic}`
    );
    setQuestions(res.data);
  };

  const fetchAttempted = async () => {
    const studentId = localStorage.getItem("studentId");
    const res = await axios.get(
      `http://127.0.0.1:8000/api/coding/attempted?studentId=${studentId}&topic=${topic}`
    );
    setAttempted(res.data);
  };

  const solvedCount = attempted.length;
  const totalCount = questions.length;
  const completionPct = totalCount === 0 ? 0 : Math.round((solvedCount / totalCount) * 100);
  const remaining = totalCount - solvedCount;

  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedQuestions = expanded ? filteredQuestions : filteredQuestions.slice(0, 5);

  // Circular progress SVG params
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (completionPct / 100) * circumference;

  return (
    <div style={styles.page}>
      {/* ── NAV ── */}
      <nav style={styles.nav}>
        <div style={styles.navDot} />
        <span style={styles.navBrand}>AI Placement PreP</span>
      </nav>

      {/* ── HERO ── */}
      <div style={styles.hero}>
        {/* Left */}
        <div style={styles.heroLeft}>
          <div style={styles.badge}>
            <span style={styles.badgeStar}>✦</span>
            SMART DSA ROADMAP
          </div>
          <h1 style={styles.heroTitle}>{topic?.toUpperCase()} Problems</h1>
          <p style={styles.heroSub}>
            Solve curated coding questions asked in top-tier placement
            interviews, powered by AI feedback loops.
          </p>
        </div>

        {/* Right — circular progress */}
        <div style={styles.circleCard}>
          <svg width="100" height="100" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="50" cy="50" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="7" />
            <circle
              cx="50" cy="50" r={radius}
              fill="none"
              stroke="#16a34a"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={`${strokeDash} ${circumference}`}
            />
          </svg>
          <div style={styles.circleInner}>
            <span style={styles.circlePercent}>{completionPct}%</span>
          </div>
          <div style={styles.circleRight}>
            <span style={styles.circleLabel}>COMPLETION</span>
            <span style={styles.circleFraction}>{solvedCount} / {totalCount}</span>
            <span style={styles.circleSolved}>Solved</span>
          </div>
        </div>
      </div>

      {/* ── PROGRESS OVERVIEW CARD ── */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.cardTitle}>Progress Overview</span>
          <span style={styles.cardMeta}>🗓 Last updated 2 mins ago</span>
        </div>
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: totalCount === 0 ? "0%" : `${(solvedCount / totalCount) * 100}%`,
            }}
          />
        </div>
        <div style={styles.statsRow}>
          <div style={styles.statBlock}>
            <span style={styles.statLabel}>SOLVED</span>
            <span style={styles.statValue}>{solvedCount}</span>
            <span style={styles.statSub}>problems</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.statBlock}>
            <span style={styles.statLabel}>REMAINING</span>
            <span style={styles.statValue}>{remaining}</span>
            <span style={styles.statSub}>to go</span>
          </div>
        </div>
      </div>

      {/* ── PROBLEMS TABLE CARD ── */}
      <div style={styles.card}>
        {/* Table header row */}
        <div style={styles.tableHeaderRow}>
          <span style={styles.cardTitle}>Problems</span>
          <div style={styles.tableControls}>
            {/* Search */}
            <div style={styles.searchWrap}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                style={styles.searchInput}
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Filter */}
            <button style={styles.filterBtn} onClick={() => setFilterOpen(!filterOpen)}>
              <span>≡</span> Filter
            </button>
          </div>
        </div>

        {/* Column headers */}
        <div style={styles.colHeaders}>
          <span style={{ ...styles.colHead, width: 40 }}>#</span>
          <span style={{ ...styles.colHead, flex: 1 }}>PROBLEM TITLE</span>
          <span style={{ ...styles.colHead, width: 120, textAlign: "center" }}>DIFFICULTY</span>
          <span style={{ ...styles.colHead, width: 130, textAlign: "center" }}>STATUS</span>
          <span style={{ ...styles.colHead, width: 80, textAlign: "center" }}>ACTION</span>
        </div>

        {/* Rows */}
        {displayedQuestions.map((q, index) => {
          const isSolved = attempted.includes(q._id);
          return (
            <ProblemRow
              key={q._id}
              index={questions.indexOf(q) + 1}
              question={q}
              isSolved={isSolved}
              onClick={() => navigate(`/coding/${topic}/problem?q=${q._id}`)}
            />
          );
        })}

        {/* View all */}
        {filteredQuestions.length > 5 && (
          <button style={styles.viewAllBtn} onClick={() => setExpanded(!expanded)}>
            {expanded ? `Collapse ▲` : `View All ${topic?.charAt(0).toUpperCase() + topic?.slice(1)} Problems ▾`}
          </button>
        )}
      </div>
    </div>
  );
}

function ProblemRow({ index, question, isSolved, onClick }) {
  const [hovered, setHovered] = useState(false);

  const diffStyle =
    question.difficulty === "easy"
      ? styles.easy
      : question.difficulty === "medium"
      ? styles.medium
      : styles.hard;

  return (
    <div
      style={{
        ...styles.problemRow,
        background: hovered ? "#f9fafb" : "white",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* # */}
      <span style={{ ...styles.cellText, width: 40, color: "#9ca3af" }}>{index}</span>

      {/* Title + tags */}
      <div style={{ flex: 1 }}>
        <div style={styles.problemTitle}>{question.title}</div>
        {question.tags && (
          <div style={styles.tagRow}>
            {question.tags.map((tag) => (
              <span key={tag} style={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Difficulty */}
      <div style={{ width: 120, display: "flex", justifyContent: "center" }}>
        <span style={{ ...styles.diffBadge, ...diffStyle }}>
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </span>
      </div>

      {/* Status */}
      <div style={{ width: 130, display: "flex", justifyContent: "center", alignItems: "center", gap: 6 }}>
        {isSolved ? (
          <>
            <span style={styles.solvedIcon}>✔</span>
            <span style={styles.solvedText}>Solved</span>
          </>
        ) : (
          <>
            <span style={styles.pendingCircle} />
            <span style={styles.pendingText}>Pending</span>
          </>
        )}
      </div>

      {/* Arrow */}
      <div style={{ width: 80, display: "flex", justifyContent: "center" }}>
        <span style={styles.arrowBtn}>→</span>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0fdf4",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: "#111",
  },

  /* NAV */
  nav: {
    background: "#052e16",
    padding: "0 32px",
    height: 52,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  navDot: {
    width: 10, height: 10,
    borderRadius: "50%",
    background: "#22c55e",
  },
  navBrand: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },

  /* HERO */
  hero: {
    maxWidth: 1040,
    margin: "0 auto",
    padding: "40px 24px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 24,
    flexWrap: "wrap",
  },
  heroLeft: { flex: 1, minWidth: 260 },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "white",
    border: "1px solid #d1fae5",
    borderRadius: 20,
    padding: "4px 12px",
    fontSize: 11,
    fontWeight: "700",
    color: "#166534",
    letterSpacing: "0.06em",
    marginBottom: 14,
  },
  badgeStar: { color: "#16a34a", fontSize: 13 },
  heroTitle: {
    fontSize: 38,
    fontWeight: "800",
    color: "#052e16",
    margin: "0 0 10px",
    lineHeight: 1.15,
  },
  heroSub: {
    fontSize: 15,
    color: "#4b7a5c",
    lineHeight: 1.6,
    maxWidth: 420,
    margin: 0,
  },

  /* Circle card */
  circleCard: {
    background: "white",
    borderRadius: 14,
    padding: "20px 28px",
    display: "flex",
    alignItems: "center",
    gap: 18,
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
    border: "1px solid #e5e7eb",
    minWidth: 230,
    position: "relative",
  },
  circleInner: {
    position: "absolute",
    left: 20,
    top: 0,
    width: 100,
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  circlePercent: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
  },
  circleRight: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  circleLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: "0.08em",
  },
  circleFraction: {
    fontSize: 22,
    fontWeight: "800",
    color: "#052e16",
    lineHeight: 1.2,
  },
  circleSolved: {
    fontSize: 13,
    color: "#16a34a",
    fontWeight: "600",
  },

  /* CARD */
  card: {
    maxWidth: 1040,
    margin: "0 auto 20px",
    padding: "24px",
    background: "white",
    borderRadius: 14,
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    border: "1px solid #e5e7eb",
    marginLeft: "auto",
    marginRight: "auto",
    width: "calc(100% - 48px)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  cardMeta: {
    fontSize: 13,
    color: "#9ca3af",
  },

  /* PROGRESS BAR */
  progressBar: {
    height: 8,
    background: "#e5e7eb",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressFill: {
    height: "100%",
    background: "#16a34a",
    borderRadius: 10,
    transition: "width 0.5s ease",
  },

  /* STATS */
  statsRow: {
    display: "flex",
    alignItems: "center",
    gap: 32,
  },
  statBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: "0.08em",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "800",
    color: "#052e16",
    lineHeight: 1.1,
  },
  statSub: {
    fontSize: 13,
    color: "#6b7280",
  },
  divider: {
    width: 1,
    height: 48,
    background: "#e5e7eb",
  },

  /* TABLE */
  tableHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    flexWrap: "wrap",
    gap: 10,
  },
  tableControls: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "6px 12px",
    gap: 8,
    background: "#f9fafb",
  },
  searchIcon: { fontSize: 14, color: "#9ca3af" },
  searchInput: {
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: 14,
    color: "#374151",
    width: 180,
  },
  filterBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "7px 14px",
    background: "white",
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    cursor: "pointer",
  },
  colHeaders: {
    display: "flex",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #f3f4f6",
    marginBottom: 4,
  },
  colHead: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: "0.06em",
  },
  problemRow: {
    display: "flex",
    alignItems: "center",
    padding: "16px 0",
    borderBottom: "1px solid #f3f4f6",
    cursor: "pointer",
    transition: "background 0.15s",
  },
  cellText: {
    fontSize: 14,
    color: "#374151",
  },
  problemTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 4,
  },
  tagRow: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  },
  tag: {
    fontSize: 11,
    background: "#f3f4f6",
    color: "#6b7280",
    borderRadius: 4,
    padding: "2px 8px",
    fontWeight: "500",
  },
  diffBadge: {
    fontSize: 12,
    fontWeight: "600",
    padding: "4px 12px",
    borderRadius: 20,
  },
  easy: { background: "#dcfce7", color: "#166534" },
  medium: { background: "#fef9c3", color: "#854d0e" },
  hard: { background: "#fee2e2", color: "#991b1b" },

  /* Status */
  solvedIcon: {
    width: 18, height: 18,
    borderRadius: "50%",
    background: "#16a34a",
    color: "white",
    fontSize: 10,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
  },
  solvedText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#16a34a",
  },
  pendingCircle: {
    width: 16, height: 16,
    borderRadius: "50%",
    border: "2px solid #d1d5db",
    display: "inline-block",
  },
  pendingText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#9ca3af",
  },
  arrowBtn: {
    fontSize: 18,
    color: "#9ca3af",
    fontWeight: "300",
  },

  /* View all */
  viewAllBtn: {
    width: "100%",
    padding: "14px",
    background: "none",
    border: "none",
    borderTop: "1px solid #f3f4f6",
    color: "#16a34a",
    fontWeight: "600",
    fontSize: 14,
    cursor: "pointer",
    marginTop: 8,
    textAlign: "center",
  },
};

export default CodingQuestions;