import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .pd-root {
    min-height: 100vh;
    background: #f0f4ec;
    font-family: 'Manrope', sans-serif;
    color: #1a2a1a;
    display: flex;
    flex-direction: column;
  }

  /* ── NAV ── */
  .pd-nav {
    background: #1a3a1a;
    height: 54px;
    display: flex;
    align-items: center;
    padding: 0 40px;
    gap: 32px;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .pd-nav-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    margin-right: 8px;
  }

  .pd-brand-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #3ab43a;
    box-shadow: 0 0 0 2px rgba(58,180,58,0.3);
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

  .pd-nav-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #3a5a3a;
    border: 1.5px solid rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.8);
    cursor: pointer;
    margin-left: auto;
  }

  .pd-nav-avatar svg { width: 16px; height: 16px; }

  /* ── MAIN ── */
  .pd-main {
    flex: 1;
    max-width: 980px;
    margin: 0 auto;
    padding: 56px 32px 64px;
    width: 100%;
  }

  /* HERO TEXT */
  .pd-hero {
    text-align: center;
    margin-bottom: 44px;
  }

  .pd-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #2a7a2a;
    background: rgba(255,255,255,0.7);
    border: 1px solid rgba(60,160,60,0.2);
    border-radius: 20px;
    padding: 5px 14px;
    margin-bottom: 20px;
  }

  .pd-hero h1 {
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 800;
    color: #1a2a1a;
    letter-spacing: -0.025em;
    margin-bottom: 12px;
  }

  .pd-hero p {
    font-size: 15px;
    color: #7a906a;
    font-weight: 400;
  }

  /* CATEGORY GRID */
  .pd-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 24px;
  }

  .pd-cat-card {
    background: #fff;
    border-radius: 18px;
    border: 1px solid rgba(100,160,100,0.12);
    padding: 28px 28px 24px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 10px rgba(60,100,60,0.05);
    position: relative;
  }

  .pd-cat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(60,100,60,0.1);
  }

  .pd-cat-arrow {
    position: absolute;
    top: 24px;
    right: 24px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #aabcaa;
  }

  .pd-cat-arrow svg { width: 16px; height: 16px; }

  .pd-cat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: #e8f5e8;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    color: #198754;
  }

  .pd-cat-icon svg { width: 22px; height: 22px; }

  .pd-cat-card h3 {
    font-size: 18px;
    font-weight: 700;
    color: #1a2a1a;
    margin-bottom: 14px;
    letter-spacing: -0.01em;
  }

  .pd-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .pd-tag {
    font-size: 12px;
    font-weight: 500;
    color: #3a6a3a;
    background: #f0f8f0;
    border: 1px solid #d0e8d0;
    border-radius: 20px;
    padding: 4px 12px;
  }

  /* STATS BAR */
  .pd-stats-bar {
    background: #fff;
    border-radius: 16px;
    border: 1px solid rgba(100,160,100,0.12);
    padding: 28px 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px rgba(60,100,60,0.04);
  }

  .pd-stat-item {}

  .pd-stat-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: #8aaa8a;
    margin-bottom: 8px;
  }

  .pd-stat-value {
    font-size: 32px;
    font-weight: 800;
    color: #1a2a1a;
    letter-spacing: -0.02em;
  }

  .pd-stat-value.red { color: #e24b4a; }

  /* BANNER */
  .pd-banner {
    border-radius: 18px;
    overflow: hidden;
    position: relative;
    min-height: 240px;
    background: #2a4a2a;
    display: flex;
    align-items: flex-end;
  }

  .pd-banner-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(26,42,26,0.92) 45%, rgba(26,42,26,0.3) 100%);
    z-index: 1;
  }

  .pd-banner-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.45;
    filter: grayscale(30%);
  }

  /* Fallback texture when no image */
  .pd-banner-texture {
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(
        45deg,
        rgba(255,255,255,0.015) 0px,
        rgba(255,255,255,0.015) 1px,
        transparent 1px,
        transparent 12px
      ),
      linear-gradient(135deg, #2a4a2a 0%, #1a3020 60%, #0e2018 100%);
  }

  .pd-banner-content {
    position: relative;
    z-index: 2;
    padding: 40px 44px;
  }

  .pd-banner-content h2 {
    font-size: clamp(1.5rem, 2.8vw, 2rem);
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.02em;
    line-height: 1.25;
    margin-bottom: 12px;
    max-width: 340px;
  }

  .pd-banner-content p {
    font-size: 13px;
    color: rgba(255,255,255,0.6);
    max-width: 320px;
    line-height: 1.6;
  }

  /* ── FOOTER ── */
  .pd-footer {
    background: #f8faf5;
    border-top: 1px solid rgba(100,160,100,0.1);
    padding: 28px 40px;
    display: flex;
    align-items: center;
    gap: 24px;
    font-size: 12px;
    color: #8aaa8a;
  }

  .pd-footer-brand {
    font-size: 13px;
    font-weight: 700;
    color: #3a5a3a;
    margin-right: 8px;
  }

  .pd-footer-copy { flex: 1; text-align: center; letter-spacing: 0.04em; text-transform: uppercase; font-size: 11px; }

  .pd-footer-links { display: flex; gap: 20px; }

  .pd-footer-links a {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #198754;
    text-decoration: none;
  }

  .pd-footer-links a:hover { text-decoration: underline; }

  @media (max-width: 680px) {
    .pd-grid { grid-template-columns: 1fr; }
    .pd-stats-bar { grid-template-columns: 1fr; padding: 20px 24px; }
    .pd-main { padding: 36px 16px 48px; }
    .pd-footer { flex-direction: column; text-align: center; }
    .pd-footer-copy { order: 2; }
  }
`;

const categories = [
  {
    title: "Technical Subjects",
    path: "/technical",
    tags: ["DBMS", "OS", "CN", "OOPS", "SQL"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    title: "Programming Languages",
    path: "/languages",
    tags: ["Java", "Python", "C++", "JavaScript"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    title: "Aptitude",
    path: "/aptitude",
    tags: ["Quantitative", "Reasoning", "Verbal"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: "Coding Practice",
    path: "/coding-subjects",
    tags: ["DSA Problems", "Patterns", "Algorithm Visualizer"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
      </svg>
    ),
  },
];


function PracticeDashboard() {
  const navigate = useNavigate();

  const [weakCount, setWeakCount] = useState(0);
  const [stats, setStats] = useState({
  questions_today: 0,
  accuracy: 0
});

  useEffect(() => {
  fetchWeakTopics();
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
  const fetchWeakTopics = async () => {
    const studentId = localStorage.getItem("studentId");

    try {
      const res = await axios.get(
        `http://localhost:8000/api/analytics/weak-topics?student_id=${studentId}`
      );

      const data = res.data;

      const allTopics = [
        ...(data.technical || []),
        ...(data.programming || []),
        ...(data.coding || []),
        ...(data.aptitude || [])
      ];

      const count = allTopics.filter(
        (item) => item.accuracy < 70
      ).length;

      setWeakCount(count);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="pd-root">

        {/* NAV */}
        <nav className="pd-nav">
          <div className="pd-nav-brand">
            AI Placement Practice
            <div className="pd-brand-dot" />
          </div>
          <div className="pd-nav-links">
            <button className="pd-nav-link active">Dashboard</button>
            
          </div>
          <div className="pd-nav-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        </nav>

        <main className="pd-main">

          {/* HERO */}
          <div className="pd-hero">
            <div className="pd-badge">+ Daily Growth System</div>
            <h1>Practice Dashboard</h1>
            <p>Choose your learning track and sharpen your placement skills.</p>
          </div>

          {/* CATEGORY CARDS */}
          <div className="pd-grid">
            {categories.map((cat, i) => (
              <div key={i} className="pd-cat-card" onClick={() => navigate(cat.path)}>
                <div className="pd-cat-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
                <div className="pd-cat-icon">{cat.icon}</div>
                <h3>{cat.title}</h3>
                <div className="pd-tags">
                  {cat.tags.map((tag, j) => (
                    <span key={j} className="pd-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* STATS BAR */}
          <div className="pd-stats-bar">
            <div className="pd-stat-item">
              <div className="pd-stat-label">Questions Solved </div>
              <div className="pd-stat-value">
  {stats?.solved_today || 0}
</div>
            </div>
            <div className="pd-stat-item">
              <div className="pd-stat-label">Accuracy Rate</div>
              <div className="pd-stat-value">
  {stats.accuracy}%
</div>
            </div>
            
            <div className="pd-stat-item">
              <div className="pd-stat-label">Weak Areas Remaining</div>
              <div
  className="pd-stat-value red"
  onClick={() => navigate("/weak-topics")}
  style={{ cursor: "pointer" }}
>
  {weakCount}
</div>
            </div>
          </div>

          {/* BANNER */}
          <div className="pd-banner">
            <div className="pd-banner-texture" />
            <div className="pd-banner-overlay" />
            <div className="pd-banner-content">
              <h2>Elevate your professional trajectory.</h2>
              <p>Every mock interview brings you one step closer to the executive suite. Maintain your discipline.</p>
            </div>
          </div>

        </main>

        {/* FOOTER */}
        <footer className="pd-footer">
          <span className="pd-footer-brand">AI Placement PreP</span>
          <span className="pd-footer-copy">© 2024 AI Placement PreP. Excellence through discipline.</span>
          <div className="pd-footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/support">Support</a>
          </div>
        </footer>

      </div>
    </>
  );
}

export default PracticeDashboard;