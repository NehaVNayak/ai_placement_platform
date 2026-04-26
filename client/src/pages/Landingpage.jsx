import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const G = {
  dk: "#1a3a1a",
  mid: "#27ae60",
  navBg: "#1a3a1a",
  soft: "#3b6d11",
  lt: "#eaf3de",
  bd: "#c0dd97",
  mu: "#6b8f6b",
  bg: "#f0f4eb",
  white: "#fff",
};

const IcoBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const IcoSettings = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const IcoArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IcoCode = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IcoHR = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const STEPS = [
  {
    num: "01",
    title: "Choose your track",
    body: "Select from Technical, HR, or Mixed interview modes tailored to your target role and company.",
  },
  {
    num: "02",
    title: "Practice with AI",
    body: "Answer real interview questions while our AI evaluates your content, confidence, and communication in real time.",
  },
  {
    num: "03",
    title: "Get deep feedback",
    body: "Receive a detailed scorecard: clarity, structure, pacing, filler words, and improvement tips after every session.",
  },
  {
    num: "04",
    title: "Track your growth",
    body: "Watch your performance metrics improve session over session. Export reports to share with career coaches.",
  },
];

export default function LandingPage() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  const [visibleSteps, setVisibleSteps] = useState([]);
  const stepsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            STEPS.forEach((_, i) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...new Set([...prev, i])]);
              }, i * 180);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    if (stepsRef.current) observer.observe(stepsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{
      background: G.bg,
      minHeight: "100vh",
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes badgePulse { 0%,100%{box-shadow:0 0 0 0 rgba(39,174,96,0.3)} 50%{box-shadow:0 0 0 8px rgba(39,174,96,0)} }
        .hero-title { animation: fadeUp 0.5s ease both; }
        .hero-sub   { animation: fadeUp 0.5s ease 0.1s both; }
        .hero-btn   { animation: fadeUp 0.5s ease 0.2s both; }
        .cat-card { transition: all 0.2s ease; }
        .cat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(26,58,26,0.13); border-color: #27ae60 !important; }
        .nav-btn { transition: color 0.13s, border-color 0.13s; }
        .nav-btn:hover { color: #a8e6bf !important; }
        .cta-btn { transition: transform 0.15s, box-shadow 0.15s; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(39,174,96,0.35); }
        .link-btn { transition: color 0.13s; }
        .link-btn:hover { color: #27ae60 !important; }

        @keyframes circlePop {
          0%   { transform: scale(0.5); opacity: 0; }
          70%  { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes numFlip {
          0%   { opacity: 0; transform: rotateX(-90deg); }
          100% { opacity: 1; transform: rotateX(0deg); }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(39,174,96,0.35); }
          50%      { box-shadow: 0 0 0 10px rgba(39,174,96,0); }
        }

        .step-card {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.55s ease, transform 0.55s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .step-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .step-card:hover {
          border-color: #27ae60 !important;
          box-shadow: 0 12px 36px rgba(26,58,26,0.12);
          transform: translateY(-5px) !important;
        }
        .step-circle {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .step-card:hover .step-circle {
          transform: scale(1.1);
          box-shadow: 0 0 0 6px rgba(39,174,96,0.12);
        }
        .active-circle {
          animation: glowPulse 2.2s infinite;
        }
      `}</style>

      {/* ══ NAVBAR ══ */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 200,
        background: G.navBg,
        height: 60, padding: "0 48px",
        display: "flex", alignItems: "center",
        boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginRight: 52 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: G.mid }} />
          <span style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px" }}>AI Mock Interview</span>
        </div>
        <div style={{ flex: 1 }} />
        <button className="nav-btn" onClick={() => navigate("/Dashboard")} style={{
          background: "none", border: "1.5px solid transparent",
          color: "#fff", fontSize: 13, fontWeight: 800,
          cursor: "pointer", fontFamily: "inherit",
          padding: "6px 18px", borderRadius: 14,
        }}>
          Dashboard
        </button>
      </nav>

      {/* ══ HERO ══ */}
      <section style={{
        flex: "0 0 auto",
        background: G.bg,
        padding: "80px 48px 64px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "#fff", border: `1.5px solid ${G.bd}`,
          borderRadius: 20, padding: "6px 18px", marginBottom: 32,
          animation: "badgePulse 2.5s infinite",
        }}>
          <span style={{ color: G.mid, fontSize: 14 }}>✦</span>
          <span style={{ fontSize: 11, fontWeight: 800, color: G.soft, letterSpacing: "1.2px", textTransform: "uppercase" }}>The Organic Professional System</span>
        </div>

        <h1 className="hero-title" style={{
          fontSize: "clamp(36px, 5vw, 62px)",
          fontWeight: 900, color: G.dk,
          lineHeight: 1.15, letterSpacing: "-1.5px",
          maxWidth: 700, marginBottom: 18,
        }}>
          Master your presence with{" "}
          <span style={{ color: G.mid }}>AI Mock Interview</span>
        </h1>

        <p className="hero-sub" style={{
          fontSize: 17, color: G.mu, maxWidth: 520,
          lineHeight: 1.7, marginBottom: 40,
        }}>
          Practice. Improve. Get Hired. Experience the most advanced AI-powered career coach
          designed to reduce anxiety and build true professional confidence.
        </p>

        <button className="cta-btn hero-btn" onClick={() => navigate("/interview")} style={{
          background: G.dk, color: "#fff",
          border: "none", borderRadius: 14,
          padding: "18px 44px",
          fontSize: 16, fontWeight: 800,
          cursor: "pointer", fontFamily: "inherit",
          letterSpacing: "-0.2px",
          display: "inline-flex", alignItems: "center", gap: 10,
        }}>
          Start Your First Session
          <span style={{ background: G.mid, borderRadius: "50%", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IcoArrow />
          </span>
        </button>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section ref={stepsRef} style={{
        padding: "0 48px 72px",
        maxWidth: 1100,
        margin: "0 auto",
        width: "100%",
      }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{
            fontSize: 11, fontWeight: 800, color: G.mid,
            letterSpacing: "1.8px", textTransform: "uppercase", marginBottom: 12,
          }}>
            THE PROCESS
          </div>
          <h2 style={{
            fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 900,
            color: G.dk, letterSpacing: "-1px",
          }}>
            From zero to interview-ready in 4 steps
          </h2>
        </div>

        {/* Steps */}
        <div style={{ position: "relative" }}>
          {/* Animated connector line */}
          <div style={{
            position: "absolute",
            top: 36,
            left: "calc(12.5% + 4px)",
            right: "calc(12.5% + 4px)",
            height: 2,
            background: `linear-gradient(to right, ${G.mid}, ${G.bd})`,
            zIndex: 0,
            transformOrigin: "left center",
            transform: visibleSteps.length > 0 ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.9s ease 0.3s",
          }} />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            position: "relative",
            zIndex: 1,
          }}>
            {STEPS.map(({ num, title, body }, i) => {
              const isVisible = visibleSteps.includes(i);
              const isFirst = i === 0;
              return (
                <div
                  key={num}
                  className={`step-card${isVisible ? " visible" : ""}`}
                  style={{
                    background: "#fff",
                    border: `1.5px solid ${G.bd}`,
                    borderRadius: 20,
                    padding: "36px 24px 32px",
                    textAlign: "center",
                    transitionDelay: `${i * 0.12}s`,
                  }}
                >
                  {/* Animated circle */}
                  <div
                    className={`step-circle${isFirst ? " active-circle" : ""}`}
                    style={{
                      width: 72, height: 72, borderRadius: "50%",
                      background: isFirst ? G.mid : G.lt,
                      border: `2px solid ${isFirst ? G.mid : G.bd}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 28px",
                      position: "relative",
                      animation: isVisible
                        ? `circlePop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.12 + 0.05}s both`
                        : "none",
                    }}
                  >
                    {/* Subtle inner ring on non-primary */}
                    {!isFirst && (
                      <div style={{
                        position: "absolute", inset: 5,
                        borderRadius: "50%",
                        border: `1px dashed ${G.bd}`,
                      }} />
                    )}
                    <span style={{
                      fontSize: 15, fontWeight: 900,
                      color: isFirst ? "#fff" : G.soft,
                      animation: isVisible
                        ? `numFlip 0.4s ease ${i * 0.12 + 0.25}s both`
                        : "none",
                      display: "block",
                    }}>
                      {num}
                    </span>
                  </div>

                  <div style={{ fontSize: 16, fontWeight: 800, color: G.dk, marginBottom: 10, lineHeight: 1.3 }}>
                    {title}
                  </div>

                  <p style={{ fontSize: 13, color: G.mu, lineHeight: 1.75 }}>
                    {body}
                  </p>

                  {/* Bottom dot indicator */}
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: isFirst ? G.mid : G.bd,
                    margin: "20px auto 0",
                  }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ SOCIAL PROOF SECTION ══ */}
      {/* <section style={{
        padding: "0 48px 64px",
        display: "grid",
        gridTemplateColumns: "1fr 420px",
        gap: 24,
        maxWidth: 1100,
        margin: "0 auto",
        width: "100%",
      }}>
        <div style={{
          background: G.dk,
          borderRadius: 22,
          padding: "48px 40px",
          position: "relative",
          overflow: "hidden",
          minHeight: 280,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 80% 20%, rgba(39,174,96,0.18) 0%, transparent 60%)",
          }} />
          <div style={{
            position: "absolute", top: 20, right: 20,
            width: 100, height: 100,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }} />
          <div style={{ position: "relative" }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", lineHeight: 1.3, marginBottom: 12 }}>
              Designed for the world's most ambitious candidates.
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
              Join 50,000+ professionals who landed roles at top-tier technology and finance firms.
            </p>
          </div>
        </div>

        <div style={{
          background: G.mid,
          borderRadius: 22,
          padding: "48px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 72, fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: 8 }}>92%</div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.8)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 16 }}>Success Rate</div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: 260 }}>
            Users report increased confidence after just 3 mock sessions.
          </p>
        </div>
      </section> */}

      {/* ══ FOOTER ══ */}
      <footer style={{
        background: G.navBg,
        padding: "28px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "auto",
      }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 4 }}>AI Mock Interview</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>© 2026 AI Mock Interview. The Organic Professional System.</div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Support"].map(link => (
            <a key={link} href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
            >{link}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}