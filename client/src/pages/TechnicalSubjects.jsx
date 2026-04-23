import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ts-root {
    min-height: 100vh;
    background: #eef4e8;
    font-family: 'Manrope', sans-serif;
    color: #1a2a1a;
    display: flex;
    flex-direction: column;
  }

  /* NAV */
  .ts-nav {
    background: #1a3a1a;
    height: 52px;
    display: flex;
    align-items: center;
    padding: 0 28px;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .ts-nav-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
  }

  .ts-brand-dot {
    width: 9px; height: 9px;
    border-radius: 50%;
    background: #3ab43a;
    box-shadow: 0 0 0 2px rgba(58,180,58,0.25);
  }

  .ts-nav-actions {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .ts-nav-icon {
    width: 32px; height: 32px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.65);
    cursor: pointer;
    transition: background 0.15s;
  }

  .ts-nav-icon:hover { background: rgba(255,255,255,0.1); }
  .ts-nav-icon svg { width: 17px; height: 17px; }

  .ts-nav-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: #4a7a4a;
    border: 2px solid rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #fff;
    cursor: pointer;
  }

  /* MAIN */
  .ts-main {
    flex: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: 52px 32px 64px;
    width: 100%;
  }

  /* HERO */
  .ts-hero {
    text-align: center;
    margin-bottom: 48px;
  }

  .ts-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #2a7a2a;
    background: rgba(255,255,255,0.75);
    border: 1px solid rgba(60,160,60,0.2);
    border-radius: 20px;
    padding: 5px 14px;
    margin-bottom: 18px;
  }

  .ts-badge svg { width: 13px; height: 13px; }

  .ts-hero h1 {
    font-size: clamp(2.2rem, 4vw, 3rem);
    font-weight: 800;
    color: #1a2a1a;
    letter-spacing: -0.025em;
    margin-bottom: 14px;
  }

  .ts-hero p {
    font-size: 15px;
    color: #6a806a;
    max-width: 500px;
    margin: 0 auto 20px;
    line-height: 1.6;
  }

  .ts-count-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #3a5a3a;
    background: rgba(255,255,255,0.8);
    border: 1px solid rgba(60,140,60,0.18);
    border-radius: 24px;
    padding: 8px 20px;
  }

  .ts-count-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #ccc;
  }

  /* SUBJECT GRID */
  .ts-grid-top {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin-bottom: 18px;
  }

  .ts-grid-bottom {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
    margin-bottom: 32px;
    max-width: calc(66.66% + 9px);
    margin-left: auto;
    margin-right: auto;
  }

  .ts-card {
    background: #fff;
    border-radius: 20px;
    border: 1px solid rgba(100,160,100,0.1);
    padding: 28px 24px 22px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 10px rgba(60,100,60,0.05);
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .ts-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(60,100,60,0.1);
  }

  .ts-card-icon {
    width: 52px; height: 52px;
    border-radius: 14px;
    background: #e8f5e8;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px;
    color: #198754;
  }

  .ts-card-icon svg { width: 24px; height: 24px; }

  .ts-card h3 {
    font-size: 17px;
    font-weight: 700;
    color: #1a2a1a;
    margin-bottom: 6px;
    letter-spacing: -0.01em;
  }

  .ts-card-topics {
    font-size: 13px;
    color: #7a906a;
    margin-bottom: 20px;
    line-height: 1.4;
  }

  .ts-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
  }

  .ts-status {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 6px;
  }

  .ts-status.pro       { background: #e8f5e8; color: #198754; }
  .ts-status.mastered  { background: #e8f5e8; color: #198754; }
  .ts-status.locked    { background: #f0f0f0; color: #888; }
  .ts-status.needs     { background: #fef0f0; color: #e24b4a; }
  .ts-status.starting  { background: #f0f8f0; color: #3a7a3a; }

  .ts-arrow {
    width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    color: #aabcaa;
  }

  .ts-arrow svg { width: 16px; height: 16px; }

  .ts-lock svg { width: 16px; height: 16px; color: #bbb; }

  /* INSIGHTS BAR */
  .ts-insights {
    background: #fff;
    border-radius: 18px;
    border: 1px solid rgba(100,160,100,0.1);
    padding: 20px 24px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    box-shadow: 0 2px 8px rgba(60,100,60,0.04);
  }

  .ts-insight-tile {
    background: #f8fbf5;
    border-radius: 12px;
    border: 1px solid rgba(100,160,100,0.08);
    padding: 14px 16px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .ts-insight-icon {
    width: 36px; height: 36px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .ts-insight-icon.green { background: #e8f5e8; color: #198754; }
  .ts-insight-icon.teal  { background: #e8f5ea; color: #0d9488; }
  .ts-insight-icon.red   { background: #fef0f0; color: #e24b4a; }
  .ts-insight-icon svg   { width: 16px; height: 16px; }

  .ts-insight-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #8aaa8a;
    margin-bottom: 3px;
  }

  .ts-insight-value {
    font-size: 16px;
    font-weight: 800;
    color: #1a2a1a;
  }

  @media (max-width: 720px) {
    .ts-grid-top    { grid-template-columns: 1fr; }
    .ts-grid-bottom { grid-template-columns: 1fr; max-width: 100%; }
    .ts-insights    { grid-template-columns: 1fr; }
    .ts-main        { padding: 32px 16px 48px; }
  }
`;

const subjects = [
  {
    name: "DSA",
    fullName: "DSA",
    topics: "Arrays, Trees, Graphs, DP, Recursion",
    status: "pro",
    statusLabel: "PRO",
    locked: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    name: "DBMS",
    fullName: "DBMS",
    topics: "SQL, Normalization, Transactions",
    status: "mastered",
    statusLabel: "MASTERED",
    locked: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
  },
  {
    name: "OOPS",
    fullName: "OOPS",
    topics: "Inheritance, Polymorphism, Encapsulation",
    status: "locked",
    statusLabel: "LOCKED",
    locked: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><path d="M3 17l4 4 7-7"/>
      </svg>
    ),
  },
  {
    name: "CN",
    fullName: "Computer Networks",
    topics: "OSI, TCP/IP, Routing, Protocols",
    status: "needs",
    statusLabel: "NEEDS FOCUS",
    locked: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/>
        <circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/>
        <line x1="6" y1="6" x2="10" y2="11"/><line x1="18" y1="6" x2="14" y2="11"/>
        <line x1="6" y1="18" x2="10" y2="13"/><line x1="18" y1="18" x2="14" y2="13"/>
      </svg>
    ),
  },
  {
    name: "OS",
    fullName: "Operating Systems",
    topics: "Processes, Threads, Scheduling, Memory",
    status: "starting",
    statusLabel: "STARTING",
    locked: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
    ),
  },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

function SubjectCard({ subject, onClick }) {
  return (
    <div className="ts-card" onClick={onClick}>
      <div className="ts-card-icon">{subject.icon}</div>
      <h3>{subject.fullName}</h3>
      <div className="ts-card-topics">{subject.topics}</div>
      <div className="ts-card-footer">
        <span className={`ts-status ${subject.status}`}>{subject.statusLabel}</span>
        {subject.locked
          ? <div className="ts-lock"><LockIcon /></div>
          : <div className="ts-arrow"><ArrowIcon /></div>
        }
      </div>
    </div>
  );
}

function TechnicalSubjects() {
  const navigate = useNavigate();

  const selectSubject = (name) => navigate(`/technical-practice/${name}`);
  const [insight, setInsight] = useState({
  strongest: "Loading...",
  focus: "Loading..."
});
useEffect(() => {
  fetchInsights();
}, []);

const fetchInsights = async () => {
  const studentId = localStorage.getItem("studentId");

  try {
    const res = await axios.get(
      `http://localhost:8000/api/analyticss/technical-insights?student_id=${studentId}`
    );

    setInsight(res.data);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <style>{css}</style>
      <div className="ts-root">

        {/* NAV */}
        <nav className="ts-nav">
          <div className="ts-nav-brand">
            <div className="ts-brand-dot" />
            AI Placement Prep
          </div>
          <div className="ts-nav-actions">
            <div className="ts-nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </div>
            <div className="ts-nav-avatar">S</div>
          </div>
        </nav>

        <main className="ts-main">

          {/* HERO */}
          <div className="ts-hero">
            <div className="ts-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              Core Placement Preparation
            </div>
            <h1>Technical Subjects</h1>
            <p>Choose a subject and master the concepts asked in real placement interviews. Each path is optimized for high-performance recall.</p>
            <div className="ts-count-pill">
              <div className="ts-count-dot" />
              5 Subjects Available
            </div>
          </div>

          {/* TOP ROW — 3 cards */}
          <div className="ts-grid-top">
            {subjects.slice(0, 3).map((s) => (
              <SubjectCard key={s.name} subject={s} onClick={() => selectSubject(s.name)} />
            ))}
          </div>

          {/* BOTTOM ROW — 2 cards centred */}
          <div className="ts-grid-bottom">
            {subjects.slice(3).map((s) => (
              <SubjectCard key={s.name} subject={s} onClick={() => selectSubject(s.name)} />
            ))}
          </div>

          {/* INSIGHTS BAR */}
          <div className="ts-insights">
            <div className="ts-insight-tile">
              <div className="ts-insight-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
              </div>
              <div>
                <div className="ts-insight-label">Most Popular</div>
                <div className="ts-insight-value">DSA</div>
              </div>
            </div>

            <div className="ts-insight-tile">
              <div className="ts-insight-icon teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div>
                <div className="ts-insight-label">Your Strongest</div>
                <div className="ts-insight-value">
  {insight.strongest}
</div>
              </div>
            </div>

            <div className="ts-insight-tile">
              <div className="ts-insight-icon red">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <div>
                <div className="ts-insight-label">Need Focus</div>
                <div className="ts-insight-value">
  {insight.focus}
</div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}

export default TechnicalSubjects;