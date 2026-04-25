import { useState } from "react";
import axios from "axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .faculty-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'DM Sans', sans-serif;
    background: #eef0e8;
  }

  /* TOP BAR */
  .faculty-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 32px;
    background: transparent;
  }
  .topbar-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 16px;
    border: 1px solid rgba(45,122,58,0.35);
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #2d5c38;
    background: rgba(255,255,255,0.6);
  }
  .topbar-badge-dot { color: #4db862; font-size: 12px; }
  .topbar-stats {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 18px;
    background: rgba(255,255,255,0.65);
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #999;
  }
  .topbar-stats strong { color: #2d7a3a; }
  .topbar-stats-divider { color: #ccc; }

  /* MAIN LAYOUT */
  .faculty-main {
    flex: 1;
    display: flex;
    gap: 0;
  }

  /* LEFT */
  .faculty-left {
    width: 500px;
    min-width: 360px;
    background: #1a3320;
    padding: 44px 44px 0;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }
  .faculty-left::after {
    content: '';
    position: absolute;
    bottom: -60px; left: -60px;
    width: 260px; height: 260px;
    border-radius: 50%;
    background: rgba(77,184,98,0.05);
    pointer-events: none;
  }
  .left-headline {
    font-family: 'Instrument Serif', serif;
    font-size: 2.7rem;
    font-weight: 400;
    color: #fff;
    line-height: 1.12;
    margin-bottom: 20px;
  }
  .left-desc {
    font-size: 14px;
    color: rgba(255,255,255,0.55);
    line-height: 1.7;
    margin-bottom: 36px;
  }
  .left-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 44px;
  }
  .left-features li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    color: rgba(255,255,255,0.8);
  }
  .feat-check {
    width: 20px; height: 20px;
    border-radius: 6px;
    border: 1.5px solid rgba(77,184,98,0.5);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    color: #4db862;
  }
  .feat-check svg { width: 11px; height: 11px; }

  /* Compass/clock mockup */
  .left-mockup {
    margin-top: auto;
    border-radius: 16px 16px 0 0;
    background: #0f1f15;
    border: 1px solid rgba(255,255,255,0.08);
    border-bottom: none;
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 220px;
    position: relative;
    overflow: hidden;
  }
  .compass-ring {
    position: relative;
    width: 140px;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .compass-ring::before,
  .compass-ring::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.08);
  }
  .compass-ring::before { inset: 0; }
  .compass-ring::after { inset: 16px; }
  .compass-inner {
    width: 80px; height: 80px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.12);
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .compass-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
  }
  .compass-needle {
    position: absolute;
    bottom: 50%; left: 50%;
    transform-origin: bottom center;
    transform: translateX(-50%) rotate(-30deg);
    width: 1.5px;
    height: 36px;
    background: linear-gradient(to top, rgba(255,255,255,0.6), transparent);
    border-radius: 2px;
  }
  .mockup-label {
    margin-top: 16px;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    font-weight: 600;
  }

  /* RIGHT */
  .faculty-right {
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 24px 40px 40px;
    background: #eef0e8;
  }
  .faculty-card {
    background: #fff;
    border-radius: 20px;
    padding: 40px 44px 36px;
    width: 100%;
    max-width: 700px;
    box-shadow: 0 4px 40px rgba(0,0,0,0.07);
  }
  .card-brand {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    font-weight: 600;
    color: #555;
    margin-bottom: 10px;
    letter-spacing: 0.01em;
  }
  .brand-dot { width: 8px; height: 8px; border-radius: 50%; background: #4db862; }
  .card-title {
    font-family: ' Serif', serif;
    font-size: 3rem;
    font-weight: 400;
    color: #111;
    margin-bottom: 6px;
  }
  .card-subtitle {
    font-size: 14px;
    color: #888;
    margin-bottom: 28px;
    line-height: 1.5;
  }

  /* FORM */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px 18px;
    margin-bottom: 14px;
  }
  .form-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .form-field.full { grid-column: 1 / -1; }
  .form-label {
    font-size: 13px;
    font-weight: 500;
    color: #444;
  }
  .form-input {
    padding: 11px 14px;
    border: 1.5px solid #e8e8e8;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #222;
    background: #fff;
    outline: none;
    transition: border-color 0.15s;
    width: 100%;
  }
  .form-input::placeholder { color: #bbb; }
  .form-input:focus { border-color: #4db862; }
  textarea.form-input {
    resize: vertical;
    min-height: 90px;
    line-height: 1.6;
  }

  /* MENTORSHIP CARD */
  .mentorship-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 18px;
    border: 1.5px solid #e8e8e8;
    border-radius: 12px;
    margin-bottom: 14px;
    cursor: pointer;
    transition: border-color 0.15s;
    background: #fafafa;
  }
  .mentorship-card:hover { border-color: #4db862; }
  .mentorship-icon {
    width: 40px; height: 40px;
    border-radius: 10px;
    background: #e8f5e9;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-size: 18px;
  }
  .mentorship-text { flex: 1; }
  .mentorship-title {
    font-size: 14px;
    font-weight: 600;
    color: #222;
    margin-bottom: 2px;
  }
  .mentorship-desc {
    font-size: 12px;
    color: #999;
    line-height: 1.4;
  }
  .mentorship-checkbox {
    width: 18px; height: 18px;
    border: 1.5px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    appearance: none;
    flex-shrink: 0;
    transition: all 0.15s;
    position: relative;
  }
  .mentorship-checkbox:checked {
    background: #2d7a3a;
    border-color: #2d7a3a;
  }
  .mentorship-checkbox:checked::after {
    content: '';
    position: absolute;
    left: 4px; top: 1px;
    width: 5px; height: 9px;
    border: 2px solid #fff;
    border-top: none; border-left: none;
    transform: rotate(45deg);
  }

  /* SUBMIT */
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
    margin-bottom: 14px;
    margin-top: 8px;
  }
  .submit-btn:hover { background: #2d5c3a; }
  .submit-btn svg { width: 16px; height: 16px; }

  .login-hint {
    text-align: center;
    font-size: 14px;
    color: #999;
  }
  .login-hint a {
    color: #2d7a3a;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
  }
  .login-hint a:hover { text-decoration: underline; }

  /* FOOTER */
  .faculty-footer {
    text-align: center;
    padding: 20px 40px;
    display: flex;
    justify-content: center;
    gap: 32px;
  }
  .footer-link {
    font-size: 13px;
    color: #888;
    cursor: pointer;
    text-decoration: none;
  }
  .footer-link:hover { color: #2d7a3a; }
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

const INITIAL = {
  name: "", email: "", password: "", phone: "",
  department: "", designation: "", qualification: "",
  specialization: "", subjects: "", expertise: "",
  experience_years: "", mentorship_available: false, bio: ""
};

function FacultySignup() {
  const [facultyData, setFacultyData] = useState(INITIAL);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFacultyData({ ...facultyData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/faculty/signup", facultyData);
      alert(res.data.message);
      setFacultyData(INITIAL);
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="faculty-page">
        {/* Top bar */}
        <div className="faculty-topbar">
          <div className="topbar-badge">
            <span className="topbar-badge-dot">✦</span>
            Educator Network Access
          </div>
          <div className="topbar-stats">
            USED BY: <strong>200+ FACULTY MEMBERS</strong>
            <span className="topbar-stats-divider">|</span>
            150+ COLLEGES
            <span className="topbar-stats-divider">|</span>
            5000+ STUDENTS
          </div>
        </div>

        <div className="faculty-main">
          {/* LEFT */}
          <div className="faculty-left">
            <h1 className="left-headline">Guide Students Toward Placement Success</h1>
            <p className="left-desc">
              Join as faculty mentor to track student growth, provide guidance, and strengthen placement outcomes through AI insights.
            </p>
            <ul className="left-features">
              {["Student performance tracking", "Mentorship tools", "Skill gap analytics", "Placement readiness reports"].map(f => (
                <li key={f}>
                  <div className="feat-check"><CheckIcon /></div>
                  {f}
                </li>
              ))}
            </ul>

            {/* Compass mockup */}
            <div className="left-mockup">
              <div className="compass-ring">
                <div className="compass-inner">
                  <div className="compass-dot" />
                  <div className="compass-needle" />
                </div>
              </div>
              <div className="mockup-label">Academic Mentorship</div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="faculty-right">
            <div className="faculty-card">
              <div className="card-brand">
                <div className="brand-dot" />
                AI Placement PreP
              </div>
              <h2 className="card-title">Faculty Signup</h2>
              <p className="card-subtitle">Create your faculty mentor account to begin guiding your students.</p>

              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-field">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" type="text" name="name" placeholder="Dr. Sarah Jenkins" value={facultyData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Email Address</label>
                    <input className="form-input" type="email" name="email" placeholder="sarah.jenkins@university.edu" value={facultyData.email} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Password</label>
                    <input className="form-input" type="password" name="password" placeholder="••••••••" value={facultyData.password} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" type="text" name="phone" placeholder="+1 (555) 000-0000" value={facultyData.phone} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Department</label>
                    <input className="form-input" type="text" name="department" placeholder="Computer Science & Engineering" value={facultyData.department} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Designation</label>
                    <input className="form-input" type="text" name="designation" placeholder="Associate Professor" value={facultyData.designation} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Highest Qualification</label>
                    <input className="form-input" type="text" name="qualification" placeholder="PhD in Computer Science" value={facultyData.qualification} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Years of Experience</label>
                    <input className="form-input" type="number" name="experience_years" placeholder="10" value={facultyData.experience_years} onChange={handleChange} />
                  </div>
                  <div className="form-field full">
                    <label className="form-label">Specialization</label>
                    <input className="form-input" type="text" name="specialization" placeholder="Machine Learning, Data Structures" value={facultyData.specialization} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Subjects Teaching</label>
                    <input className="form-input" type="text" name="subjects" placeholder="Advanced Algorithms, DBMS" value={facultyData.subjects} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Areas of Expertise</label>
                    <input className="form-input" type="text" name="expertise" placeholder="Placement Readiness, Technical" value={facultyData.expertise} onChange={handleChange} />
                  </div>
                </div>

                {/* Mentorship toggle card */}
                <label className="mentorship-card" htmlFor="mentorship_available">
                  <div className="mentorship-icon">👥</div>
                  <div className="mentorship-text">
                    <div className="mentorship-title">Available for Mentorship</div>
                    <div className="mentorship-desc">Check this to allow students to request guidance sessions.</div>
                  </div>
                  <input
                    className="mentorship-checkbox"
                    type="checkbox"
                    id="mentorship_available"
                    name="mentorship_available"
                    checked={facultyData.mentorship_available}
                    onChange={handleChange}
                  />
                </label>

                <div className="form-field" style={{ marginBottom: "0" }}>
                  <label className="form-label">Short Bio</label>
                  <textarea
                    className="form-input"
                    name="bio"
                    placeholder="Tell us about your teaching philosophy and how you help students succeed..."
                    value={facultyData.bio}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Create Faculty Account <ArrowIcon />
                </button>
              </form>

              <p className="login-hint">Already have an account? <a href="/login">Login</a></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="faculty-footer">
          <a className="footer-link" href="#">Privacy Policy</a>
          <a className="footer-link" href="#">Faculty Handbook</a>
          <a className="footer-link" href="#">Contact Support</a>
        </footer>
      </div>
    </>
  );
}

export default FacultySignup;