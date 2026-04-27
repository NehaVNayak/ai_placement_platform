import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────
   PlacementAI – Select Performance Type
   Drop-in replacement for the original
   PerformanceDashboard component.
───────────────────────────────────────── */

export default function PerformanceDashboard() {
  const navigate = useNavigate();

  const handleMockInterview = () => {
    const latest = localStorage.getItem("latestMockResult");
    if (!latest) {
      alert("No interview found. Please take an interview first.");
      return;
    }
    navigate("/result", { state: JSON.parse(latest) });
  };

  const handleCoding = () => {
    navigate("/performanceAnalysis");
  };

  return (
    <div style={styles.page}>
      {/* ── NAV ── */}
      <nav style={styles.nav}>
        <div style={styles.brand}>
          <div style={styles.brandDot}>
            <svg viewBox="0 0 12 12" style={{ width: 13, height: 13, fill: "#fff" }}>
              <path d="M6 1L11 5.5L6 10L1 5.5Z" />
            </svg>
          </div>
          PlacementAI
        </div>

        <div style={styles.navLinks}>
          {["Dashboard", "Preparation", "Analytics"].map((label) => (
            <span
              key={label}
              style={{
                ...styles.navLink,
                ...(label === "Preparation" ? styles.navLinkActive : {}),
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <div style={styles.navRight}>
          {/* Bell */}
          <button style={styles.iconBtn} aria-label="Notifications">
            <svg viewBox="0 0 24 24" style={styles.iconSvg}>
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          {/* Profile */}
          <button style={styles.iconBtn} aria-label="Profile">
            <svg viewBox="0 0 24 24" style={styles.iconSvg}>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── MAIN ── */}
      <main style={styles.main}>
        <h1 style={styles.heading}>Select Performance Type</h1>
        <p style={styles.subheading}>
          Choose the focus of your AI-powered assessment session to get tailored
          feedback and industry-standard evaluations.
        </p>

        <div style={styles.cards}>
          {/* ── MOCK INTERVIEW CARD ── */}
          <Card onClick={handleMockInterview}>
            <CardIcon>
              <svg viewBox="0 0 24 24" style={styles.cardIconSvg}>
                <path d="M12 2a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="8" y1="22" x2="16" y2="22" />
              </svg>
            </CardIcon>
            <h2 style={styles.cardTitle}>Mock Interview</h2>
            <p style={styles.cardDesc}>
              Real-time AI behavioral and technical interviews with facial
              sentiment analysis and structural feedback.
            </p>
            <div style={styles.cardFooter}>
              <div style={styles.avatars}>
                <Avatar bg="#c8e6c2" color="#1a5c28">A</Avatar>
                <Avatar bg="#b8d9e0" color="#0f5a6e" zIndex={1}>B</Avatar>
                <Avatar bg="#1a5c28" color="#fff" zIndex={2} fontSize={9}>
                  +12k
                </Avatar>
              </div>
              <span style={styles.practicingLabel}>Practicing now</span>
            </div>
          </Card>

          {/* ── CODING & APTITUDE CARD ── */}
          <Card onClick={handleCoding}>
            <CardIcon>
              <svg viewBox="0 0 24 24" style={styles.cardIconSvg}>
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </CardIcon>
            <h2 style={styles.cardTitle}>Coding & Aptitude</h2>
            <p style={styles.cardDesc}>
              Solve algorithm challenges and logic puzzles under time pressure
              with AI-driven complexity optimization tips.
            </p>
            <div style={styles.tags}>
              {["DSA", "SQL", "System Design"].map((tag) => (
                <span key={tag} style={styles.tag}>{tag}</span>
              ))}
            </div>
          </Card>
        </div>

        {/* ── STATUS BAR ── */}
        <div style={styles.statusBar}>
          <span style={styles.dots}>
            <Dot delay="0s" opacity={1} />
            <Dot delay="0.2s" opacity={0.65} />
            <Dot delay="0.4s" opacity={0.35} />
          </span>
          Curating your personalized dashboard based on market trends...
        </div>
      </main>

      <style>{css}</style>
    </div>
  );
}

/* ─────────── Sub-components ─────────── */

function Card({ children, onClick }) {
  return (
    <div
      className="pai-card"
      onClick={onClick}
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#2d7a3a";
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 10px 32px rgba(26,92,40,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#d4e8d0";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </div>
  );
}

function CardIcon({ children }) {
  return <div style={styles.cardIcon}>{children}</div>;
}

function Avatar({ children, bg, color, zIndex = 0, fontSize = 10 }) {
  return (
    <div
      style={{
        ...styles.avatar,
        background: bg,
        color,
        zIndex,
        fontSize,
      }}
    >
      {children}
    </div>
  );
}

function Dot({ delay, opacity }) {
  return (
    <span
      style={{
        ...styles.dot,
        opacity,
        animationDelay: delay,
      }}
      className="pai-dot"
    />
  );
}

/* ─────────── Styles ─────────── */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#edf5ec",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },

  /* nav */
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 28px",
    background: "#fff",
    borderBottom: "0.5px solid #d4e8d0",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 600,
    fontSize: 15,
    color: "#1a3d20",
  },
  brandDot: {
    width: 26,
    height: 26,
    background: "#1a5c28",
    borderRadius: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  navLinks: {
    display: "flex",
    gap: 28,
    alignItems: "center",
  },
  navLink: {
    fontSize: 14,
    color: "#5a7a60",
    cursor: "pointer",
    transition: "color .15s",
  },
  navLinkActive: {
    color: "#1a5c28",
    fontWeight: 500,
  },
  navRight: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "#f0f7ee",
    border: "0.5px solid #c5ddc0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
  },
  iconSvg: {
    width: 16,
    height: 16,
    stroke: "#1a5c28",
    fill: "none",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },

  /* main */
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "56px 24px 40px",
  },
  heading: {
    fontSize: 32,
    fontWeight: 600,
    color: "#1a3d20",
    textAlign: "center",
    margin: "0 0 12px",
    letterSpacing: "-0.5px",
  },
  subheading: {
    fontSize: 14,
    color: "#5a7a60",
    textAlign: "center",
    lineHeight: 1.7,
    maxWidth: 420,
    margin: "0 0 48px",
  },

  /* cards */
  cards: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
    width: "100%",
    maxWidth: 700,
  },
  card: {
    background: "#fff",
    borderRadius: 18,
    border: "0.5px solid #d4e8d0",
    padding: "28px 28px 24px",
    cursor: "pointer",
    transition: "border-color .2s, transform .18s, box-shadow .18s",
  },
  cardIcon: {
    width: 50,
    height: 50,
    background: "#1a5c28",
    borderRadius: 13,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  cardIconSvg: {
    width: 22,
    height: 22,
    stroke: "#fff",
    fill: "none",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: "#1a3d20",
    margin: "0 0 8px",
  },
  cardDesc: {
    fontSize: 13,
    color: "#5a7a60",
    lineHeight: 1.65,
    margin: "0 0 20px",
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  avatars: {
    display: "flex",
  },
  avatar: {
    width: 27,
    height: 27,
    borderRadius: "50%",
    border: "2px solid #fff",
    marginRight: -8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    letterSpacing: "-0.3px",
    position: "relative",
  },
  practicingLabel: {
    fontSize: 12,
    color: "#5a7a60",
    marginLeft: 14,
  },
  tags: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  },
  tag: {
    fontSize: 11,
    fontWeight: 500,
    padding: "4px 11px",
    borderRadius: 20,
    background: "#edf5ec",
    color: "#2d7a3a",
    border: "0.5px solid #b8d9b4",
  },

  /* status bar */
  statusBar: {
    marginTop: 44,
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#fff",
    border: "0.5px solid #d4e8d0",
    borderRadius: 100,
    padding: "10px 22px",
    fontSize: 13,
    color: "#5a7a60",
  },
  dots: {
    display: "flex",
    gap: 5,
    alignItems: "center",
  },
  dot: {
    display: "inline-block",
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#1a5c28",
    animation: "paiDotBlink 1.4s infinite ease-in-out",
  },
};

/* ─────────── Keyframes (injected via <style>) ─────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

  @keyframes paiDotBlink {
    0%, 80%, 100% { opacity: 1; }
    40% { opacity: 0.2; }
  }

  .pai-card:active {
    transform: scale(0.985) !important;
  }
`;