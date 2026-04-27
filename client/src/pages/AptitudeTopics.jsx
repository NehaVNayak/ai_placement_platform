import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const topicIcons = {
  Series: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  "Coding-Decoding": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  "Blood Relations": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  "Seating Arrangement": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  ),
  Puzzle: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  "Direction Sense": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  Percentages: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  ),
  Ratio: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  "Profit Loss": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  "Time Work": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  "Speed Distance": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  ),
  Probability: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Grammar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  ),
  "Sentence Correction": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Synonyms: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <line x1="6" y1="9" x2="6" y2="21" />
    </svg>
  ),
  Antonyms: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="18" x2="16" y2="18" />
    </svg>
  ),
  "Reading Comprehension": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  "Para Jumbles": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
};

// Fake badge data per topic for visual interest
const topicBadges = {
  "Coding-Decoding": { label: "COMMONLY ASKED", type: "tag" },
  "Blood Relations": { label: "85% Mastery", type: "mastery" },
  "Seating Arrangement": { label: "progress", type: "progress", value: 35 },
  Puzzle: { label: "difficulty", type: "stars", value: 3 },
  "Direction Sense": { label: "New Content Added", type: "new" },
};

function TopicBadge({ topic }) {
  const badge = topicBadges[topic];
  if (!badge) return <div style={badgeStyles.spacer} />;

  if (badge.type === "tag") {
    return (
      <span style={badgeStyles.tag}>{badge.label}</span>
    );
  }
  if (badge.type === "mastery") {
    return (
      <span style={badgeStyles.mastery}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#198754" stroke="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        {badge.label}
      </span>
    );
  }
  if (badge.type === "progress") {
    return (
      <div style={badgeStyles.progressBar}>
        <div style={{ ...badgeStyles.progressFill, width: `${badge.value}%` }} />
        <div style={badgeStyles.progressTrack} />
      </div>
    );
  }
  if (badge.type === "stars") {
    return (
      <div style={badgeStyles.stars}>
        {[1, 2, 3].map((i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24"
            fill={i <= badge.value ? "#198754" : "none"}
            stroke="#198754" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
    );
  }
  if (badge.type === "new") {
    return <span style={badgeStyles.newLabel}>{badge.label}</span>;
  }
  return null;
}

const badgeStyles = {
  spacer: { height: "20px" },
  tag: {
    display: "inline-block",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    color: "#198754",
    background: "#e6f4ee",
    borderRadius: "999px",
    padding: "3px 10px",
  },
  mastery: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#198754",
  },
  progressBar: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    width: "120px",
  },
  progressFill: {
    height: "6px",
    background: "#198754",
    borderRadius: "999px",
  },
  progressTrack: {
    flex: 1,
    height: "6px",
    background: "#d1e8db",
    borderRadius: "999px",
  },
  stars: {
    display: "flex",
    gap: "2px",
  },
  newLabel: {
    fontSize: "12px",
    fontWeight: "500",
    color: "#666",
  },
};



function AptitudeTopics() {
  const { section } = useParams();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
  solved: 0,
  accuracy: 0,
  weak_topic: "Loading..."
});

useEffect(() => {
  loadStats();
}, [section]);

const loadStats = async () => {
  const studentId = localStorage.getItem("studentId");

  try {
    const res = await axios.get(
      `http://localhost:8000/api/aptitude/stats?student_id=${studentId}&section=${section}`
    );

    setStats(res.data);

  } catch (error) {
    console.log(error);
  }
};
  const topics = {
    Logical: [
      { name: "Series" },
      { name: "Coding-Decoding" },
      { name: "Blood Relations" },
      { name: "Seating Arrangement" },
      { name: "Puzzle" },
      { name: "Direction Sense" },
    ],
    Quant: [
      { name: "Percentages" },
      { name: "Ratio" },
      { name: "Profit Loss" },
      { name: "Time Work" },
      { name: "Speed Distance" },
      { name: "Probability" },
    ],
    Verbal: [
      { name: "Grammar" },
      { name: "Sentence Correction" },
      { name: "Synonyms" },
      { name: "Antonyms" },
      { name: "Reading Comprehension" },
      { name: "Para Jumbles" },
    ],
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <nav style={styles.nav}>
        <div style={styles.navBrand}>
          <span style={styles.navDot} />
          <span style={styles.navLogo}>AI Placement PreP</span>
        </div>
        <span style={styles.navCenter}>Aptitude Learning Hub</span>
        <div style={styles.navRight}>
          <button style={styles.upgradeBtn}>Upgrade Pro</button>
          <button style={styles.iconBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <button style={styles.iconBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main style={styles.main}>
        {/* Pill badge */}
       <div
  style={{
    ...styles.pillBadge,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    margin: "0 auto 18px"
  }}
>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          TOPIC WISE PREPARATION
        </div>

        {/* Title */}
        <h1 style={{ ...styles.title, textAlign: "center" }}>
  {section} Topics
</h1>
        <p style={styles.subtitle}>
          Choose a topic and practice targeted questions to improve placement test performance.
        </p>

        {/* Feature pills */}
        <div style={styles.featurePills}>
          <div style={styles.featurePill}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            6 Topics Available
          </div>
          <div style={styles.featurePill}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Adaptive Practice
          </div>
          <div style={styles.featurePill}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            Track Progress
          </div>
        </div>

        {/* Topic grid */}
        <div style={styles.grid}>
          {(topics[section] || []).map((topic, index) => (
            <div
              key={index}
              style={styles.card}
              onClick={() => navigate(`/aptitude-practice/${section}/${topic.name}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(25,135,84,0.15)";
                e.currentTarget.style.borderColor = "#b6d9c7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = "#e8f0ec";
              }}
            >
              {/* Icon */}
              <div style={styles.iconWrapper}>
                <span style={styles.iconInner}>
                  {topicIcons[topic.name]}
                </span>
              </div>

              {/* Name + subtitle */}
              <h3 style={styles.cardTitle}>{topic.name}</h3>
              <p style={styles.cardSub}>Practice Questions + Accuracy Tracking</p>

              {/* Badge row + arrow */}
              <div style={styles.cardFooter}>
                <TopicBadge topic={topic.name} />
                <div style={styles.arrowBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div style={styles.statsBar}>
  <div style={styles.statItem}>
    <span style={styles.statLabel}>QUESTIONS SOLVED</span>
    <span style={styles.statValue}>{stats.solved}</span>
  </div>

  <div style={styles.statDivider} />

  <div style={styles.statItem}>
    <span style={styles.statLabel}>ACCURACY</span>
    <span style={styles.statValue}>{stats.accuracy}%</span>
  </div>

  <div style={styles.statDivider} />

  <div style={styles.statItem}>
    <span style={styles.statLabel}>WEAK TOPIC</span>
    <span style={{ ...styles.statValue, color: "#e05252" }}>
      {stats.weak_topic}
    </span>
  </div>
</div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0f4f1",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },

  /* NAV */
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    height: "56px",
    background: "#111",
    color: "#fff",
  },
  navBrand: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  navDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#4ade80",
    display: "inline-block",
  },
  navLogo: {
    fontWeight: "700",
    fontSize: "15px",
    letterSpacing: "-0.01em",
  },
  navCenter: {
    fontSize: "14px",
    color: "#aaa",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  upgradeBtn: {
    background: "#198754",
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    padding: "7px 16px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },
  iconBtn: {
    background: "rgba(255,255,255,0.08)",
    border: "none",
    borderRadius: "50%",
    width: "34px",
    height: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#fff",
  },

  /* MAIN */
  main: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "48px 24px 60px",
  },

  pillBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#d4eddf",
    color: "#198754",
    borderRadius: "999px",
    padding: "5px 14px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    marginBottom: "18px",
  },

  title: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#111",
    letterSpacing: "-0.02em",
    margin: "0 0 12px",
    lineHeight: 1.1,
    
  },

  subtitle: {
    fontSize: "15px",
    color: "#555",
    maxWidth: "520px",
    margin: "0 auto 28px",
    lineHeight: 1.6,
    textAlign: "center",
  },

  featurePills: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "40px",
    flexWrap: "wrap",
  },
  featurePill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#fff",
    border: "1px solid #dce8e1",
    borderRadius: "999px",
    padding: "7px 16px",
    fontSize: "13px",
    color: "#444",
    fontWeight: "500",
  },

  /* GRID */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginBottom: "40px",
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "26px",
    cursor: "pointer",
    transition: "box-shadow 0.2s ease, border-color 0.2s ease",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    border: "1.5px solid #e8f0ec",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  iconWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: "#e6f4ee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "6px",
  },
  iconInner: {
    color: "#198754",
    display: "flex",
  },

  cardTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#111",
    letterSpacing: "-0.01em",
  },
  cardSub: {
    margin: 0,
    fontSize: "12.5px",
    color: "#888",
    lineHeight: 1.4,
  },

  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  arrowBtn: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "#f0f4f1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#198754",
    flexShrink: 0,
  },

  /* STATS BAR */
  statsBar: {
    background: "#fff",
    borderRadius: "18px",
    border: "1.5px solid #e8f0ec",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "28px 40px",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
  },
  statLabel: {
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.08em",
    color: "#888",
    textTransform: "uppercase",
  },
  statValue: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#111",
    letterSpacing: "-0.02em",
  },
  statDivider: {
    width: "1px",
    height: "50px",
    background: "#e8f0ec",
  },
};

export default AptitudeTopics;