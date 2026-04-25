import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogicalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" />
  </svg>
);

const QuantIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const VerbalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

function AptitudeDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  useEffect(() => {
  loadDashboard();
}, []);
const loadDashboard = async () => {
  const studentId = localStorage.getItem("studentId");

  const res = await axios.get(
   `http://localhost:8000/api/aptitude/dashboard?student_id=${studentId}`
  );

  setStats(res.data);
};

  const sections = [
    {
      title: "Logical Reasoning",
      description: "Puzzles, coding-decoding, blood relations, and pattern recognition to sharpen your analytical mind.",
      path: "/aptitude-topics/Logical",
      questions: stats?.logical_total || 0,
      Icon: LogicalIcon,
      layout: "card",
    },
    {
      title: "Quantitative Aptitude",
      description: "Master percentages, ratios, profit-loss, and advanced arithmetic through structured problem-solving.",
      path: "/aptitude-topics/Quant",
      questions: stats?.quant_total || 0,
      Icon: QuantIcon,
      layout: "card",
    },
    {
      title: "Verbal Ability",
      description: "Refine your grammar, reading comprehension, and professional vocabulary for elite communication standards.",
      path: "/aptitude-topics/Verbal",
      questions: stats?.verbal_total || 0,
      Icon: VerbalIcon,
      layout: "wide",
    },
  ];

  const cardSections = sections.filter((s) => s.layout === "card");
  const wideSections = sections.filter((s) => s.layout === "wide");

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.navBrand}>
          <span style={styles.navBolt}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
          </span>
          <span style={styles.navLogo}>AI Placement PreP</span>
        </div>
        <div style={styles.navLinks}>
          <span style={styles.navLinkActive}>Dashboard</span>
          <span style={styles.navLink}>Practice</span>
          <span style={styles.navLink}>Profile</span>
        </div>
        <div style={styles.navRight}>
          <button style={styles.iconBtn} aria-label="notifications">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <button style={styles.iconBtn} aria-label="settings">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
          <div style={styles.avatar}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main style={styles.main}>
        <div style={styles.heroWrap}>
          {/* Decorative circle */}
          <div style={styles.decorCircle} />

          <div style={styles.pillBadge}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
            MASTER APTITUDE TESTS
          </div>

          <h1 style={styles.heroTitle}>Aptitude Dashboard</h1>
          <h2 style={styles.heroAccent}>Think Faster. Score Higher.</h2>
          <p style={styles.heroSub}>
            Unlock your cognitive potential with tailored modules in logical reasoning,<br />
            quantitative analysis, and verbal mastery. Powered by AI to track every milestone.
          </p>

          <div style={styles.featurePills}>
            {[
              { icon: "tracks", label: "3 Learning Tracks" },
              { icon: "questions", label: "500+ Questions" },
              { icon: "ai", label: "AI Progress Tracking" },
            ].map(({ label, icon }) => (
              <div key={label} style={styles.featurePill}>
                {icon === "tracks" && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                )}
                {icon === "questions" && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                )}
                {icon === "ai" && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                )}
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* 2-column card grid */}
        <div style={styles.cardGrid}>
          {cardSections.map(({ title, description, path, questions, Icon }) => (
            <div
              key={title}
              style={styles.card}
              onClick={() => navigate(path)}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(25,135,84,0.14)";
                e.currentTarget.style.borderColor = "#b6d9c7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = "#e4ede8";
              }}
            >
              <div style={styles.iconBox}><Icon /></div>
              <h3 style={styles.cardTitle}>{title}</h3>
              <p style={styles.cardDesc}>{description}</p>
              <div style={styles.cardFooter}>
                <span style={styles.qCount}>
                  <span style={styles.qDot} />
                  {questions} QUESTIONS
                </span>
                <button
                  style={styles.textBtn}
                  onClick={(e) => { e.stopPropagation(); navigate(path); }}
                >
                  Start Practice <ArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Wide card */}
        {wideSections.map(({ title, description, path, questions, Icon }) => (
          <div
            key={title}
            style={styles.wideCard}
            onClick={() => navigate(path)}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(25,135,84,0.14)";
              e.currentTarget.style.borderColor = "#b6d9c7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
              e.currentTarget.style.borderColor = "#e4ede8";
            }}
          >
            <div style={styles.wideLeft}>
              <div style={styles.iconBox}><Icon /></div>
              <div style={styles.wideText}>
                <h3 style={styles.cardTitle}>{title}</h3>
                <p style={styles.cardDesc}>{description}</p>
              </div>
            </div>
            <div style={styles.wideRight}>
              <span style={styles.qCount}>
                <span style={styles.qDot} />
                {questions} QUESTIONS
              </span>
              <button style={styles.solidBtn} onClick={(e) => { e.stopPropagation(); navigate(path); }}>
                Start Practice →
              </button>
            </div>
          </div>
        ))}

        {/* Progress card */}
        <div style={styles.progressCard}>
          <div style={styles.progressHeader}>
            <h3 style={styles.progressTitle}>Your Aptitude Progress</h3>
            <span style={styles.aiInsightBadge}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#198754"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
              AI INSIGHTS ACTIVE
            </span>
          </div>
          <div style={styles.statsRow}>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>SOLVED</span>
              <div style={styles.statValueRow}>
                <span style={styles.statBig}>{stats?.solved || 0}</span>
                <span style={styles.statSmall}>/ {stats?.total_questions || 0}</span>
              </div>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statItem}>
              <span style={styles.statLabel}>ACCURACY</span>
              <span style={{ ...styles.statBig, color: "#198754" }}>{stats?.accuracy || 0}%</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statItem}>
              <span style={styles.statLabel}>WEAK AREA</span>
              <span style={{ ...styles.statBig, color: "#e05252", fontSize: "26px" }}>{stats?.weak_area || "N/A"}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <span style={styles.footerLeft}>© 2024 AI Placement PreP. Premium Elite Access.</span>
        <div style={styles.footerLinks}>
          <span style={styles.footerLink}>Privacy Policy</span>
          <span style={styles.footerLink}>Terms of Service</span>
          <span style={styles.footerLink}>Support Hub</span>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0f4f1",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    display: "flex",
    flexDirection: "column",
  },

  /* NAV */
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
    height: "54px",
    background: "#111",
    color: "#fff",
  },
  navBrand: { display: "flex", alignItems: "center", gap: "8px" },
  navBolt: {
    width: "26px", height: "26px", borderRadius: "8px",
    background: "#198754", display: "flex", alignItems: "center", justifyContent: "center",
  },
  navLogo: { fontWeight: "700", fontSize: "15px", letterSpacing: "-0.01em" },
  navLinks: { display: "flex", gap: "28px" },
  navLinkActive: {
    fontSize: "14px", color: "#fff", fontWeight: "600",
    borderBottom: "2px solid #198754", paddingBottom: "2px", cursor: "pointer",
  },
  navLink: { fontSize: "14px", color: "#aaa", cursor: "pointer" },
  navRight: { display: "flex", alignItems: "center", gap: "10px" },
  iconBtn: {
    background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "50%",
    width: "34px", height: "34px", display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer", color: "#fff",
  },
  avatar: {
    width: "34px", height: "34px", borderRadius: "50%",
    background: "#198754", display: "flex", alignItems: "center", justifyContent: "center",
    border: "2px solid #4ade80",
  },

  /* HERO */
  main: { maxWidth: "980px", margin: "0 auto", padding: "52px 24px 60px", flex: 1, width: "100%" },
  heroWrap: { textAlign: "center", marginBottom: "40px", position: "relative" },
  decorCircle: {
    position: "absolute", right: "-40px", top: "10px",
    width: "260px", height: "260px", borderRadius: "50%",
    border: "1.5px solid #c8ddd3", pointerEvents: "none",
  },
  pillBadge: {
    display: "inline-flex", alignItems: "center", gap: "6px",
    background: "transparent", color: "#198754",
    border: "1px solid #198754", borderRadius: "999px",
    padding: "5px 16px", fontSize: "11px", fontWeight: "700",
    letterSpacing: "0.08em", marginBottom: "20px",
  },
  heroTitle: {
    fontSize: "44px", fontWeight: "800", color: "#111",
    letterSpacing: "-0.025em", margin: "0 0 6px", lineHeight: 1.1,
  },
  heroAccent: {
    fontSize: "40px", fontWeight: "800", color: "#198754",
    letterSpacing: "-0.025em", margin: "0 0 20px", lineHeight: 1.1,
  },
  heroSub: {
    fontSize: "15px", color: "#555", maxWidth: "540px",
    margin: "0 auto 28px", lineHeight: 1.65,
  },
  featurePills: { display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" },
  featurePill: {
    display: "inline-flex", alignItems: "center", gap: "7px",
    background: "#fff", border: "1px solid #dce8e1", borderRadius: "999px",
    padding: "8px 18px", fontSize: "13px", color: "#444", fontWeight: "500",
  },

  /* CARDS */
  cardGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginBottom: "18px" },
  card: {
    background: "#fff", borderRadius: "18px", padding: "28px",
    cursor: "pointer", transition: "box-shadow 0.2s, border-color 0.2s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1.5px solid #e4ede8",
    display: "flex", flexDirection: "column", gap: "10px",
  },
  iconBox: {
    width: "44px", height: "44px", borderRadius: "12px",
    background: "#e6f4ee", display: "flex", alignItems: "center",
    justifyContent: "center", color: "#198754", marginBottom: "4px",
  },
  cardTitle: { margin: 0, fontSize: "20px", fontWeight: "700", color: "#111", letterSpacing: "-0.01em" },
  cardDesc: { margin: 0, fontSize: "13.5px", color: "#666", lineHeight: 1.55, flex: 1 },
  cardFooter: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "6px" },
  qCount: { display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: "600", color: "#555" },
  qDot: { width: "7px", height: "7px", borderRadius: "50%", background: "#198754", display: "inline-block" },
  textBtn: {
    display: "flex", alignItems: "center", gap: "5px",
    background: "none", border: "none", color: "#198754",
    fontSize: "13.5px", fontWeight: "600", cursor: "pointer", padding: 0,
  },

  /* WIDE CARD */
  wideCard: {
    background: "#fff", borderRadius: "18px", padding: "26px 32px",
    cursor: "pointer", transition: "box-shadow 0.2s, border-color 0.2s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1.5px solid #e4ede8",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: "20px", marginBottom: "18px",
  },
  wideLeft: { display: "flex", alignItems: "flex-start", gap: "18px" },
  wideText: { display: "flex", flexDirection: "column", gap: "6px" },
  wideRight: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px", flexShrink: 0 },
  solidBtn: {
    background: "#111", color: "#fff", border: "none",
    borderRadius: "10px", padding: "10px 20px",
    fontSize: "13.5px", fontWeight: "600", cursor: "pointer",
    whiteSpace: "nowrap",
  },

  /* PROGRESS */
  progressCard: {
    background: "#fff", borderRadius: "18px", padding: "28px 36px",
    border: "1.5px solid #e4ede8", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  progressHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" },
  progressTitle: { margin: 0, fontSize: "18px", fontWeight: "700", color: "#111" },
  aiInsightBadge: {
    display: "inline-flex", alignItems: "center", gap: "5px",
    background: "#e6f4ee", color: "#198754", borderRadius: "999px",
    padding: "5px 12px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.07em",
  },
  statsRow: { display: "flex", alignItems: "center", justifyContent: "space-around" },
  statItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" },
  statLabel: { fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", color: "#999", textTransform: "uppercase" },
  statValueRow: { display: "flex", alignItems: "baseline", gap: "4px" },
  statBig: { fontSize: "32px", fontWeight: "800", color: "#111", letterSpacing: "-0.02em" },
  statSmall: { fontSize: "15px", color: "#aaa", fontWeight: "500" },
  statDivider: { width: "1px", height: "56px", background: "#e8f0ec" },

  /* FOOTER */
  footer: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "20px 48px", borderTop: "1px solid #e0e8e4",
    background: "#f0f4f1",
  },
  footerLeft: { fontSize: "12.5px", color: "#888" },
  footerLinks: { display: "flex", gap: "24px" },
  footerLink: { fontSize: "13px", color: "#555", cursor: "pointer" },
};

export default AptitudeDashboard;