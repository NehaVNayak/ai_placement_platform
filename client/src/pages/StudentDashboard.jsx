import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudentProfile } from "../api/authApi";
import axios from "axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .sd-root {
    min-height: 100vh;
    background: #f0f4ec;
    font-family: 'Manrope', sans-serif;
    color: #1a2a1a;
  }

  /* ── NAV ── */
  .sd-nav {
    background: #1a3a1a;
    height: 56px;
    display: flex;
    align-items: center;
    padding: 0 32px;
    gap: 32px;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .sd-nav-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    margin-right: 16px;
  }

  .sd-nav-brand svg { width: 18px; height: 18px; color: #6fcf6f; }

  .sd-nav-links {
    display: flex;
    gap: 24px;
    flex: 1;
  }

  .sd-nav-link {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    cursor: pointer;
    background: none;
    border: none;
    font-family: inherit;
    padding: 0;
    transition: color 0.15s;
  }

  .sd-nav-link:hover { color: #fff; }

  .sd-nav-link.active {
    color: #fff;
    border-bottom: 2px solid #6fcf6f;
    padding-bottom: 2px;
  }

  .sd-nav-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-left: auto;
  }

  .sd-nav-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.7);
    cursor: pointer;
    border-radius: 50%;
    transition: background 0.15s;
  }

  .sd-nav-icon:hover { background: rgba(255,255,255,0.1); }
  .sd-nav-icon svg { width: 18px; height: 18px; }

  .sd-avatar-btn {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #4a7a4a;
    border: 2px solid rgba(255,255,255,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    overflow: hidden;
  }

  /* ── MAIN ── */
  .sd-main {
    max-width: 1120px;
    margin: 0 auto;
    padding: 36px 32px 60px;
  }

  /* ── HERO ROW ── */
  .sd-hero {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 32px;
  }

  .sd-hero-left h1 {
    font-size: clamp(1.8rem, 3vw, 2.2rem);
    font-weight: 800;
    color: #1a2a1a;
    letter-spacing: -0.02em;
    margin-bottom: 10px;
  }

  .sd-hero-left p {
    font-size: 14px;
    color: #6a806a;
    max-width: 380px;
    line-height: 1.6;
  }

  .sd-readiness-card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid rgba(100,160,100,0.15);
    padding: 20px 28px;
    display: flex;
    align-items: center;
    gap: 20px;
    min-width: 260px;
    box-shadow: 0 2px 12px rgba(60,100,60,0.06);
    flex-shrink: 0;
  }

  .sd-ring-wrap {
    position: relative;
    width: 80px;
    height: 80px;
    flex-shrink: 0;
  }

  .sd-ring-wrap svg {
    width: 80px;
    height: 80px;
    transform: rotate(-90deg);
  }

  .sd-ring-track { fill: none; stroke: #e8f0e8; stroke-width: 7; }
  .sd-ring-fill {
    fill: none;
    stroke: #198754;
    stroke-width: 7;
    stroke-linecap: round;
    stroke-dasharray: 219.9;
    stroke-dashoffset: 48.4; /* 78% filled */
    transition: stroke-dashoffset 1s ease;
  }

  .sd-ring-label {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 800;
    color: #1a2a1a;
  }

  .sd-readiness-info p:first-child {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #8aaa8a;
    margin-bottom: 4px;
  }

  .sd-readiness-info p:last-child {
    font-size: 14px;
    font-weight: 600;
    color: #198754;
  }

  /* ── PROFILE CARD ── */
  .sd-profile-card {
    background: #fff;
    border-radius: 18px;
    border: 1px solid rgba(100,160,100,0.12);
    padding: 24px 28px;
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 28px;
    box-shadow: 0 2px 12px rgba(60,100,60,0.05);
  }

  .sd-profile-avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, #c8e6c8, #a0cfa0);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 800;
    color: #2a5a2a;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }

  .sd-profile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .sd-online-dot {
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 12px;
    height: 12px;
    background: #3ab43a;
    border-radius: 50%;
    border: 2px solid #fff;
  }

  .sd-profile-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 32px;
    flex: 1;
  }

  .sd-profile-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #4a5a4a;
  }

  .sd-profile-item svg { width: 14px; height: 14px; color: #7aaa7a; flex-shrink: 0; }

  .sd-profile-item a {
    color: #198754;
    text-decoration: none;
    font-weight: 500;
  }

  .sd-profile-item a:hover { text-decoration: underline; }

  .sd-resume-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    flex-shrink: 0;
    min-width: 200px;
  }

  .sd-resume-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #8aaa8a;
    align-self: flex-start;
  }

  .sd-resume-bar-bg {
    width: 100%;
    height: 6px;
    background: #e8f0e8;
    border-radius: 10px;
    position: relative;
  }

  .sd-resume-bar-fill {
    height: 6px;
    background: #198754;
    border-radius: 10px;
    width: 92%;
  }

  .sd-resume-pct {
    font-size: 12px;
    font-weight: 600;
    color: #198754;
    position: absolute;
    right: 0;
    top: -18px;
  }

  .sd-view-resume-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #1a3a1a;
    color: #fff;
    text-decoration: none;
    border: none;
    border-radius: 10px;
    padding: 11px 22px;
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s;
    white-space: nowrap;
  }

  .sd-view-resume-btn:hover { background: #198754; }
  .sd-view-resume-btn svg { width: 15px; height: 15px; }

  /* ── FEATURE CARDS ── */
  .sd-cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 28px;
  }

  .sd-feature-card {
    background: #fff;
    border-radius: 18px;
    border: 1px solid rgba(100,160,100,0.12);
    padding: 24px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 10px rgba(60,100,60,0.05);
    position: relative;
    overflow: hidden;
  }

  .sd-feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #198754;
    border-radius: 18px 18px 0 0;
  }

  .sd-feature-card.weak::before { background: #e24b4a; }

  .sd-feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(60,100,60,0.12);
  }

  .sd-card-icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #eaf5ea;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    font-size: 20px;
  }

  .sd-card-icon-wrap.red { background: #fef0f0; }

  .sd-feature-card h3 {
    font-size: 17px;
    font-weight: 700;
    color: #1a2a1a;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .sd-feature-card p {
    font-size: 13px;
    color: #6a806a;
    line-height: 1.5;
  }

  /* ── STATS ROW ── */
  .sd-stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .sd-stat-tile {
    background: #fff;
    border-radius: 16px;
    border: 1px solid rgba(100,160,100,0.12);
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    box-shadow: 0 2px 8px rgba(60,100,60,0.04);
  }

  .sd-stat-tile-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #eaf5ea;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #198754;
  }

  .sd-stat-tile-icon svg { width: 20px; height: 20px; }

  .sd-stat-tile-value {
    font-size: 28px;
    font-weight: 800;
    color: #1a2a1a;
    letter-spacing: -0.02em;
  }

  .sd-stat-tile-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #8aaa8a;
    text-align: center;
  }

  /* ── AI TOAST ── */
  .sd-ai-toast {
    position: fixed;
    bottom: 32px;
    right: 32px;
    background: #fff;
    border-radius: 14px;
    border: 1px solid rgba(100,160,100,0.15);
    padding: 14px 16px;
    display: flex;
    gap: 12px;
    align-items: flex-start;
    max-width: 300px;
    box-shadow: 0 8px 24px rgba(60,100,60,0.12);
    animation: slideUp 0.4s ease;
    z-index: 200;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .sd-ai-toast-dot {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #1a3a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #6fcf6f;
  }

  .sd-ai-toast-dot svg { width: 16px; height: 16px; }

  .sd-ai-toast-title {
    font-size: 13px;
    font-weight: 700;
    color: #1a2a1a;
    margin-bottom: 4px;
  }

  .sd-ai-toast-body {
    font-size: 12px;
    color: #6a806a;
    line-height: 1.5;
  }

  .sd-ai-toast-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    color: #aaa;
    font-size: 16px;
    line-height: 1;
    padding: 2px 4px;
  }

  .pd-nav-links {
    display: flex;
    gap: 24px;
    flex: 1;
    justify-content: center;
  }

  .pd-nav-link {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    cursor: pointer;
    background: none;
    border: none;
    font-family: inherit;
    padding: 0;
    transition: color 0.15s;
  }

  .pd-nav-link:hover { color: #fff; }

  .pd-nav-link.active {
    color: #fff;
    border-bottom: 2px solid #6fcf6f;
    padding-bottom: 2px;
  }


  @media (max-width: 900px) {
    .sd-cards-grid { grid-template-columns: repeat(2, 1fr); }
    .sd-stats-row { grid-template-columns: repeat(2, 1fr); }
    .sd-hero { flex-direction: column; }
    .sd-profile-info { grid-template-columns: 1fr; }
  }

  @media (max-width: 600px) {
    .sd-main { padding: 20px 16px; }
    .sd-cards-grid { grid-template-columns: 1fr; }
    .sd-profile-card { flex-direction: column; align-items: flex-start; }
    .sd-resume-section { width: 100%; }
  }
`;

const cards = [
  { title: "Start Practice", emoji: "🚀", desc: "Jump into customized coding and aptitude modules.", path: "/practice", iconBg: "default" },
  { title: "Analyse Resume", emoji: "📄", desc: "Get AI-driven improvements for your profile.", path: "/resume", iconBg: "default" },
  { title: "Practice Interview", emoji: "🎤", desc: "Real-time mock sessions with facial analysis.", path: "/interview", iconBg: "default" },
  { title: "View Performance", emoji: "📊", desc: "Track your progress across all domains.", path: "/performance", iconBg: "default" },
  { title: "Weak Topics", emoji: "📉", desc: "Focus on areas needing extra attention.", path: "/weak-topics", iconBg: "red", accent: "weak" },
  { title: "Curriculum", emoji: "📚", desc: "Access your structured learning roadmap.", path: "/curriculum", iconBg: "default" },
];

function StudentDashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [showToast, setShowToast] = useState(true);
  const [stats, setStats] = useState(null);
  const name = localStorage.getItem("name") || "Student";

  useEffect(() => {
  fetchProfile();
  fetchStats();
}, []);
const fetchStats = async () => {
  const studentId = localStorage.getItem("studentId");

  try {
    const res = await axios.get(
      `http://localhost:8000/api/dashboard/stats?student_id=${studentId}`
    );

    setStats(res.data);

  } catch (error) {
    console.log(error);
  }
};

  const fetchProfile = async () => {
    const studentId = localStorage.getItem("studentId");
    try {
      const res = await getStudentProfile(studentId);
      setStudent(res);
    } catch (error) {
      console.log(error);
    }
  };

  const displayName = student.full_name || name;
  const initials = displayName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      <style>{styles}</style>
      <div className="sd-root">

        {/* NAV */}
        <nav className="sd-nav">
          <div className="sd-nav-brand">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
            AI Placement PreP
          </div>
          <div className="sd-nav-links">
            <button className="sd-nav-link active">Dashboard</button>
            <button className="sd-nav-link" onClick={() => navigate("/practice")}>Practice</button>
            <button className="pd-nav-link" onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
          </div>
          <div className="sd-nav-actions">
            <div className="sd-nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </div>
            <div className="sd-nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
              </svg>
            </div>
            <div className="sd-avatar-btn">{initials}</div>
          </div>
        </nav>

        <main className="sd-main">

          {/* HERO */}
          <div className="sd-hero">
            <div className="sd-hero-left">
              <h1>Welcome back, {displayName} 👋</h1>
              <p>Continue building your placement readiness today. You're in the top 15% of candidates this week.</p>
            </div>
            <div className="sd-readiness-card">
              <div className="sd-ring-wrap">
                <svg viewBox="0 0 80 80">
                  <circle className="sd-ring-track" cx="40" cy="40" r="35"/>
                  <circle className="sd-ring-fill" cx="40" cy="40" r="35"/>
                </svg>
                <div className="sd-ring-label">78%</div>
              </div>
              <div className="sd-readiness-info">
                <p>Placement Readiness</p>
                <p>+4% from last mock</p>
              </div>
            </div>
          </div>

          {/* PROFILE */}
          <div className="sd-profile-card">
            <div className="sd-profile-avatar">
              {initials}
              <div className="sd-online-dot"/>
            </div>
            <div className="sd-profile-info">
              <div className="sd-profile-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                {student.email || "pooja.v@university.edu"}
              </div>
              <div className="sd-profile-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.79-.8a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {student.phone || "+91 98765 43210"}
              </div>
              <div className="sd-profile-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {student.location || "Bangalore, India"}
              </div>
              <div className="sd-profile-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                {student.linkedin ? <a href={student.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> : <a href="#">LinkedIn</a>}
                &nbsp;
                {student.github ? <a href={student.github} target="_blank" rel="noreferrer">GitHub</a> : <a href="#">GitHub</a>}
              </div>
            </div>
            <div className="sd-resume-section">
              <span className="sd-resume-label">Resume Status</span>
              <div className="sd-resume-bar-bg" style={{ position: "relative", marginTop: "20px" }}>
                <span className="sd-resume-pct">92%</span>
                <div className="sd-resume-bar-fill"/>
              </div>
              {student.resume ? (
                <a href={`http://localhost:8000/${student.resume}`} target="_blank" rel="noreferrer" className="sd-view-resume-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  View Resume
                </a>
              ) : (
                <button className="sd-view-resume-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  View Resume
                </button>
              )}
            </div>
          </div>

          {/* FEATURE CARDS */}
          <div className="sd-cards-grid">
            {cards.map((card, i) => (
              <div
                key={i}
                className={`sd-feature-card ${card.accent || ""}`}
                onClick={() => navigate(card.path)}
              >
                <div className={`sd-card-icon-wrap ${card.iconBg}`}>
                  {card.emoji}
                </div>
                <h3>{card.title} {card.emoji}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>

          {/* STATS */}
          <div className="sd-stats-row">
            {[
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>, value: stats?.solved_today || "0", label: "Questions Solved" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>, value: "12", label: "Mock Interviews" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, value: "84/100", label: "Resume Score" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.56 2.9A7 7 0 1 1 2.9 8.56"/><path d="M2 12h10"/><path d="M12 2v10"/></svg>, value: "9 days", label: "Consistency Streak" },
            ].map((s, i) => (
              <div key={i} className="sd-stat-tile">
                <div className="sd-stat-tile-icon">{s.icon}</div>
                <div className="sd-stat-tile-value">{s.value}</div>
                <div className="sd-stat-tile-label">{s.label}</div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* AI TOAST */}
      {showToast && (
        <div className="sd-ai-toast" style={{ position: "fixed" }}>
          <div className="sd-ai-toast-dot">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div>
            <div className="sd-ai-toast-title">AI Recommendation</div>
            <div className="sd-ai-toast-body">Your "System Design" score has improved. We suggest tackling 'Load Balancing' next.</div>
          </div>
          <button className="sd-ai-toast-close" onClick={() => setShowToast(false)}>×</button>
        </div>
      )}
    </>
  );
}

export default StudentDashboard;