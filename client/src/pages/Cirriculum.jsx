import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UNIT_ICONS = {
  0: ( // Aptitude
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="2" width="8" height="8" rx="1.5" fill="#16a34a"/>
      <rect x="12" y="2" width="8" height="8" rx="1.5" fill="#16a34a" opacity="0.6"/>
      <rect x="2" y="12" width="8" height="8" rx="1.5" fill="#16a34a" opacity="0.6"/>
      <rect x="12" y="12" width="8" height="8" rx="1.5" fill="#16a34a" opacity="0.3"/>
    </svg>
  ),
  1: ( // Logical
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="6" cy="11" r="3.5" stroke="#16a34a" strokeWidth="2"/>
      <circle cx="16" cy="11" r="3.5" stroke="#16a34a" strokeWidth="2"/>
      <path d="M9.5 11h3" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  2: ( // Verbal
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M4 6h14M4 11h10M4 16h7" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
      <text x="15" y="18" fontSize="7" fontWeight="bold" fill="#16a34a">A</text>
    </svg>
  ),
  3: ( // Programming
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <polyline points="7,7 3,11 7,15" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="15,7 19,11 15,15" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="13" y1="5" x2="9" y2="17" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  4: ( // DSA
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="4" r="2.5" fill="#16a34a"/>
      <circle cx="4" cy="14" r="2.5" fill="#16a34a" opacity="0.7"/>
      <circle cx="18" cy="14" r="2.5" fill="#16a34a" opacity="0.7"/>
      <line x1="11" y1="6.5" x2="5.5" y2="12" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="11" y1="6.5" x2="16.5" y2="12" stroke="#16a34a" strokeWidth="1.5"/>
    </svg>
  ),
  5: ( // DBMS
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <ellipse cx="11" cy="6" rx="7" ry="2.5" stroke="#16a34a" strokeWidth="2"/>
      <path d="M4 6v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V6" stroke="#16a34a" strokeWidth="2"/>
      <path d="M4 11v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-5" stroke="#16a34a" strokeWidth="2"/>
    </svg>
  ),
  6: ( // OS
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="3" width="16" height="12" rx="2" stroke="#16a34a" strokeWidth="2"/>
      <line x1="7" y1="19" x2="15" y2="19" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
      <line x1="11" y1="15" x2="11" y2="19" stroke="#16a34a" strokeWidth="2"/>
    </svg>
  ),
  7: ( // CN
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="8" stroke="#16a34a" strokeWidth="2"/>
      <path d="M3 11h16M11 3c-2 3-2 12 0 16M11 3c2 3 2 12 0 16" stroke="#16a34a" strokeWidth="1.5"/>
    </svg>
  ),
  8: ( // OOP
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="7" y="2" width="8" height="6" rx="1.5" stroke="#16a34a" strokeWidth="2"/>
      <rect x="2" y="14" width="7" height="6" rx="1.5" stroke="#16a34a" strokeWidth="2"/>
      <rect x="13" y="14" width="7" height="6" rx="1.5" stroke="#16a34a" strokeWidth="2"/>
      <line x1="11" y1="8" x2="11" y2="12" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="5.5" y1="12" x2="16.5" y2="12" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="5.5" y1="12" x2="5.5" y2="14" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="16.5" y1="12" x2="16.5" y2="14" stroke="#16a34a" strokeWidth="1.5"/>
    </svg>
  ),
  9: ( // Web Dev
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="4" width="18" height="14" rx="2" stroke="#16a34a" strokeWidth="2"/>
      <line x1="2" y1="8" x2="20" y2="8" stroke="#16a34a" strokeWidth="1.5"/>
      <circle cx="5" cy="6" r="1" fill="#16a34a"/>
      <circle cx="8" cy="6" r="1" fill="#16a34a"/>
    </svg>
  ),
  10: ( // Projects
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 17 L11 5 L19 17 Z" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinejoin="round"/>
      <circle cx="11" cy="5" r="1.5" fill="#16a34a"/>
    </svg>
  ),
  11: ( // Resume
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="4" y="2" width="14" height="18" rx="2" stroke="#16a34a" strokeWidth="2"/>
      <line x1="7" y1="7" x2="15" y2="7" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="7" y1="11" x2="15" y2="11" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="7" y1="15" x2="11" y2="15" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  12: ( // Interview
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M4 18V17a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="11" cy="7" r="4" stroke="#16a34a" strokeWidth="2"/>
    </svg>
  ),
  13: ( // Placement
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <polyline points="3,12 8,17 19,6" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  14: ( // Advanced
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="3" fill="#16a34a"/>
      <path d="M11 2v3M11 17v3M2 11h3M17 11h3M4.93 4.93l2.12 2.12M14.95 14.95l2.12 2.12M4.93 17.07l2.12-2.12M14.95 7.05l2.12-2.12" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

const sections = [
  {
    title: "Aptitude & Quantitative",
    unit: "Unit 01",
    completedTopics: ["Percentages","Profit & Loss","Ratio & Proportion",
        "Time, Speed & Distance","Time & Work",
        "Simple & Compound Interest","Permutation & Combination",
        "Probability","Averages","Number System",
        "Mixtures & Allegations","Pipes & Cisterns",
        "Data Interpretation"],
    pendingTopics: [],
    progress: 75,
  },
  {
    title: "Logical Reasoning",
    unit: "Unit 02",
    completedTopics: ["Puzzles"],
    pendingTopics: ["Seating Arrangement","Blood Relations","Syllogism",
        "Coding-Decoding","Puzzles","Direction Sense",
        "Statement & Assumptions","Data Sufficiency",
        "Series Completion","Calendar & Clock Problems"],
    progress: 30,
  },
  {
    title: "Verbal Ability",
    unit: "Unit 03",
    completedTopics: [],
    pendingTopics: ["Reading Comprehension","Grammar","Sentence Correction",
        "Para Jumbles","Synonyms & Antonyms",
        "Vocabulary Building","Error Detection",
        "Cloze Test","Communication Skills"],
    progress: 10,
  },
  {
    title: "Programming Fundamentals",
    unit: "Unit 04",
    completedTopics: [ "Variables & Data Types","Operators",
        "Conditional Statements","Loops","Functions",
        "Arrays","Strings","Recursion",
        "Pointers","File Handling","OOP Concepts"],
    pendingTopics: ["Arrays & Objects"],
    progress: 60,
  },
  {
    title: "Data Structures & DSA",
    unit: "Unit 05",
    completedTopics: [ "Arrays","Strings","Linked List","Stack","Queue",
        "Hashing","Trees","Binary Search Tree","Heap",
        "Graph","Trie","Greedy Algorithms",
        "Backtracking","Dynamic Programming",
        "Sliding Window","Two Pointers",
        "Sorting Algorithms","Searching Algorithms",
        "Bit Manipulation"],
    pendingTopics: ["Greedy Algorithms"],
    progress: 50,
  },
  {
    title: "DBMS & SQL",
    unit: "Unit 06",
    completedTopics: [],
    pendingTopics: ["ER Diagram","Normalization","SQL Queries",
        "Joins","Subqueries","Indexing",
        "Transactions","ACID Properties",
        "Views","Stored Procedures"],
    progress: 5,
  },
  {
    title: "Operating Systems",
    unit: "Unit 07",
    completedTopics: [],
    pendingTopics: [  "Process & Threads","Scheduling Algorithms",
        "Deadlocks","Memory Management",
        "Paging & Segmentation","Synchronization",
        "Semaphores","File Systems"],
    progress: 0,
  },
  {
    title: "Computer Networks",
    unit: "Unit 08",
    completedTopics: [],
    pendingTopics: [ "OSI Model","TCP/IP","HTTP / HTTPS",
        "DNS","IP Addressing","Routing",
        "Switching","Subnetting",
        "Network Security Basics"],
    progress: 0,
  },
  {
    title: "OOP Concepts",
    unit: "Unit 09",
    completedTopics: ["Class & Object","Encapsulation",
        "Inheritance","Polymorphism",
        "Abstraction","Constructor / Destructor",
        "Overloading / Overriding"],
    pendingTopics: ["Polymorphism"],
    progress: 65,
  },
  {
    title: "Web Development",
    unit: "Unit 10",
    completedTopics: ["HTML","CSS","JavaScript","React",
        "Node.js","Express.js","REST APIs",
        "Authentication","MongoDB / MySQL",
        "Git & GitHub"],
    pendingTopics: [],
    progress: 80,
  },
  {
    title: "Core Projects",
    unit: "Unit 11",
    completedTopics: [],
    pendingTopics: ["CRUD Project","Full Stack Project",
        "Authentication Project","Resume Project",
        "API Integration Project","Deployment Project"],
    progress: 20,
  },
  {
    title: "Resume Building",
    unit: "Unit 12",
    completedTopics: [ "ATS Friendly Resume","Project Description Writing",
        "Skills Section","Achievements",
        "GitHub / LinkedIn Optimization"],
    pendingTopics: [],
    progress: 90,
  },
  {
    title: "Interview Preparation",
    unit: "Unit 13",
    completedTopics: [],
    pendingTopics: ["HR Questions","Tell Me About Yourself",
        "Strengths & Weaknesses","Project Explanation",
        "Technical Mock Interview",
        "Coding Interview","Group Discussion"],
    progress: 15,
  },
  {
    title: "Placement Readiness",
    unit: "Unit 14",
    completedTopics: [],
    pendingTopics: ["System Design Basics","Low Level Design",
        "High Level Design","Multithreading",
        "Scalability Basics","Design Patterns",
        "Competitive Coding"],
    progress: 0,
  },
  {
    title: "Advanced Product Prep",
    unit: "Unit 15",
    completedTopics: [],
    pendingTopics: ["System Design (LLD/HLD)", "Multithreading"],
    progress: 0,
  },
];

const LEVEL_STEPS = ["Beginner", "Intermediate", "Advanced", "Interview Ready", "Placement Ready"];

function UnitCard({ section, index, onStart }) {
  const [hovered, setHovered] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const allTopics = [
    ...section.completedTopics,
    ...section.pendingTopics
  ];

  const visibleTopics = showAll
    ? allTopics
    : allTopics.slice(0, 3);

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: hovered
          ? "0 10px 28px rgba(22,163,74,0.13)"
          : "0 2px 10px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-2px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top row */}
      <div style={styles.cardTop}>
        <div style={styles.iconBox}>
          {UNIT_ICONS[index]}
        </div>

        <span style={styles.unitBadge}>
          {section.unit}
        </span>
      </div>

      {/* Title */}
      <h2 style={styles.cardTitle}>
        {section.title}
      </h2>

      {/* Topics */}
      <div style={styles.topicList}>
        {visibleTopics.map((topic, i) => {
          const completed =
            section.completedTopics.includes(topic);

          return (
            <div key={i} style={styles.topicRow}>
              <span
                style={
                  completed
                    ? styles.dotGreen
                    : styles.dotGray
                }
              >
                ●
              </span>

              <span
              >
                {topic}
              </span>
            </div>
          );
        })}
      </div>

      {/* More Topics Button */}
      {allTopics.length > 3 && (
        <button
          style={styles.moreBtn}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll
            ? "Show Less ▲"
            : "More Topics ▼"}
        </button>
      )}

      
    </div>
  );
}

export default function Curriculum() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* ── NAV ── */}
      <nav style={styles.nav}>
        <span style={styles.navBrand}>AI Placement PreP</span>
        <div style={styles.navLinks}>
          <span style={styles.navLinkActive}>Curriculum</span>
          <span style={styles.navLink}>Roadmap</span>
          <span style={styles.navLink}>Mentors</span>
          <span style={styles.navLink}>Insights</span>
        </div>
        <div style={styles.navRight}>
          <span style={styles.signIn}>Sign In</span>
          <button style={styles.upgradeBtn}>Upgrade to Pro</button>
        </div>
      </nav>

      <div style={styles.container}>

        {/* ── HERO ── */}
        <div style={styles.hero}>
          <div style={styles.heroLeft}>
            <div style={styles.heroBadge}>
              <span style={styles.heroBadgeDot}>+</span>
              COMPLETE SUCCESS ROADMAP
            </div>
            <h1 style={styles.heroTitle}>Placement Curriculum 📚</h1>
            <p style={styles.heroSub}>
              A complete guided roadmap to become interview ready<br />
              and placement ready. Master everything from core<br />
              fundamentals to advanced system design.
            </p>
            <div style={styles.heroBtns}>
              <button style={styles.startBtn}
              onClick={() => navigate("/practice")}>Start Journey</button>
              <button
                style={styles.dashBtn}
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
          <div style={styles.heroRight}>
            <div style={styles.heroGrid}>
              <div style={styles.heroTile} />
              <div style={styles.heroTile} />
              <div style={styles.heroTile} />
              <div style={{ ...styles.heroTile, gridColumn: "span 1" }} />
              <div style={{ ...styles.heroTile, background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 22, color: "white" }}>↗</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── STAT PILLS ── */}
        <div style={styles.statsRow}>
          {[
            { label: "MODULES", value: "15 Active", icon: "▦" },
            { label: "TOPICS", value: "120+ Units", icon: "⬡" },
            { label: "PROJECTS", value: "6 Capstones", icon: "◈" },
            { label: "READINESS", value: "78% Score", icon: "✔", accent: true },
          ].map((s, i) => (
            <div key={i} style={{ ...styles.statPill, ...(s.accent ? styles.statPillAccent : {}) }}>
              <span style={styles.statIcon}>{s.icon}</span>
              <div>
                <div style={styles.statLabel}>{s.label}</div>
                <div style={styles.statValue}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── UNIT GRID ── */}
        <div style={styles.grid}>
          {sections.map((section, index) => (
            <UnitCard key={index} section={section} index={index} />
          ))}
        </div>

        {/* ── FINAL LEVELS ── */}
        <div style={styles.levelsCard}>
          <div style={styles.levelsTop}>
            <div>
              <span style={styles.levelsTitle}>Final Levels 🚀</span>
              <span style={styles.levelsSub}> Tracking your evolution</span>
            </div>
            
          </div>

          {/* Step track */}
          <div style={styles.track}>
            <div style={styles.trackLine} />
            {LEVEL_STEPS.map((step, i) => {
              const done = i < 3;
              const active = i === 3;
              return (
                <div key={i} style={styles.trackStep}>
                  <div style={{
                    ...styles.trackDot,
                    background: done ? "#16a34a" : active ? "white" : "#e5e7eb",
                    border: active ? "2.5px solid #16a34a" : done ? "none" : "2px solid #d1d5db",
                  }}>
                    {done && <span style={{ color: "white", fontSize: 12 }}>✔</span>}
                    {active && <span style={{ color: "#16a34a", fontSize: 14 }}>★</span>}
                  </div>
                  <span style={{
                    ...styles.trackLabel,
                    color: done || active ? "#0f1a0f" : "#9ca3af",
                    fontWeight: active ? "700" : "500",
                  }}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0f4ec",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },

  /* NAV */
  nav: {
    background: "#0a1a0a",
    height: 52,
    display: "flex",
    alignItems: "center",
    padding: "0 32px",
    gap: 40,
  },
  navBrand: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: "0.01em",
    marginRight: 16,
  },
  navLinks: {
    display: "flex",
    gap: 28,
    flex: 1,
  },
  navLink: {
    color: "#9ca3af",
    fontSize: 14,
    cursor: "pointer",
  },
  navLinkActive: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    borderBottom: "2px solid #16a34a",
    paddingBottom: 2,
  },
  moreBtn: {
  marginBottom: "14px",
  background: "#f0fdf4",
  border: "1px solid #bbf7d0",
  color: "#15803d",
  padding: "8px 12px",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "pointer",
},
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  signIn: {
    color: "#9ca3af",
    fontSize: 14,
    cursor: "pointer",
  },
  upgradeBtn: {
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: 20,
    padding: "7px 16px",
    fontSize: 13,
    fontWeight: "600",
    cursor: "pointer",
  },

  /* CONTAINER */
  container: {
    maxWidth: 1060,
    margin: "0 auto",
    padding: "28px 20px 60px",
  },

  /* HERO */
  hero: {
    background: "linear-gradient(135deg, #0f2d14 0%, #1a4a20 60%, #0f3a18 100%)",
    borderRadius: 18,
    padding: "40px 44px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    overflow: "hidden",
    position: "relative",
  },
  heroLeft: { flex: 1, maxWidth: 440 },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(255,255,255,0.12)",
    color: "#86efac",
    borderRadius: 20,
    padding: "5px 14px",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: "0.07em",
    marginBottom: 16,
  },
  heroBadgeDot: {
    fontSize: 14,
    color: "#4ade80",
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: "white",
    margin: "0 0 12px",
    lineHeight: 1.2,
  },
  heroSub: {
    fontSize: 14,
    color: "#a7c5a7",
    lineHeight: 1.7,
    margin: "0 0 26px",
  },
  heroBtns: {
    display: "flex",
    gap: 12,
  },
  startBtn: {
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: 10,
    padding: "11px 22px",
    fontSize: 14,
    fontWeight: "700",
    cursor: "pointer",
  },
  dashBtn: {
    background: "transparent",
    color: "white",
    border: "1.5px solid rgba(255,255,255,0.35)",
    borderRadius: 10,
    padding: "11px 22px",
    fontSize: 14,
    fontWeight: "600",
    cursor: "pointer",
  },
  heroRight: {
    marginLeft: 32,
    flexShrink: 0,
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 110px)",
    gridTemplateRows: "repeat(3, 60px)",
    gap: 10,
  },
  heroTile: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)",
  },

  /* STATS */
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 14,
    marginBottom: 24,
  },
  statPill: {
    background: "white",
    borderRadius: 12,
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
  },
  statPillAccent: {
    border: "1.5px solid #bbf7d0",
  },
  statIcon: {
    fontSize: 20,
    color: "#16a34a",
    background: "#f0fdf4",
    width: 38,
    height: 38,
    borderRadius: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: "0.07em",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0a1a0a",
  },

  /* UNIT GRID */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    marginBottom: 24,
  },

  /* UNIT CARD */
  card: {
    background: "white",
    borderRadius: 16,
    padding: "20px 20px 16px",
    transition: "box-shadow 0.2s, transform 0.2s",
    border: "1px solid #e8f0e8",
    cursor: "default",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  iconBox: {
    width: 40,
    height: 40,
    background: "#f0fdf4",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  unitBadge: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6b7280",
    background: "#f3f4f6",
    borderRadius: 6,
    padding: "3px 9px",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0a1a0a",
    margin: "0 0 12px",
    lineHeight: 1.25,
  },
  topicList: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 16,
    minHeight: 72,
  },
  topicRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  dotGreen: {
    color: "#16a34a",
    fontSize: 9,
    lineHeight: 1,
  },
  dotGray: {
    color: "#d1d5db",
    fontSize: 9,
    lineHeight: 1,
  },
  topicText: {
    fontSize: 13,
    color: "#374151",
    lineHeight: 1.4,
  },
  cardProgressBar: {
    height: 4,
    background: "#f3f4f6",
    borderRadius: 10,
    overflow: "hidden",
  },
  cardProgressFill: {
    height: "100%",
    background: "#16a34a",
    borderRadius: 10,
    transition: "width 0.4s ease",
  },

  /* FINAL LEVELS */
  levelsCard: {
    background: "white",
    borderRadius: 16,
    padding: "24px 28px 28px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  levelsTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    flexWrap: "wrap",
    gap: 12,
  },
  levelsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0a1a0a",
  },
  levelsSub: {
    fontSize: 14,
    color: "#9ca3af",
    marginLeft: 8,
  },
  estimateBadge: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: 20,
    padding: "6px 14px",
    fontSize: 11,
    fontWeight: "700",
    color: "#166534",
    letterSpacing: "0.05em",
  },
  track: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    position: "relative",
    padding: "0 20px",
  },
  trackLine: {
    position: "absolute",
    top: 18,
    left: 40,
    right: 40,
    height: 3,
    background: "linear-gradient(to right, #16a34a 60%, #e5e7eb 60%)",
    borderRadius: 4,
    zIndex: 0,
  },
  trackStep: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    zIndex: 1,
  },
  trackDot: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: "700",
  },
  trackLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
    textAlign: "center",
  },
};