import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .register-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(160deg, #e8f5e9 0%, #f0f9f0 40%, #f7fbf2 100%);
    font-family: 'DM Sans', sans-serif;
  }

  /* NAV */
  .register-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 40px;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 600;
    color: #1a1a1a;
  }
  .nav-logo-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #2d7a3a;
  }
  .nav-links {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .nav-link {
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #333;
    padding: 8px 16px;
    border-radius: 8px;
    transition: background 0.15s;
  }
  .nav-link:hover { background: rgba(0,0,0,0.05); }
  .nav-link.login {
    background: #1a1a1a;
    color: #fff;
  }
  .nav-link.login:hover { background: #333; }

  /* HERO */
  .register-hero {
    text-align: center;
    padding: 60px 24px 40px;
  }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 18px;
    background: rgba(255,255,255,0.8);
    border: 1px solid rgba(45,122,58,0.25);
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: #2d7a3a;
    text-transform: uppercase;
    margin-bottom: 28px;
  }
  .hero-badge svg { width: 14px; height: 14px; }
  .register-title {
    font-family: 'Instrument Serif', serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 400;
    color: #111;
    line-height: 1.15;
    margin-bottom: 16px;
  }
  .register-subtitle {
    font-size: 15px;
    color: #555;
    max-width: 460px;
    margin: 0 auto;
    line-height: 1.6;
  }

  /* CARDS */
  .cards-grid {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
    padding: 20px 40px 60px;
  }
  .role-card {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 18px;
    padding: 40px 32px 32px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0;
    transition: box-shadow 0.2s, transform 0.2s;
    cursor: default;
  }
  .role-card:hover {
    box-shadow: 0 8px 32px rgba(45,122,58,0.12);
    transform: translateY(-3px);
  }
  .card-icon {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    background: #e8f5e9;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 22px;
    color: #2d7a3a;
  }
  .card-icon svg { width: 26px; height: 26px; }
  .card-title {
    font-size: 20px;
    font-weight: 600;
    color: #111;
    margin-bottom: 12px;
  }
  .card-desc {
    font-size: 14px;
    color: #777;
    line-height: 1.65;
    margin-bottom: 32px;
    flex: 1;
  }
  .card-btn {
    width: 100%;
    padding: 12px 24px;
    border-radius: 10px;
    border: 1.5px solid #2d7a3a;
    background: transparent;
    color: #2d7a3a;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.15s, color 0.15s;
  }
  .card-btn:hover {
    background: #2d7a3a;
    color: #fff;
  }
  .card-btn svg { width: 16px; height: 16px; }

  /* STATS */
  .stats-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding: 40px 40px;
    border-top: 1px solid #e8e8e8;
    background: rgba(255,255,255,0.5);
  }
  .stat-item {
    text-align: center;
    padding: 0 60px;
  }
  .stat-divider {
    width: 1px;
    height: 48px;
    background: #ddd;
  }
  .stat-number {
    font-family: 'Instrument Serif', serif;
    font-size: 2.4rem;
    color: #2d7a3a;
    font-weight: 400;
    line-height: 1;
    margin-bottom: 6px;
  }
  .stat-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #888;
  }

  /* FOOTER */
  .register-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 40px;
    border-top: 1px solid #e8e8e8;
    background: rgba(255,255,255,0.6);
  }
  .footer-brand {
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
  }
  .footer-copy {
    font-size: 12px;
    color: #999;
    margin-top: 2px;
  }
  .footer-links {
    display: flex;
    gap: 20px;
  }
  .footer-links a {
    font-size: 13px;
    color: #666;
    text-decoration: none;
  }
  .footer-links a:hover { color: #2d7a3a; }
`;

// Icons
const StudentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const TpoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const FacultyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/>
    <path d="M5 15l.75 2.25L8 18l-2.25.75L5 21l-.75-2.25L2 18l2.25-.75L5 15z"/>
  </svg>
);

function Register() {
  const navigate = useNavigate();

  const roles = [
    {
      icon: <StudentIcon />,
      title: "Student",
      desc: "Practice coding, improve resume, prepare interviews, track placement readiness",
      path: "/student-signup",
    },
    {
      icon: <TpoIcon />,
      title: "TPO",
      desc: "Manage drives, monitor students, analyze placement performance",
      path: "/tpo-signup",
    },
    {
      icon: <FacultyIcon />,
      title: "Faculty",
      desc: "Guide students, monitor progress, assign learning goals",
      path: "/faculty-signup",
    },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="register-page">
        {/* Navbar */}
        <nav className="register-nav">
          <div className="nav-logo">
            <div className="nav-logo-dot" />
            AI Placement PreP
          </div>
          <div className="nav-links">
            <button className="nav-link" onClick={() => navigate("/")}>Home</button>
            <button className="nav-link login" onClick={() => navigate("/login")}>Login</button>
          </div>
        </nav>

        {/* Hero */}
        <div className="register-hero">
          <div className="hero-badge">
            <SparkleIcon />
            Join the Placement Ecosystem
          </div>
          <h1 className="register-title">Choose Registration Type</h1>
          <p className="register-subtitle">
            Select your role to access a personalized AI-powered experience built for placements and career growth.
          </p>
        </div>

        {/* Cards */}
        <div className="cards-grid">
          {roles.map((role) => (
            <div className="role-card" key={role.title}>
              <div className="card-icon">{role.icon}</div>
              <div className="card-title">{role.title}</div>
              <div className="card-desc">{role.desc}</div>
              <button className="card-btn" onClick={() => navigate(role.path)}>
                Continue <ArrowIcon />
              </button>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-number">5000+</div>
            <div className="stat-label">Students</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-number">150+</div>
            <div className="stat-label">Recruiters</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>

        {/* Footer */}
        <footer className="register-footer">
          <div>
            <div className="footer-brand">AI Placement PreP</div>
            <div className="footer-copy">© 2024 AI Placement Prep. All rights reserved.</div>
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Contact</a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Register;