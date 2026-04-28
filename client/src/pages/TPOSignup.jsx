import { useState } from "react";
import { tpoSignup } from "../api/authApi";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .tpo-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'DM Sans', sans-serif;
    background: #eef0e8;
  }

  .tpo-main {
    flex: 1;
    display: flex;
    min-height: calc(100vh - 56px);
  }

  /* LEFT PANEL */
  .tpo-left {
    width: 500px;
    min-width: 380px;
    background: #1a3320;
    padding: 40px 44px;
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    overflow: hidden;
  }
  .tpo-left::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 500px; height: 300px;
    border-radius: 50%;
    background: rgba(74,180,90,0.07);
    pointer-events: none;
  }
  .left-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 48px;
  }
  .logo-icon {
    width: 38px; height: 38px;
    background: #3d8f4a;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    color: #fff;
    font-size: 18px;
    flex-shrink: 0;
  }
  .logo-text {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
  }
  .left-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 6px 14px;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 999px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.7);
    margin-bottom: 28px;
  }
  .badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #4db862;
  }
  .left-headline {
    font-family: 'Instrument Serif', serif;
    font-size: 2.6rem;
    font-weight: 400;
    color: #fff;
    line-height: 1.15;
    margin-bottom: 20px;
  }
  .left-headline span {
    color: #4db862;
  }
  .left-desc {
    font-size: 14px;
    color: rgba(255,255,255,0.6);
    line-height: 1.7;
    margin-bottom: 32px;
  }
  .left-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 40px;
  }
  .left-features li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    color: rgba(255,255,255,0.85);
  }
  .feature-icon {
    width: 22px; height: 22px;
    border-radius: 50%;
    border: 1.5px solid #4db862;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    color: #4db862;
  }
  .feature-icon svg { width: 12px; height: 12px; }

  /* Dashboard mockup */
  .dashboard-mockup {
    margin-top: auto;
    background: #0f1f15;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .mockup-bar {
    background: #1a2e1f;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    gap: 6px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .mockup-dot { width: 7px; height: 7px; border-radius: 50%; }
  .mockup-bar-title {
    font-size: 10px;
    color: rgba(255,255,255,0.4);
    margin-left: 8px;
    font-weight: 500;
  }
  .mockup-body {
    padding: 14px;
    display: flex;
    gap: 10px;
    align-items: flex-end;
    height: 130px;
  }
  .mockup-sidebar {
    width: 90px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .sidebar-item {
    height: 8px;
    border-radius: 3px;
    background: rgba(255,255,255,0.1);
  }
  .sidebar-item.active { background: rgba(77,184,98,0.5); width: 70%; }
  .mockup-chart {
    flex: 1;
    display: flex;
    align-items: flex-end;
    gap: 5px;
    padding-bottom: 4px;
  }
  .chart-bar {
    flex: 1;
    border-radius: 3px 3px 0 0;
    background: #2d6e3a;
    opacity: 0.7;
  }
  .chart-bar.accent { background: #f97316; opacity: 0.8; }

  /* RIGHT PANEL */
  .tpo-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 48px;
    background: #eef0e8;
    transform: translateY(-60px);
  }
  .tpo-card {
    background: #fff;
    border-radius: 20px;
    padding: 44px 48px 40px;
    width: 100%;
    max-width: 560px;
    box-shadow: 0 4px 40px rgba(0,0,0,0.07);
  }
  .card-header {
    text-align: center;
    margin-bottom: 32px;
  }
  .card-brand {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 16px;
  }
  .brand-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #4db862;
  }
  .card-title {
    font-family: 'Serif', serif;
    font-size: 4rem;
    font-weight: 400;
    color: #111;
    margin-bottom: 6px;
  }
  .card-subtitle {
    font-size: 14px;
    color: #888;
  }

  /* FORM GRID */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px 20px;
    margin-bottom: 24px;
  }
  .form-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .form-label {
    font-size: 13px;
    font-weight: 500;
    color: #444;
  }
  .form-input {
    padding: 12px 16px;
    border: 1.5px solid #e5e5e5;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #222;
    background: #fff;
    outline: none;
    transition: border-color 0.15s;
  }
  .form-input::placeholder { color: #bbb; }
  .form-input:focus { border-color: #4db862; }

  .submit-btn {
    width: 100%;
    padding: 15px 24px;
    background: #1a3320;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.15s;
    margin-bottom: 16px;
  }
  .submit-btn:hover { background: #2d5c3a; }
  .submit-btn svg { width: 16px; height: 16px; }

  .login-link {
    text-align: center;
    font-size: 14px;
    color: #888;
    margin-bottom: 32px;
  }
  .login-link a {
    color: #2d7a3a;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
  }
  .login-link a:hover { text-decoration: underline; }

  /* CARD STATS */
  .card-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding-top: 24px;
    border-top: 1px solid #f0f0f0;
  }
  .card-stat {
    flex: 1;
    text-align: center;
    padding: 0 8px;
  }
  .stat-divider {
    width: 1px;
    height: 32px;
    background: #e8e8e8;
  }
  .stat-num {
    font-size: 16px;
    font-weight: 700;
    color: #2d7a3a;
    display: inline;
  }
  .stat-lbl {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #aaa;
    margin-top: 2px;
  }

  .message {
    text-align: center;
    font-size: 13px;
    padding: 10px 16px;
    border-radius: 8px;
    margin-bottom: 16px;
  }
  .message.success { background: #e8f5e9; color: #2d7a3a; }
  .message.error { background: #fdecea; color: #c62828; }

  /* FOOTER */
  .tpo-footer {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px 44px;
    border-top: 1px solid #dde0d6;
    background: #eef0e8;
  }
  .footer-copy {
    font-size: 11px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #999;
    max-width: 320px;
    line-height: 1.6;
  }
  .footer-links {
    display: flex;
    gap: 32px;
  }
  .footer-link-col {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #888;
    cursor: pointer;
  }
  .footer-link-col:hover { color: #2d7a3a; }
`;

const CheckIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6l3 3 5-5"/>
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const barHeights = [35, 55, 45, 70, 50, 80, 60, 75, 40, 65, 55, 85];

function TPOSignup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    college_name: "",
    contact_number: "",
    designation: ""
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await tpoSignup(formData);
      setMessage({ text: res.message, type: "success" });
      setFormData({ email: "", password: "", full_name: "", college_name: "", contact_number: "", designation: "" });
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="tpo-page">
        <div className="tpo-main">
          {/* LEFT */}
          <div className="tpo-left">
            <div className="left-logo">
              <div className="logo-icon">✦</div>
              <span className="logo-text">AI Placement Prep</span>
            </div>
            <div className="left-badge">
              <div className="badge-dot" />
              Institutional Partner Access
            </div>
            <h1 className="left-headline">
              Empower<br />Placements<br />with <span>Smart AI<br />Tools</span>
            </h1>
            <p className="left-desc">
              Manage student readiness, placement drives, analytics, and recruiter engagement through one intelligent dashboard.
            </p>
            <ul className="left-features">
              {["Student readiness tracking", "Placement drive management", "Performance analytics", "Recruiter insights"].map(f => (
                <li key={f}>
                  <div className="feature-icon"><CheckIcon /></div>
                  {f}
                </li>
              ))}
            </ul>

            {/* Dashboard mockup */}
            <div className="dashboard-mockup">
              <div className="mockup-bar">
                <div className="mockup-dot" style={{ background: "#ff5f57" }} />
                <div className="mockup-dot" style={{ background: "#febc2e" }} />
                <div className="mockup-dot" style={{ background: "#28c840" }} />
                <span className="mockup-bar-title">Placement Analytics</span>
              </div>
              <div className="mockup-body">
                <div className="mockup-sidebar">
                  {[100, 60, 80, 50, 70, 55, 65, 45].map((w, i) => (
                    <div key={i} className={`sidebar-item ${i === 1 ? "active" : ""}`} style={{ width: `${w}%` }} />
                  ))}
                </div>
                <div className="mockup-chart">
                  {barHeights.map((h, i) => (
                    <div key={i} className={`chart-bar ${i % 4 === 3 ? "accent" : ""}`} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="tpo-right">
            <div className="tpo-card">
              <div className="card-header">
                <div className="card-brand">
                  <div className="brand-dot" />
                  AI Placement Prep
                </div>
                <h2 className="card-title">TPO Signup</h2>
                <p className="card-subtitle">Create your Training &amp; Placement Officer account.</p>
              </div>

              {message.text && (
                <p className={`message ${message.type}`}>{message.text}</p>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-field">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" name="full_name" placeholder="Dr. Sarah Johnson" value={formData.full_name} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Work Email</label>
                    <input className="form-input" name="email" type="email" placeholder="sarah@university.edu" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">College / University</label>
                    <input className="form-input" name="college_name" placeholder="Global Institute of Tech" value={formData.college_name} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Designation</label>
                    <input className="form-input" name="designation" placeholder="Chief Placement Officer" value={formData.designation} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Contact Number</label>
                    <input className="form-input" name="contact_number" placeholder="+1 (555) 000-0000" value={formData.contact_number} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Password</label>
                    <input className="form-input" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                  </div>
                </div>

                <button type="submit" className="submit-btn">
                  Create TPO Account <ArrowIcon />
                </button>
              </form>

              <p className="login-link">Already registered? <a href="/login">Login</a></p>

              <div className="card-stats">
                <div className="card-stat">
                  <span className="stat-num">150+</span>
                  <div className="stat-lbl">Colleges</div>
                </div>
                <div className="stat-divider" />
                <div className="card-stat">
                  <span className="stat-num">5000+</span>
                  <div className="stat-lbl">Students</div>
                </div>
                <div className="stat-divider" />
                <div className="card-stat">
                  <span className="stat-num">95%</span>
                  <div className="stat-lbl">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="tpo-footer">
          <div className="footer-copy">
            © 2024 AI Placement Prep. Empowering the next generation of professionals.
          </div>
          <div className="footer-links">
            {["Privacy Policy", "Terms of Service", "Institutional Licensing", "Support"].map(l => (
              <div key={l} className="footer-link-col">{l}</div>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}

export default TPOSignup;