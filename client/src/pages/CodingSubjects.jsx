import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TOPICS = [
  { key: "arrays", label: "Arrays", questions: 42, icon: "▦" },
  { key: "dynamic-programming", label: "Dynamic Programming", questions: 58, icon: "⬡" },
  { key: "graph", label: "Graph", questions: 35, icon: "✳" },
  { key: "hashing", label: "Hashing", questions: 24, icon: "⊞" },
  { key: "linked-list", label: "Linked List", questions: 18, icon: "≡" },
  { key: "matrix", label: "Matrix", questions: 22, icon: "⠿" },
  { key: "sorting", label: "Sorting", questions: 15, icon: "≔" },
  { key: "string", label: "String", questions: 38, icon: "Aa" },
  { key: "stack", label: "Stack", questions: 12, icon: "⬘" },
  { key: "tree", label: "Tree", questions: 45, icon: "⬡" },
  { key: "heap", label: "Heap", questions: 14, icon: "△" },
  { key: "two-pointers", label: "Two Pointers", questions: 20, icon: "⇄" },
  { key: "sliding-window", label: "Sliding Window", questions: 16, icon: "S≡_" },
  { key: "binary-search", label: "Binary Search", questions: 22, icon: "⊕" },
  { key: "trie", label: "Trie", questions: 8, icon: "⬡" },
  { key: "backtracking", label: "Backtracking", questions: 25, icon: "↺" },
  { key: "greedy", label: "Greedy", questions: 19, icon: "◈" },
  { key: "intervals", label: "Intervals", questions: 12, icon: "⇅" },
  { key: "bit-manipulation", label: "Bit Manipulation", questions: 10, icon: "BINARY" },
  { key: "math-geometry", label: "Math & Geometry", questions: 15, icon: "∧" },
];

// Unique icons per topic as SVG-like emoji representations
const TOPIC_ICONS = {
  "arrays": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="8" width="6" height="16" rx="1" fill="#16a34a" opacity="0.8"/>
      <rect x="10" y="4" width="6" height="20" rx="1" fill="#16a34a"/>
      <rect x="18" y="10" width="6" height="14" rx="1" fill="#16a34a" opacity="0.6"/>
      <rect x="26" y="6" width="4" height="18" rx="1" fill="#16a34a" opacity="0.4"/>
    </svg>
  ),
  "dynamic-programming": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="8" cy="8" r="4" stroke="#16a34a" strokeWidth="2"/>
      <circle cx="24" cy="8" r="4" stroke="#16a34a" strokeWidth="2"/>
      <circle cx="16" cy="24" r="4" stroke="#16a34a" strokeWidth="2"/>
      <line x1="12" y1="8" x2="20" y2="8" stroke="#16a34a" strokeWidth="2"/>
      <line x1="10" y1="11" x2="14" y2="21" stroke="#16a34a" strokeWidth="2"/>
      <line x1="22" y1="11" x2="18" y2="21" stroke="#16a34a" strokeWidth="2"/>
    </svg>
  ),
  "graph": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="3" fill="#16a34a"/>
      <circle cx="6" cy="10" r="2.5" fill="#16a34a" opacity="0.7"/>
      <circle cx="26" cy="10" r="2.5" fill="#16a34a" opacity="0.7"/>
      <circle cx="6" cy="22" r="2.5" fill="#16a34a" opacity="0.7"/>
      <circle cx="26" cy="22" r="2.5" fill="#16a34a" opacity="0.7"/>
      <line x1="13" y1="14" x2="8.5" y2="11.5" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="19" y1="14" x2="23.5" y2="11.5" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="13" y1="18" x2="8.5" y2="20.5" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="19" y1="18" x2="23.5" y2="20.5" stroke="#16a34a" strokeWidth="1.5"/>
    </svg>
  ),
  "hashing": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="4" width="10" height="10" rx="2" fill="#16a34a"/>
      <rect x="18" y="4" width="10" height="10" rx="2" fill="#16a34a" opacity="0.6"/>
      <rect x="4" y="18" width="10" height="10" rx="2" fill="#16a34a" opacity="0.6"/>
      <rect x="18" y="18" width="10" height="10" rx="2" fill="#16a34a" opacity="0.3"/>
    </svg>
  ),
  "linked-list": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="13" width="8" height="6" rx="1.5" stroke="#16a34a" strokeWidth="2"/>
      <rect x="12" y="13" width="8" height="6" rx="1.5" stroke="#16a34a" strokeWidth="2"/>
      <rect x="22" y="13" width="8" height="6" rx="1.5" stroke="#16a34a" strokeWidth="2"/>
      <line x1="10" y1="16" x2="12" y2="16" stroke="#16a34a" strokeWidth="2"/>
      <line x1="20" y1="16" x2="22" y2="16" stroke="#16a34a" strokeWidth="2"/>
      <polyline points="29,14 31,16 29,18" stroke="#16a34a" strokeWidth="2" fill="none"/>
    </svg>
  ),
  "matrix": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      {[0,1,2].map(r => [0,1,2].map(c => (
        <rect key={`${r}${c}`} x={4+c*9} y={4+r*9} width="7" height="7" rx="1" fill="#16a34a" opacity={0.3 + (r+c)*0.15}/>
      )))}
    </svg>
  ),
  "sorting": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <line x1="4" y1="8" x2="28" y2="8" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="4" y1="16" x2="20" y2="16" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="4" y1="24" x2="14" y2="24" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  "string": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <text x="4" y="22" fontFamily="Georgia, serif" fontSize="18" fontWeight="bold" fill="#16a34a">Aa</text>
    </svg>
  ),
  "stack": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="22" width="20" height="5" rx="2" fill="#16a34a"/>
      <rect x="6" y="14" width="20" height="5" rx="2" fill="#16a34a" opacity="0.7"/>
      <rect x="6" y="6" width="20" height="5" rx="2" fill="#16a34a" opacity="0.4"/>
    </svg>
  ),
  "tree": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="5" r="3" fill="#16a34a"/>
      <circle cx="8" cy="16" r="3" fill="#16a34a" opacity="0.8"/>
      <circle cx="24" cy="16" r="3" fill="#16a34a" opacity="0.8"/>
      <circle cx="4" cy="26" r="2.5" fill="#16a34a" opacity="0.5"/>
      <circle cx="12" cy="26" r="2.5" fill="#16a34a" opacity="0.5"/>
      <circle cx="28" cy="26" r="2.5" fill="#16a34a" opacity="0.5"/>
      <line x1="16" y1="8" x2="10" y2="13" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="16" y1="8" x2="22" y2="13" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="8" y1="19" x2="5.5" y2="23.5" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="8" y1="19" x2="11" y2="23.5" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="24" y1="19" x2="27" y2="23.5" stroke="#16a34a" strokeWidth="1.5"/>
    </svg>
  ),
  "heap": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <polyline points="16,4 28,26 4,26 16,4" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinejoin="round"/>
      <polyline points="16,10 24,24 8,24 16,10" fill="#16a34a" opacity="0.2"/>
    </svg>
  ),
  "two-pointers": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <line x1="2" y1="16" x2="14" y2="16" stroke="#16a34a" strokeWidth="2"/>
      <polyline points="10,12 14,16 10,20" stroke="#16a34a" strokeWidth="2" fill="none"/>
      <line x1="30" y1="16" x2="18" y2="16" stroke="#16a34a" strokeWidth="2"/>
      <polyline points="22,12 18,16 22,20" stroke="#16a34a" strokeWidth="2" fill="none"/>
    </svg>
  ),
  "sliding-window": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="12" width="28" height="8" rx="2" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 2"/>
      <rect x="8" y="10" width="14" height="12" rx="2" fill="#16a34a" opacity="0.2" stroke="#16a34a" strokeWidth="2"/>
    </svg>
  ),
  "binary-search": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="13" cy="13" r="8" stroke="#16a34a" strokeWidth="2"/>
      <line x1="19" y1="19" x2="28" y2="28" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="9" y1="13" x2="17" y2="13" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
      <line x1="13" y1="9" x2="13" y2="17" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  "trie": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="20" width="6" height="8" rx="1" fill="#16a34a" opacity="0.5"/>
      <rect x="12" y="14" width="6" height="14" rx="1" fill="#16a34a" opacity="0.7"/>
      <rect x="20" y="8" width="6" height="20" rx="1" fill="#16a34a"/>
      <line x1="7" y1="20" x2="15" y2="14" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="15" y1="14" x2="23" y2="8" stroke="#16a34a" strokeWidth="1.5"/>
    </svg>
  ),
  "backtracking": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M 24 16 A 10 10 0 1 1 16 6" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <polyline points="14,2 16,6 12,8" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
    </svg>
  ),
  "greedy": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <polygon points="16,4 20,13 30,13 22,19 25,28 16,22 7,28 10,19 2,13 12,13" fill="#16a34a" opacity="0.8"/>
    </svg>
  ),
  "intervals": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <line x1="4" y1="10" x2="20" y2="10" stroke="#16a34a" strokeWidth="3" strokeLinecap="round"/>
      <line x1="12" y1="16" x2="28" y2="16" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
      <line x1="6" y1="22" x2="18" y2="22" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),
  "bit-manipulation": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <text x="3" y="14" fontFamily="'Courier New', monospace" fontSize="9" fontWeight="bold" fill="#16a34a">1011</text>
      <text x="3" y="24" fontFamily="'Courier New', monospace" fontSize="9" fontWeight="bold" fill="#16a34a" opacity="0.6">0110</text>
    </svg>
  ),
  "math-geometry": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="11" stroke="#16a34a" strokeWidth="2"/>
      <line x1="16" y1="5" x2="16" y2="27" stroke="#16a34a" strokeWidth="1.5" opacity="0.5"/>
      <line x1="5" y1="16" x2="27" y2="16" stroke="#16a34a" strokeWidth="1.5" opacity="0.5"/>
    </svg>
  ),
};

function TopicCard({ topic, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: hovered
          ? "0 8px 24px rgba(22,163,74,0.15)"
          : "0 2px 8px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-2px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(topic.key)}
    >
      <div style={styles.iconWrap}>
        {TOPIC_ICONS[topic.key] || (
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="12" fill="#16a34a" opacity="0.5"/>
          </svg>
        )}
      </div>
      <div style={styles.cardLabel}>{topic.label}</div>
      <div style={styles.cardMeta}>{topic.questions} Questions / Beginner to Advanced</div>
      <div style={styles.exploreRow}>
        <span style={styles.exploreText}>EXPLORE</span>
        <span style={styles.exploreArrow}>→</span>
      </div>
    </div>
  );
}

export default function CodingSubjects() {
  const navigate = useNavigate();

  const handleTopicClick = (key) => {
    navigate(`/coding/${key}`);
  };

  return (
    <div style={styles.page}>
      {/* NAV */}
      <nav style={styles.nav}>
        <span style={styles.navBrand}>AI PLACEMENT PREP</span>
      </nav>

      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.heroBadge}>
          <span style={styles.badgeIcon}>⊕</span>
          + MASTER DATA STRUCTURES &amp; ALGORITHMS
        </div>
        <h1 style={styles.heroTitle}>Select Coding Topic 🚀</h1>
        <p style={styles.heroSub}>
          Choose a topic and solve curated interview problems to become placement ready. Our AI-driven<br />
          paths adapt to your performance.
        </p>

        {/* Stats pills */}
        <div style={styles.pillRow}>
          <div style={styles.pill}>
            <span style={styles.pillIcon}>🏆</span>
            20 Topics Available
          </div>
          <div style={styles.pill}>
            <span style={styles.pillIcon}>&lt;/&gt;</span>
            150+ Problems
          </div>
          <div style={{ ...styles.pill, ...styles.pillGreen }}>
            <span style={styles.pillIcon}>⚡</span>
            Daily Goal Active
          </div>
        </div>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {TOPICS.map((topic) => (
          <TopicCard key={topic.key} topic={topic} onClick={handleTopicClick} />
        ))}
      </div>

      {/* PROGRESS JOURNEY */}
      <div style={styles.journeyCard}>
        <div style={styles.journeyLeft}>
          <div style={styles.journeyTitle}>Your Progress Journey</div>
          <div style={styles.journeySub}>Keep pushing. You are in the top 5% of active learners this week.</div>
          <div style={styles.journeyBar}>
            <div style={styles.journeyFill} />
          </div>
          <div style={styles.journeyStats}>
            <div style={styles.journeyStat}>
              <span style={styles.journeyStatLabel}>SOLVED</span>
              <span style={styles.journeyStatValue}>148</span>
            </div>
            <div style={styles.journeyStat}>
              <span style={styles.journeyStatLabel}>STRONGEST</span>
              <span style={styles.journeyStatValue}>Arrays</span>
            </div>
            <div style={styles.journeyStat}>
              <span style={styles.journeyStatLabel}>NEED FOCUS</span>
              <span style={styles.journeyStatValue}>DP</span>
            </div>
          </div>
        </div>
        <div style={styles.journeyRight}>
          <div style={styles.bigPct}>42%</div>
          <div style={styles.bigPctLabel}>COURSE COMPLETED</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#eaf2ea",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    paddingBottom: 60,
  },

  /* NAV */
  nav: {
    background: "#0f1f0f",
    height: 50,
    display: "flex",
    alignItems: "center",
    padding: "0 32px",
  },
  navBrand: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: "0.05em",
  },

  /* HERO */
  hero: {
    textAlign: "center",
    padding: "52px 24px 32px",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#0f3320",
    color: "#86efac",
    borderRadius: 30,
    padding: "7px 20px",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: "0.07em",
    marginBottom: 20,
  },
  badgeIcon: { fontSize: 14 },
  heroTitle: {
    fontSize: 40,
    fontWeight: "800",
    color: "#0a1a0a",
    margin: "0 0 14px",
  },
  heroSub: {
    fontSize: 15,
    color: "#4b6b4b",
    lineHeight: 1.65,
    margin: "0 0 28px",
  },
  pillRow: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    background: "white",
    border: "1px solid #d1e7d1",
    borderRadius: 30,
    padding: "8px 18px",
    fontSize: 13,
    fontWeight: "600",
    color: "#1a3a1a",
    cursor: "default",
  },
  pillGreen: {
    background: "#16a34a",
    color: "white",
    border: "none",
  },
  pillIcon: { fontSize: 14 },

  /* GRID */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
    maxWidth: 980,
    margin: "0 auto",
    padding: "0 20px",
  },

  /* TOPIC CARD */
  card: {
    background: "white",
    borderRadius: 14,
    padding: "26px 20px 16px",
    cursor: "pointer",
    transition: "box-shadow 0.2s, transform 0.2s",
    border: "1px solid #e8f0e8",
  },
  iconWrap: {
    width: 52,
    height: 52,
    background: "#f0fdf4",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f1a0f",
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 11,
    color: "#7a9a7a",
    marginBottom: 16,
  },
  exploreRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    borderTop: "1px solid #f0f0f0",
    paddingTop: 12,
  },
  exploreText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#16a34a",
    letterSpacing: "0.07em",
  },
  exploreArrow: {
    fontSize: 14,
    color: "#16a34a",
    fontWeight: "600",
  },

  /* JOURNEY CARD */
  journeyCard: {
    maxWidth: 940,
    margin: "32px auto 0",
    background: "white",
    borderRadius: 16,
    padding: "28px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #e0ece0",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    gap: 20,
  },
  journeyLeft: { flex: 1 },
  journeyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0f1a0f",
    marginBottom: 4,
  },
  journeySub: {
    fontSize: 13,
    color: "#6b8a6b",
    marginBottom: 14,
  },
  journeyBar: {
    height: 8,
    background: "#e5e7eb",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  journeyFill: {
    width: "42%",
    height: "100%",
    background: "#16a34a",
    borderRadius: 10,
  },
  journeyStats: {
    display: "flex",
    gap: 40,
  },
  journeyStat: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  journeyStatLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: "0.07em",
  },
  journeyStatValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f1a0f",
  },
  journeyRight: {
    textAlign: "right",
    flexShrink: 0,
  },
  bigPct: {
    fontSize: 48,
    fontWeight: "800",
    color: "#16a34a",
    lineHeight: 1,
    marginBottom: 4,
  },
  bigPctLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: "0.08em",
  },
};