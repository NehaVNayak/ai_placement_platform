import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const subjects = [
  {
    name: "Java",
    img: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
    badge: "STRONGEST",
    badgeColor: "#2d6a4f",
    badgeBg: "#d8f3dc",
    description: "Master object-oriented concepts, multithreading, and enterprise-grade architecture.",
    row: 1,
  },
  {
    name: "Python",
    img: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
    badge: "POPULAR",
    badgeColor: "#2d6a4f",
    badgeBg: "#d8f3dc",
    description: "Dive into automation, AI/ML basics, and clean, readable scripting for rapid development.",
    row: 1,
  },
  {
    name: "C",
    img: "https://cdn-icons-png.flaticon.com/512/6132/6132222.png",
    badge: "FOUNDATION",
    badgeColor: "#2d6a4f",
    badgeBg: "#d8f3dc",
    description: "Understand low-level memory management and the bedrock of modern computing.",
    row: 1,
  },
  {
    name: "C++",
    img: "https://cdn-icons-png.flaticon.com/512/6132/6132221.png",
    badge: "PERFORMANCE",
    badgeColor: "#2d6a4f",
    badgeBg: "#d8f3dc",
    description: "Build high-performance systems and master complex data structures with pointers.",
    row: 2,
  },
  {
    name: "JavaScript",
    img: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    badge: "NEED FOCUS",
    badgeColor: "#c0392b",
    badgeBg: "#fde8e8",
    description: "Conquer the language of the web, including ES6+, async programming, and DOM logic.",
    row: 2,
  },
];



function ProgrammingSubjects() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
  loadDashboard();
}, []);

const loadDashboard = async () => {
  const studentId = localStorage.getItem("studentId");

  const res = await axios.get(
   `http://localhost:8000/api/practice/dashboard?student_id=${studentId}`
  );

  setData(res.data);
};

  const row1 = subjects.filter((s) => s.row === 1);
  const row2 = subjects.filter((s) => s.row === 2);

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <span style={styles.navLogo}>Language Lab</span>
        <div style={styles.navLinks}>
          <span style={styles.navLink}>Dashboard</span>
          <span style={styles.navLinkActive}>Practice</span>
          <span style={styles.navLink}>Profile</span>
        </div>
        <div style={styles.navRight}>
          <button style={styles.iconBtn}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <div style={styles.avatar}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
      </nav>

      <main style={styles.main}>
        {/* Hero */}
        <div style={styles.hero}>
          <div style={styles.pillBadge}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
            MASTER PROGRAMMING FUNDAMENTALS
          </div>
          <h1 style={styles.heroTitle}>Programming Languages</h1>
          <p style={styles.heroAccent}>Code Better. Think Smarter.</p>

          <div style={styles.statsRow}>
            {[
              { icon: "layers", label: "Languages", value: 5 },
              { icon: "book", label: "Questions", value: "500+" },
              { icon: "trend", label: "Skill Tracking", value: "AI Active" },
            ].map(({ icon, label, value }) => (
              <div key={label} style={styles.statPill}>
                <div style={styles.statPillIcon}>
                  {icon === "layers" && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#198754" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>}
                  {icon === "book" && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#198754" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>}
                  {icon === "trend" && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#198754" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>}
                </div>
                <div>
                  <div style={styles.statPillValue}>{value}</div>
                  <div style={styles.statPillLabel}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 1 — 3 cards */}
        <div style={styles.grid3}>
          {row1.map((sub) => (
            <SubjectCard key={sub.name} sub={sub} navigate={navigate} />
          ))}
        </div>

        {/* Row 2 — 2 cards centered */}
        <div style={styles.grid2}>
          {row2.map((sub) => (
            <SubjectCard key={sub.name} sub={sub} navigate={navigate} />
          ))}
        </div>

        {/* Progress card */}
        <div style={styles.progressCard}>
          <div style={styles.progressTop}>
            <div>
              <p style={styles.progressTitle}>Your Language Progress</p>
              <p style={styles.progressSub}>Real-time skill assessment powered by AI diagnostics.</p>
            </div>
          </div>
          <div style={styles.progressDivider} />
          <div style={styles.progressBody}>
            {/* Bars */}
           <div style={styles.barsCol}>
  {data?.progress?.map((item) => {
    const color =
      item.pct < 40 ? "#e05252" : "#198754";

    return (
      <div key={item.name} style={styles.barRow}>
        <div style={styles.barMeta}>
          <span style={styles.barName}>
            {item.name}
          </span>

          <span
            style={{
              ...styles.barPct,
              color
            }}
          >
            {item.pct}%
          </span>
        </div>

        <div style={styles.barTrack}>
          <div
            style={{
              ...styles.barFill,
              width: `${item.pct}%`,
              background: color
            }}
          />
        </div>
      </div>
    );
  })}
</div>

            {/* Right panel */}
            <div style={styles.rightPanel}>
  <div style={styles.aiBox}>
    <p style={styles.aiLabel}>AI PERSONALIZED PATH</p>
    <p style={styles.aiSub}>RECOMMENDED NEXT STEPS</p>

    {data?.recommendations?.map((rec, index) => (
      <div key={index} style={styles.aiItem}>
        <span
          style={
            rec.type === "focus"
              ? styles.aiDot
              : styles.aiCheck
          }
        >
          {rec.type === "focus" ? "!" : "✓"}
        </span>

        <div>
          <p style={styles.aiItemTitle}>
            {rec.title}
          </p>

          <p style={styles.aiItemSub}>
            {rec.sub}
          </p>
        </div>
      </div>
    ))}
  </div>
              <div style={styles.highlightRow}>
                <div style={styles.highlightBox}>
                  <p style={styles.hlLabel}>STRONGEST</p>
                  <p style={{ ...styles.hlValue, color: "#198754" }}>{data?.strongest || "N/A"}
</p>
                </div>
                <div style={styles.highlightBox}>
                  <p style={styles.hlLabel}>NEED FOCUS</p>
                  <p style={{ ...styles.hlValue, color: "#e05252" }}>{data?.focus || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating chat button */}
      <div style={styles.fab}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
    </div>
  );
}

function SubjectCard({ sub, navigate }) {
  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/programming-practice/${sub.name}`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(25,135,84,0.13)";
        e.currentTarget.style.borderColor = "#b6d9c7";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.07)";
        e.currentTarget.style.borderColor = "#e4ede8";
      }}
    >
      <div style={styles.cardTop}>
        <img src={sub.img} alt={sub.name} style={styles.langImg} />
        <span style={{ ...styles.badge, color: sub.badgeColor, background: sub.badgeBg }}>
          {sub.badge}
        </span>
      </div>
      <h3 style={styles.cardName}>{sub.name}</h3>
      <p style={styles.cardDesc}>{sub.description}</p>
      <button style={styles.startBtn}>
        Start →
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0f4f1",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    position: "relative",
  },

  /* NAV */
  nav: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 40px", height: "52px",
    background: "#fff", borderBottom: "1px solid #e4ede8",
    color: "#111",
  },
  navLogo: { fontWeight: "700", fontSize: "15px", letterSpacing: "-0.01em", color: "#111" },
  navLinks: { display: "flex", gap: "28px" },
  navLink: { fontSize: "14px", color: "#777", cursor: "pointer" },
  navLinkActive: {
    fontSize: "14px", color: "#111", fontWeight: "600", cursor: "pointer",
    borderBottom: "2px solid #198754", paddingBottom: "2px",
  },
  navRight: { display: "flex", alignItems: "center", gap: "10px" },
  iconBtn: {
    background: "#f5f5f5", border: "none", borderRadius: "50%",
    width: "34px", height: "34px", display: "flex",
    alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#444",
  },
  avatar: {
    width: "34px", height: "34px", borderRadius: "50%",
    background: "#198754", display: "flex", alignItems: "center", justifyContent: "center",
  },

  /* MAIN */
  main: { maxWidth: "960px", margin: "0 auto", padding: "44px 24px 60px" },

  /* HERO */
  hero: { textAlign: "center", marginBottom: "40px" },
  pillBadge: {
    display: "inline-flex", alignItems: "center", gap: "6px",
    border: "1px solid #198754", color: "#198754", borderRadius: "999px",
    padding: "5px 16px", fontSize: "11px", fontWeight: "700",
    letterSpacing: "0.07em", marginBottom: "18px",
  },
  heroTitle: {
    fontSize: "52px", fontWeight: "800", color: "#111",
    letterSpacing: "-0.03em", margin: "0 0 8px", lineHeight: 1.05,
  },
  heroAccent: {
    fontSize: "17px", color: "#198754", fontWeight: "600",
    margin: "0 0 32px", letterSpacing: "-0.01em",
  },
  statsRow: { display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" },
  statPill: {
    display: "flex", alignItems: "center", gap: "12px",
    background: "#fff", border: "1px solid #e0e8e3", borderRadius: "14px",
    padding: "14px 22px", minWidth: "150px",
  },
  statPillIcon: {
    width: "36px", height: "36px", borderRadius: "10px",
    background: "#e6f4ee", display: "flex", alignItems: "center", justifyContent: "center",
  },
  statPillValue: { fontSize: "18px", fontWeight: "800", color: "#111", letterSpacing: "-0.02em" },
  statPillLabel: { fontSize: "12px", color: "#888", marginTop: "1px" },

  /* GRIDS */
  grid3: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px", marginBottom: "16px",
  },
  grid2: {
    display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px", marginBottom: "28px",
    maxWidth: "640px", margin: "0 auto 28px",
  },

  /* CARD */
  card: {
    background: "#fff", borderRadius: "16px", padding: "22px",
    cursor: "pointer", transition: "box-shadow 0.2s, border-color 0.2s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1.5px solid #e4ede8",
    display: "flex", flexDirection: "column", gap: "8px",
  },
  cardTop: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "4px" },
  langImg: { width: "44px", height: "44px", objectFit: "contain", borderRadius: "8px" },
  badge: {
    fontSize: "10px", fontWeight: "700", letterSpacing: "0.07em",
    padding: "3px 8px", borderRadius: "999px",
  },
  cardName: { margin: 0, fontSize: "16px", fontWeight: "700", color: "#111" },
  cardDesc: { margin: 0, fontSize: "13px", color: "#666", lineHeight: 1.55, flex: 1 },
  startBtn: {
    background: "none", border: "none", color: "#198754",
    fontSize: "13.5px", fontWeight: "600", cursor: "pointer",
    padding: 0, textAlign: "left", marginTop: "4px",
  },

  /* PROGRESS CARD */
  progressCard: {
    background: "#fff", borderRadius: "18px",
    border: "1.5px solid #e4ede8", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    overflow: "hidden",
  },
  progressTop: { padding: "22px 28px 16px" },
  progressTitle: { margin: "0 0 4px", fontSize: "16px", fontWeight: "700", color: "#111" },
  progressSub: { margin: 0, fontSize: "13px", color: "#888" },
  progressDivider: { height: "1px", background: "#e8f0ec" },
  progressBody: { display: "flex", gap: "0", padding: "0" },

  /* BARS */
  barsCol: { flex: 1, padding: "24px 28px", display: "flex", flexDirection: "column", gap: "18px" },
  barRow: { display: "flex", flexDirection: "column", gap: "6px" },
  barMeta: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  barName: { fontSize: "13.5px", fontWeight: "600", color: "#111" },
  barPct: { fontSize: "13.5px", fontWeight: "700" },
  barTrack: { height: "6px", background: "#e8f0ec", borderRadius: "999px", overflow: "hidden" },
  barFill: { height: "100%", borderRadius: "999px", transition: "width 0.5s ease" },

  /* RIGHT PANEL */
  rightPanel: {
    width: "300px", flexShrink: 0, borderLeft: "1px solid #e8f0ec",
    display: "flex", flexDirection: "column",
  },
  aiBox: { flex: 1, padding: "22px 22px 16px" },
  aiLabel: { margin: "0 0 2px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.08em", color: "#888" },
  aiSub: { margin: "0 0 14px", fontSize: "13px", fontWeight: "700", color: "#111" },
  aiItem: { display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px" },
  aiDot: {
    width: "20px", height: "20px", borderRadius: "50%", background: "#fff3cd",
    color: "#856404", fontSize: "12px", fontWeight: "900",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  aiCheck: {
    width: "20px", height: "20px", borderRadius: "50%", background: "#d8f3dc",
    color: "#198754", fontSize: "12px", fontWeight: "900",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  aiItemTitle: { margin: "0 0 2px", fontSize: "13px", fontWeight: "600", color: "#111" },
  aiItemSub: { margin: 0, fontSize: "11.5px", color: "#888" },
  highlightRow: { display: "flex", borderTop: "1px solid #e8f0ec" },
  highlightBox: {
    flex: 1, padding: "14px 16px", textAlign: "center",
    borderRight: "1px solid #e8f0ec",
  },
  hlLabel: { margin: "0 0 4px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.07em", color: "#888" },
  hlValue: { margin: 0, fontSize: "20px", fontWeight: "800", letterSpacing: "-0.01em" },

  /* FAB */
  fab: {
    position: "fixed", bottom: "32px", right: "32px",
    width: "52px", height: "52px", borderRadius: "50%",
    background: "#198754", display: "flex", alignItems: "center",
    justifyContent: "center", boxShadow: "0 4px 16px rgba(25,135,84,0.4)",
    cursor: "pointer",
  },
};

export default ProgrammingSubjects;