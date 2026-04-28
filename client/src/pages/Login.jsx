import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

  .login-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #eef5ee 0%, #f5f8f0 60%, #e8f0e8 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Manrope', sans-serif;
    padding: 2rem;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

<<<<<<< HEAD
=======
  /* Subtle dot grid pattern */
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3
  .login-page::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, #b5d4b5 1px, transparent 1px);
    background-size: 32px 32px;
    opacity: 0.35;
    pointer-events: none;
  }

  .login-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1080px;
    width: 100%;
    align-items: center;
    position: relative;
    z-index: 1;
  }

<<<<<<< HEAD
=======
  /* ── LEFT PANEL ── */
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3
  .login-left {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .product-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #3a7a3a;
    background: rgba(255,255,255,0.6);
    border: 1px solid rgba(100,160,100,0.25);
    border-radius: 20px;
    padding: 6px 14px;
    width: fit-content;
  }

  .product-badge svg {
    width: 14px;
    height: 14px;
    color: #3a7a3a;
  }

  .login-headline {
    font-size: clamp(2rem, 3.5vw, 2.75rem);
    font-weight: 800;
    line-height: 1.15;
    color: #1a2a1a;
    margin: 0;
    letter-spacing: -0.02em;
  }

  .login-subline {
    font-size: 16px;
    color: #5a6e5a;
    margin: -1rem 0 0;
    font-weight: 400;
    line-height: 1.6;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .stat-card {
    background: rgba(255,255,255,0.75);
    border: 1px solid rgba(100,160,100,0.15);
    border-radius: 14px;
    padding: 18px 20px;
    backdrop-filter: blur(8px);
  }

  .stat-card.wide {
    grid-column: 1 / -1;
  }

  .stat-icon {
    font-size: 20px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .stat-icon svg {
    width: 22px;
    height: 22px;
    color: #3a7a3a;
  }

  .stat-value {
    font-size: 22px;
    font-weight: 700;
    color: #1a2a1a;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .stat-value .trend {
    font-size: 14px;
    color: #3a9a3a;
  }

  .stat-label {
    font-size: 13px;
    color: #6a806a;
    margin-top: 2px;
  }

  .avatar-row {
    display: flex;
    margin-top: 10px;
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid white;
    background: #b5d4b5;
    margin-left: -8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
    color: #3a7a3a;
  }

  .avatar:first-child { margin-left: 0; }

  .trusted-label {
    font-size: 13px;
    font-weight: 600;
    color: #1a2a1a;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .trusted-label svg {
    width: 16px;
    height: 16px;
    color: #3a9a3a;
  }

<<<<<<< HEAD
=======
  /* ── RIGHT PANEL (Card) ── */
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3
  .login-card {
    background: rgba(255,255,255,0.9);
    border: 1px solid rgba(100,160,100,0.12);
    border-radius: 20px;
    padding: 40px 40px 36px;
    backdrop-filter: blur(16px);
    box-shadow: 0 8px 32px rgba(60,100,60,0.08), 0 1px 0 rgba(255,255,255,0.8) inset;
  }

  .card-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #3a7a3a;
    margin-bottom: 20px;
  }

  .brand-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #3ab43a;
    box-shadow: 0 0 0 3px rgba(58,180,58,0.2);
  }

  .card-title {
    font-size: 28px;
    font-weight: 800;
    color: #1a2a1a;
    margin: 0 0 8px;
    letter-spacing: -0.02em;
  }

  .card-desc {
    font-size: 14px;
    color: #6a806a;
    margin: 0 0 28px;
    line-height: 1.6;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 6px;
  }

  .field-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #3a4a3a;
    margin-bottom: 6px;
  }

  .field-input {
    width: 100%;
    height: 46px;
    border: 1.5px solid #d4e8d4;
    border-radius: 10px;
    padding: 0 14px;
    font-size: 14px;
    font-family: 'Manrope', sans-serif;
    color: #1a2a1a;
    background: #fafcfa;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .field-input::placeholder {
    color: #b0c4b0;
  }

  .field-input:focus {
    border-color: #3a9a3a;
    box-shadow: 0 0 0 3px rgba(58,154,58,0.12);
    background: #fff;
  }

  .field-input.error {
    border-color: #e24b4a;
    box-shadow: 0 0 0 3px rgba(226,75,74,0.1);
  }

  .password-wrapper {
    position: relative;
  }

  .password-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #8aaa8a;
    padding: 4px;
    display: flex;
    align-items: center;
    transition: color 0.15s;
  }

  .password-toggle:hover { color: #3a7a3a; }
  .password-toggle svg { width: 16px; height: 16px; }

  .forgot-row {
    display: flex;
    justify-content: flex-end;
    margin: 6px 0 20px;
  }

  .forgot-link {
    font-size: 13px;
    font-weight: 500;
    color: #3a7a3a;
    text-decoration: none;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font-family: inherit;
  }

  .forgot-link:hover { text-decoration: underline; }

  .login-btn {
    width: 100%;
    height: 46px;
    background: #d0e8d0;
    color: #5a7a5a;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    font-family: 'Manrope', sans-serif;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, transform 0.1s;
    position: relative;
    overflow: hidden;
  }

  .login-btn:not(:disabled):hover {
    background: #3a9a3a;
    color: #fff;
  }

  .login-btn:not(:disabled):active {
    transform: scale(0.98);
  }

  .login-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .login-btn.loading::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: translateY(-50%) rotate(360deg); }
  }

  .message {
    margin-top: 14px;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    text-align: center;
  }

  .message.success {
    background: #eaf5ea;
    color: #2a6a2a;
    border: 1px solid #c0ddc0;
  }

  .message.error {
    background: #fef0f0;
    color: #a32d2d;
    border: 1px solid #f5c1c1;
  }

  .signup-row {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #7a8a7a;
  }

  .signup-link {
    color: #2a7a2a;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    background: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    padding: 0;
  }

  .signup-link:hover { text-decoration: underline; }

<<<<<<< HEAD
=======
  /* ── FOOTER ── */
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3
  .login-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px 2rem;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #8a9a8a;
    z-index: 2;
  }

  .login-footer a {
    color: #8a9a8a;
    text-decoration: none;
  }

  .login-footer a:hover { color: #3a7a3a; }

<<<<<<< HEAD
=======
  /* ── RESPONSIVE ── */
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3
  @media (max-width: 768px) {
    .login-inner {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .login-left { display: none; }
  }
`;

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await loginUser(formData);

<<<<<<< HEAD
      // ── Clear any previous session first ──
      localStorage.clear();

      // ── Common keys for all roles ──
=======
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3
      localStorage.setItem("token", res.access_token);
      localStorage.setItem("role", res.role);
      localStorage.setItem("email", formData.email);

<<<<<<< HEAD
      // ── Role-specific keys + navigate ──
      if (res.role === "STUDENT") {
        localStorage.setItem("studentId", res.student_id);
        localStorage.setItem("name", res.name);
        localStorage.setItem("full_name", res.full_name || res.name);
        navigate("/dashboard");

      } else if (res.role === "FACULTY") {
        // Faculty collection stores name as "name" field directly
        localStorage.setItem("name", res.name);         // ← "Deepa", "John"
        localStorage.setItem("full_name", res.name);    // ← same value, both keys set
        localStorage.setItem("department", res.department);
        navigate("/faculty-dashboard");

      } else if (res.role === "TPO") {
        // TPO stored in users collection under profile.full_name
        localStorage.setItem("full_name", res.full_name || res.name);
        navigate("/tpo-dashboard");
=======
      if (res.role === "STUDENT") {
        localStorage.setItem("studentId", res.student_id);
        localStorage.setItem("name", res.name);
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3
      }

      setIsError(false);
      setMessage("Login successful!");

<<<<<<< HEAD
=======
      if (res.role === "STUDENT") navigate("/dashboard");
      else if (res.role === "TPO") navigate("/tpo-dashboard");
      else if (res.role === "FACULTY") navigate("/faculty-dashboard");

>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="login-page">
        <div className="login-inner">

<<<<<<< HEAD
          {/* LEFT: Marketing panel */}
=======
          {/* ── LEFT: Marketing panel ── */}
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3
          <div className="login-left">
            <div className="product-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
              The Organic Professional System
            </div>

            <h1 className="login-headline">
              Welcome back to your career growth system
            </h1>
            <p className="login-subline">
              Practice smarter. Track progress. Get hired faster.
            </p>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="stat-value">10k+</div>
                <div className="stat-label">Interviews Completed</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                  </svg>
                </div>
                <div className="stat-value">
                  <span className="trend">↑</span> 92%
                </div>
                <div className="stat-label">Confidence Growth</div>
              </div>

              <div className="stat-card wide">
                <div className="trusted-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  Trusted by Students
                </div>
                <div className="avatar-row">
                  {["AK", "SR", "PM", "NJ"].map((initials, i) => (
                    <div key={i} className="avatar">{initials}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

<<<<<<< HEAD
          {/* RIGHT: Login card */}
=======
          {/* ── RIGHT: Login card ── */}
>>>>>>> 1128f544807103466a5362f40fb7dd72549680f3
          <div className="login-card">
            <div className="card-brand">
              <div className="brand-dot" />
              AI Mock Interview
            </div>

            <h2 className="card-title">Login to Continue</h2>
            <p className="card-desc">
              Access your dashboard and continue your interview preparation.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <div>
                  <label className="field-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    className="field-input"
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="field-label" htmlFor="password">Password</label>
                  <div className="password-wrapper">
                    <input
                      id="password"
                      className="field-input"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      autoComplete="current-password"
                      style={{ paddingRight: "40px" }}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="forgot-link"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>

              <button
                type="submit"
                className={`login-btn${loading ? " loading" : ""}`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {message && (
              <p className={`message ${isError ? "error" : "success"}`}>
                {message}
              </p>
            )}

            <div className="signup-row">
              New here?{" "}
              <button type="button" className="signup-link" onClick={() => navigate("/register")}>
                Create account
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="login-footer">
        <span>© 2024 AI Mock Interview. The Organic Professional System.</span>
        <span>
          <a href="/privacy">Privacy Policy</a>
          &nbsp;&nbsp;
          <a href="/terms">Terms of Service</a>
        </span>
      </footer>
    </>
  );
}

export default Login;