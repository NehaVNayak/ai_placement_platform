import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  Cell
} from "recharts";

const IcoHome    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IcoRefresh = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.83"/></svg>;
const IcoCheck   = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoWarn    = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const IcoPlay    = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const IcoEye     = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;

const G = {
  dk: "#1a3a1a", mid: "#27ae60", navBg: "#1a3a1a",
  soft: "#3b6d11", lt: "#eaf3de", bd: "#e0eed0",
  mu: "#5a8a5a", bg: "#f0f4eb",
};

/* ── hooks ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCountUp(target, duration = 1200, delay = 0, active = true) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(ease * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay, active]);
  return val;
}

/* ── Score ring with animated stroke + counter ── */
function ScoreRing({ score }) {
  const r = 52, circ = 2 * Math.PI * r;
  const pct = Math.round(score);
  const [ref, inView] = useInView();
  const animated = useCountUp(pct, 1400, 200, inView);
  const dash = circ * (animated / 100);
  const color = pct >= 70 ? "#27ae60" : pct >= 50 ? "#f0ad4e" : "#e74c3c";
  return (
    <svg ref={ref} width="130" height="130" viewBox="0 0 130 130">
      <circle cx="65" cy="65" r={r} fill="none" stroke="#e8f0e8" strokeWidth="10"/>
      <circle cx="65" cy="65" r={r} fill="none" stroke={color} strokeWidth="10"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={circ * 0.25} strokeLinecap="round"/>
      <text x="65" y="58" textAnchor="middle" fontSize="30" fontWeight="800" fill="#1a3a1a">{animated}%</text>
      <text x="65" y="76" textAnchor="middle" fontSize="11" fill="#5a8a5a" letterSpacing="0.5">overall</text>
    </svg>
  );
}

/* ── Stat card with count-up + bar animation ── */
function StatCard({ label, value, color = G.mid, delay = 0 }) {
  const [ref, inView] = useInView();
  const pct = Math.round(value);
  const animated = useCountUp(pct, 1200, delay, inView);
  return (
    <div ref={ref} className="card-hover" style={{
      background: "#fff", border: "1.5px solid #c1ddcd", borderRadius: 14,
      padding: "18px 20px", textAlign: "center",
      boxShadow: "0 0 0 2px rgba(39,174,96,0.10), 0 4px 14px rgba(39,174,96,0.08)",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms,
                   box-shadow 0.2s, border-color 0.2s`,
    }}>
      <div style={{ fontSize: 32, fontWeight: 900, color, lineHeight: 1, marginBottom: 3 }}>{animated}%</div>
      <div style={{ fontSize: 10, fontWeight: 700, color: G.mu, textTransform: "uppercase", letterSpacing: "0.7px" }}>{label}</div>
      <div style={{ marginTop: 10, height: 4, background: "#eaf3de", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: 4, background: color, borderRadius: 2,
          width: inView ? `${pct}%` : "0%",
          transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay + 100}ms`,
        }}/>
      </div>
    </div>
  );
}

/* ── Animated percent bar for the trait panel ── */
function PercentBar({ label, value, color = "#27ae60", delay = 0, inView = false }) {
  const animated = useCountUp(Math.round(value), 1200, delay, inView);
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color }}>{animated}%</span>
      </div>
      <div style={{ height: 7, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: 7, background: color, borderRadius: 4,
          width: inView ? `${Math.round(value)}%` : "0%",
          transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
        }}/>
      </div>
    </div>
  );
}

/* ── Slide-up + fade wrapper triggered by scroll ── */
function FadeSlide({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView(0.06);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `1px solid ${G.bd}`, borderRadius: 9, padding: "9px 14px" }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: G.dk, margin: "0 0 3px" }}>{label}</p>
      <p style={{ fontSize: 13, fontWeight: 800, color: G.mid, margin: 0 }}>{Math.round(payload[0].value)}%</p>
    </div>
  );
};

function getScoreColor(val) {
  return val >= 70 ? G.mid : val >= 50 ? "#f0ad4e" : "#e74c3c";
}

function generateFeedback(r) {
  const comm = r?.evaluation?.communication || 0;
  const tech = r?.evaluation?.technical || 0;
  const conf = r?.evaluation?.confidence || 0;
  const wpm  = r?.voice_details?.speaking_speed_wpm || 0;
  const grammar = r?.evaluation?.grammar;
  const eye = r?.eye;
  const overall = r?.evaluation?.overall_score || 0;
  if (overall >= 80) return `Outstanding answer. Your response was well-structured, technically sound, and delivered with strong confidence. To keep improving, push for even sharper conciseness — aim to make the same impact in 20% fewer words.`;
  if (comm < 50) return `Your answer lacked a clear structure. Try the P-E-I framework: Point (state your answer upfront), Evidence (give a concrete example or fact), Impact (explain why it matters). Practice this until it's automatic.`;
  if (tech < 50) return `The technical depth was insufficient. Interviewers want specifics — name the algorithm, the design pattern, or the metric. Replace vague phrases like "it's efficient" with precise claims like "O(log n) time complexity using binary search."`;
  if (conf < 50) return `Your delivery suggested uncertainty — filler words, hedging phrases ("I think", "maybe", "sort of"), or trailing sentences undermine an otherwise good answer. Record yourself and count filler words; aim for zero in a 2-minute response.`;
  if (wpm > 0 && wpm < 100) return `Your speaking pace of ${Math.round(wpm)} wpm is too slow for an interview setting. Aim for 130–150 wpm to sound natural and engaged.`;
  if (wpm > 175) return `You spoke at ${Math.round(wpm)} wpm — faster than ideal. Deliberately pause after each key point for 1-2 seconds.`;
  if (eye !== "Excellent") return `Eye contact was inconsistent. In video interviews, looking at your camera lens — not your own face on screen — creates the impression of direct eye contact.`;
  if (grammar === "Poor") return `Grammar issues were detected in your response. Practice speaking slowly and forming complete, grammatically correct sentences.`;
  if (comm >= 60 && tech >= 60 && conf >= 60) return `Solid answer across the board. The next level is storytelling: add a brief, memorable detail or analogy that anchors your point.`;
  return `Work on balancing all three dimensions: structure your communication clearly, back claims with technical specifics, and deliver with confidence.`;
}

function generateBullets(data) {
  const avg = (key) => data.reduce((a, b) => a + (b?.evaluation?.[key] || 0), 0) / data.length;
  const bullets = [];
  if (avg("communication") >= 60) bullets.push({ text: "Articulate and well-structured responses.", good: true });
  if (avg("confidence") >= 60) bullets.push({ text: "Consistently confident delivery.", good: true });
  if (data[0]?.eye === "Excellent") bullets.push({ text: "Strong eye contact maintained.", good: true });
  if (avg("communication") < 60) bullets.push({ text: "Improve answer structure with clear framing.", good: false });
  if (avg("technical") < 60) bullets.push({ text: "Deepen technical explanations with examples.", good: false });
  if (avg("confidence") < 60) bullets.push({ text: "Reduce filler words and hesitations.", good: false });
  if (bullets.length === 0) bullets.push({ text: "Great overall performance!", good: true });
  return bullets;
}

function getOverallLabel(score) {
  if (score >= 80) return { title: "Excellent Performance", tier: "Top 10%", level: "Senior Ready", tColor: "#27ae60", lColor: "#185fa5" };
  if (score >= 65) return { title: "Good Performance", tier: "Above Average", level: "Mid Level", tColor: "#f0ad4e", lColor: "#185fa5" };
  if (score >= 45) return { title: "Needs Improvement", tier: "Keep Practicing", level: "Junior Level", tColor: "#e67e22", lColor: "#a05a00" };
  return { title: "Significant Work Needed", tier: "Early Stage", level: "More Practice", tColor: "#e74c3c", lColor: "#a00" };
}

/* ── Trait panel as its own component so hooks work at top level ── */
function TraitPanel({ avgComm, avgTech, avgConf, avgGram, data, cardStyle }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="card-hover" style={{
      background: G.navBg, padding: "24px 22px",
      ...cardStyle,
      border: "1.5px solid #27ae60",
      boxShadow: "0 0 0 2px rgba(39,174,96,0.12), 0 4px 14px rgba(39,174,96,0.10)",
    }}>
      <p style={{ fontSize: 15, fontWeight: 800, color: "#fff", margin: "0 0 18px" }}>Trait Analysis</p>
      <PercentBar label="Communication"   value={avgComm} color={getScoreColor(avgComm)  === G.mid ? "#5cdd78" : getScoreColor(avgComm)}  delay={0}   inView={inView} />
      <PercentBar label="Technical Depth" value={avgTech} color={getScoreColor(avgTech)  === G.mid ? "#5cdd78" : getScoreColor(avgTech)}  delay={130} inView={inView} />
      <PercentBar label="Confidence"      value={avgConf} color={getScoreColor(avgConf)  === G.mid ? "#5cdd78" : getScoreColor(avgConf)}  delay={260} inView={inView} />
      <PercentBar label="Grammar"         value={avgGram} color={getScoreColor(avgGram)  === G.mid ? "#5cdd78" : getScoreColor(avgGram)}  delay={390} inView={inView} />
      {data[0]?.voice_details?.speaking_speed_wpm > 0 && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Avg Speaking Speed</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#5cdd78" }}>
              {Math.round(data.reduce((a, b) => a + (b?.voice_details?.speaking_speed_wpm || 0), 0) / data.length)} wpm
            </span>
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Ideal: 120–150 wpm</div>
        </div>
      )}
    </div>
  );
}

/* ── Mini animated counter for inline use ── */
function AnimCount({ target, delay = 0, style = {} }) {
  const v = useCountUp(target, 900, delay, true);
  return <span style={style}>{v}</span>;
}

export default function ResultPage() {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const [expandedQ, setExpandedQ] = useState(null);

  if (!state || state.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
        <h2 style={{ color: G.dk }}>No results found</h2>
        <button onClick={() => navigate("/")} style={{ background: G.mid, color: "#fff", border: "none", borderRadius: 10, padding: "11px 22px", marginTop: 16, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700 }}>Back to Home</button>
      </div>
    );
  }

  const data = state;
  const avg  = (key) => data.reduce((a, b) => a + (b?.evaluation?.[key] || 0), 0) / data.length;
  const overall  = avg("overall_score");
  const avgComm  = avg("communication");
  const avgTech  = avg("technical");
  const avgConf  = avg("confidence");
  const avgGram  = data.filter(d => d?.evaluation?.grammar === "Good").length / data.length * 100;
  const label    = getOverallLabel(overall);
  const bullets  = generateBullets(data);

  const radarData = [
    { subject: "Communication", A: Math.round(avgComm) },
    { subject: "Technical",     A: Math.round(avgTech) },
    { subject: "Confidence",    A: Math.round(avgConf) },
    { subject: "Grammar",       A: Math.round(avgGram) },
    { subject: "Eye Contact",   A: data[0]?.eye === "Excellent" ? 90 : 50 },
  ];

  const barData = data.map((r, i) => ({
    name: `Q${i + 1}`,
    score: Math.round(r?.evaluation?.overall_score || 0),
  }));

  const cardStyle = {
    border: "1.5px solid #c1ddcd",
    boxShadow: "0 0 0 2px rgba(39,174,96,0.10), 0 4px 14px rgba(39,174,96,0.08)",
    transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
    borderRadius: 16,
  };

  return (
    <div style={{ background: G.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <style>{`
        @keyframes fadeIn  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes popIn   { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }

        .fade-in  { animation: fadeIn  0.4s ease both; }
        .slide-up { animation: slideUp 0.5s ease both; }
        .pop-in   { animation: popIn   0.38s cubic-bezier(0.34,1.56,0.64,1) both; }

        .q-row {
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          cursor: pointer;
          border: 1.5px solid #c1ddcd !important;
          box-shadow: 0 0 0 2px rgba(39,174,96,0.10), 0 4px 14px rgba(39,174,96,0.08);
        }
        .q-row:hover {
          border-color: #27ae60 !important;
          box-shadow: 0 0 0 3px rgba(39,174,96,0.22), 0 8px 28px rgba(39,174,96,0.20) !important;
          transform: translateY(-2px);
        }
        .card-hover { transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
        .card-hover:hover {
          border-color: #27ae60 !important;
          box-shadow: 0 0 0 3px rgba(39,174,96,0.22), 0 8px 28px rgba(39,174,96,0.20) !important;
          transform: translateY(-2px);
        }

        .practice-btn {
          background: linear-gradient(135deg, #27ae60 0%, #1e8449 100%);
          color: #fff; border: none; border-radius: 14px;
          padding: 15px 48px; font-size: 15px; font-weight: 800;
          cursor: pointer; display: inline-flex; align-items: center; gap: 9px;
          letter-spacing: 0.2px;
          box-shadow: 0 6px 24px rgba(39,174,96,0.38), 0 2px 8px rgba(39,174,96,0.20);
          transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
        }
        .practice-btn:hover {
          background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 10px 32px rgba(39,174,96,0.48), 0 4px 12px rgba(39,174,96,0.28);
        }
        .practice-btn:active { transform: translateY(0) scale(1); }
      `}</style>

      {/* ── Nav ── */}
      <nav style={{
        background: G.navBg, padding: "0 40px",
        display: "flex", alignItems: "center", height: 56,
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 18px rgba(0,0,0,0.2)",
      }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: G.mid, boxShadow: "0 0 0 3px rgba(39,174,96,0.22)" }} />
          AI Mock Interview — Results
        </div>
        <div style={{ flex: 1 }} />
        <button onClick={() => navigate("/")} style={{
          background: G.mid, color: "#fff", border: "none", borderRadius: 8,
          padding: "6px 18px", fontSize: 11, fontWeight: 700, cursor: "pointer",
          fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6,
          transition: "background 0.2s, transform 0.15s",
        }}>
          <IcoHome /> Home
        </button>
      </nav>

      <div style={{ padding: "28px 40px" }}>

        {/* ── HERO ── */}
        <FadeSlide delay={0}>
          <div className="card-hover" style={{ background: "#fff", borderRadius: 20, ...cardStyle, padding: "32px 40px", marginBottom: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 260px", gap: 40, alignItems: "center" }}>
              <ScoreRing score={overall} />

              <div>
                <h1 className="slide-up" style={{ fontSize: 26, fontWeight: 900, color: G.dk, margin: "0 0 8px", letterSpacing: "-0.5px", animationDelay: "80ms" }}>
                  {label.title}
                </h1>
                <p style={{ fontSize: 14, color: G.mu, margin: "0 0 16px", lineHeight: 1.7, maxWidth: 500 }}>
                  You completed <strong>{data.length}</strong> question{data.length > 1 ? "s" : ""}. Here's your detailed breakdown of communication, technical depth, and confidence.
                </p>
                <div style={{ display: "flex", gap: 9, flexWrap: "wrap", marginBottom: 18 }}>
                  <span className="pop-in" style={{ background: G.lt, color: label.tColor, fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 20, animationDelay: "180ms" }}>{label.tier}</span>
                  <span className="pop-in" style={{ background: "#e8f0ff", color: label.lColor, fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 20, animationDelay: "260ms" }}>{label.level}</span>
                </div>
                <div style={{ display: "flex", gap: 20 }}>
                  {[
                    { l: "Communication", v: avgComm },
                    { l: "Technical",     v: avgTech },
                    { l: "Confidence",    v: avgConf },
                  ].map(({ l, v }, idx) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 22, fontWeight: 900, color: getScoreColor(v) }}>
                        <AnimCount target={Math.round(v)} delay={300 + idx * 120} />%
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: G.mu, textTransform: "uppercase", letterSpacing: "0.5px" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths / Improve */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ background: G.lt, borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: G.soft, marginBottom: 9, textTransform: "uppercase", letterSpacing: "0.7px" }}>✦ Strengths</div>
                  {bullets.filter(b => b.good).slice(0, 3).map((b, i) => (
                    <div key={i} className="fade-in" style={{ display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 5, animationDelay: `${380 + i * 80}ms` }}>
                      <span style={{ color: G.mid, flexShrink: 0, marginTop: 2 }}><IcoCheck /></span>
                      <span style={{ fontSize: 11, color: G.soft, lineHeight: 1.55 }}>{b.text}</span>
                    </div>
                  ))}
                  {bullets.filter(b => b.good).length === 0 && <span style={{ fontSize: 11, color: G.soft }}>No highlights yet.</span>}
                </div>
                <div style={{ background: "#fff8f0", border: "1px solid #ffe5c4", borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: "#a05a00", marginBottom: 9, textTransform: "uppercase", letterSpacing: "0.7px" }}>↗ To Improve</div>
                  {bullets.filter(b => !b.good).slice(0, 3).map((b, i) => (
                    <div key={i} className="fade-in" style={{ display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 5, animationDelay: `${460 + i * 80}ms` }}>
                      <span style={{ color: "#e74c3c", flexShrink: 0, marginTop: 2 }}><IcoWarn /></span>
                      <span style={{ fontSize: 11, color: "#a05a00", lineHeight: 1.55 }}>{b.text}</span>
                    </div>
                  ))}
                  {bullets.filter(b => !b.good).length === 0 && <span style={{ fontSize: 11, color: "#a05a00" }}>No major issues — great job!</span>}
                </div>
              </div>
            </div>
          </div>
        </FadeSlide>

        {/* ── STAT CARDS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Communication",   value: avgComm, color: getScoreColor(avgComm) },
            { label: "Technical Depth", value: avgTech, color: getScoreColor(avgTech) },
            { label: "Confidence",      value: avgConf, color: getScoreColor(avgConf) },
            { label: "Grammar Quality", value: avgGram, color: getScoreColor(avgGram) },
          ].map(({ label, value, color }, i) => (
            <StatCard key={label} label={label} value={value} color={color} delay={i * 90} />
          ))}
        </div>

        {/* ── CHARTS ROW ── */}
        <FadeSlide delay={60}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>

            {/* Radar */}
            <div className="card-hover" style={{ background: "#fff", padding: "24px 20px", ...cardStyle }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: G.dk, margin: "0 0 16px" }}>Skill Radar</p>
              <ResponsiveContainer width="100%" height={230}>
                <RadarChart data={radarData} margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
                  <PolarGrid stroke="#e0ece0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: G.mu, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9, fill: "#aaa" }} tickCount={3} />
                  <Radar dataKey="A" stroke={G.mid} fill={G.mid} fillOpacity={0.2} strokeWidth={2}
                    isAnimationActive animationBegin={300} animationDuration={1100} animationEasing="ease-out" />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Bar chart */}
            <div className="card-hover" style={{ background: "#fff", padding: "24px 20px", ...cardStyle }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: G.dk, margin: "0 0 16px" }}>Score Per Question</p>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={barData} margin={{ top: 8, right: 8, bottom: 8, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f4eb" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: G.mu }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#aaa" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f5faf0" }} />
                  <Bar dataKey="score" radius={[5, 5, 0, 0]}
                    isAnimationActive animationBegin={200} animationDuration={900} animationEasing="ease-out">
                    {barData.map((entry, i) => <Cell key={i} fill={getScoreColor(entry.score)} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Trait analysis */}
            <TraitPanel avgComm={avgComm} avgTech={avgTech} avgConf={avgConf} avgGram={avgGram} data={data} cardStyle={cardStyle} />
          </div>
        </FadeSlide>

        {/* ── QUESTION BREAKDOWN ── */}
        <FadeSlide delay={40}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <p style={{ fontSize: 18, fontWeight: 800, color: G.dk, margin: 0 }}>Question-by-Question Breakdown</p>
              <span style={{ fontSize: 11, color: G.mu }}>Click any question to expand</span>
            </div>

            {data.map((r, i) => {
              const comm = Math.round(r?.evaluation?.communication || 0);
              const tech = Math.round(r?.evaluation?.technical || 0);
              const conf = Math.round(r?.evaluation?.confidence || 0);
              const qs   = Math.round(r?.evaluation?.overall_score || 0);
              const isExpanded = expandedQ === i;
              const scoreColor = getScoreColor(qs);

              return (
                <div key={i} className="q-row" style={{
                  background: "#fff", borderRadius: 14, padding: 0,
                  marginBottom: 10, overflow: "hidden",
                  animation: `slideUp 0.45s ease ${i * 55}ms both`,
                  ...(isExpanded ? { boxShadow: "0 0 0 3px rgba(39,174,96,0.22), 0 8px 28px rgba(39,174,96,0.18)" } : {}),
                }}>
                  {/* Summary row */}
                  <div onClick={() => setExpandedQ(isExpanded ? null : i)}
                    style={{ padding: "16px 24px", display: "grid", gridTemplateColumns: "36px 1fr 180px 100px 100px 100px 90px", gap: 16, alignItems: "center" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: isExpanded ? G.dk : G.lt, color: isExpanded ? "#fff" : G.soft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, transition: "background 0.2s, color 0.2s" }}>
                      {i + 1}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: G.dk, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r?.question}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 5, background: "#e8f0e8", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: 5, background: scoreColor, borderRadius: 3, width: `${qs}%`, transition: "width 0.9s ease" }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 800, color: scoreColor, flexShrink: 0 }}>{qs}%</span>
                    </div>
                    {[{ v: comm, l: "Comm" }, { v: tech, l: "Tech" }, { v: conf, l: "Conf" }].map(({ v, l }) => (
                      <div key={l} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: getScoreColor(v) }}>{v}%</div>
                        <div style={{ fontSize: 9, fontWeight: 600, color: G.mu, textTransform: "uppercase" }}>{l}</div>
                      </div>
                    ))}
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: 11, color: isExpanded ? G.mid : G.mu, fontWeight: 600, transition: "color 0.2s" }}>
                        {isExpanded ? "▲ Collapse" : "▼ Expand"}
                      </span>
                    </div>
                  </div>

                  {/* Expanded */}
                  {isExpanded && (
                    <div className="fade-in" style={{ borderTop: `1px solid ${G.bd}`, padding: "20px 24px", display: "grid", gridTemplateColumns: "280px 1fr", gap: 28 }}>
                      <div style={{ borderRadius: 12, overflow: "hidden", background: "#1a2e1a", position: "relative" }}>
                        {r?.video
                          ? <video src={r.video} controls style={{ width: "100%", display: "block" }} />
                          : <div style={{ width: "100%", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", color: "#5a8a5a", fontSize: 32 }}>🎬</div>
                        }
                        <div style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,0.75)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6, display: "flex", alignItems: "center", gap: 4 }}>
                          <IcoPlay /> Q{i + 1}
                        </div>
                      </div>

                      <div>
                        {/* Score mini cards */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 18 }}>
                          {[
                            { label: "Communication", val: comm },
                            { label: "Technical Depth", val: tech },
                            { label: "Confidence", val: conf },
                          ].map(({ label, val }, idx) => (
                            <div key={label} className="pop-in" style={{ background: G.bg, borderRadius: 10, padding: "14px 16px", textAlign: "center", animationDelay: `${idx * 70}ms` }}>
                              <div style={{ fontSize: 28, fontWeight: 900, color: getScoreColor(val), marginBottom: 2 }}>
                                <AnimCount target={val} delay={idx * 70} />%
                              </div>
                              <div style={{ fontSize: 10, fontWeight: 700, color: G.mu, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Badges */}
                        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 16 }}>
                          {[
                            { bg: r?.eye === "Excellent" ? "#e8f5e9" : "#fff8ec", col: r?.eye === "Excellent" ? G.soft : "#a05a00", bd: r?.eye === "Excellent" ? G.bd : "#fde8b8", text: `Eye contact: ${r?.eye === "Excellent" ? "Excellent" : "Needs work"}`, icon: <IcoEye /> },
                            ...(r?.voice_details?.speaking_speed_wpm > 0 ? [{ bg: "#e8eeff", col: "#185fa5", bd: "#b8caff", text: `${Math.round(r.voice_details.speaking_speed_wpm)} wpm` }] : []),
                            ...(r?.voice_details?.duration_sec > 0 ? [{ bg: "#f5f5f5", col: "#666", bd: "#e0e0e0", text: `${Math.round(r.voice_details.duration_sec)}s duration` }] : []),
                            { bg: r?.evaluation?.grammar === "Good" ? "#e8f5e9" : "#fff8ec", col: r?.evaluation?.grammar === "Good" ? G.soft : "#a05a00", bd: r?.evaluation?.grammar === "Good" ? G.bd : "#fde8b8", text: `Grammar: ${r?.evaluation?.grammar || "N/A"}` },
                          ].map((b, idx) => (
                            <span key={idx} className="pop-in" style={{ background: b.bg, color: b.col, fontSize: 10, fontWeight: 700, padding: "3px 11px", borderRadius: 18, border: `1px solid ${b.bd}`, display: "flex", alignItems: "center", gap: 4, animationDelay: `${idx * 55}ms` }}>
                              {b.icon} {b.text}
                            </span>
                          ))}
                        </div>

                        {/* AI Feedback */}
                        <div className="slide-up" style={{ background: G.lt, border: `1.5px solid ${G.bd}`, boxShadow: "0 6px 16px rgba(0,0,0,0.05)", borderRadius: 10, padding: "14px 16px", animationDelay: "160ms" }}>
                          <div style={{ fontSize: 10, fontWeight: 800, color: G.soft, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.7px" }}>AI Coach Feedback</div>
                          <p style={{ fontSize: 13, color: G.dk, lineHeight: 1.65, margin: 0 }}>{generateFeedback(r)}</p>
                        </div>

                        {r?.transcript && (
                          <div className="slide-up" style={{ marginTop: 12, background: "#f8f8f8", border: "1px solid #e0e0e0", borderRadius: 10, padding: "12px 14px", animationDelay: "240ms" }}>
                            <div style={{ fontSize: 10, fontWeight: 800, color: "#666", marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.7px" }}>Your Answer (Transcript)</div>
                            <p style={{ fontSize: 12, color: "#444", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>"{r.transcript}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </FadeSlide>

        {/* ── COACH + PRACTICE AGAIN ── */}
        <FadeSlide delay={50}>
          <div style={{ marginBottom: 40 }}>
            {/* Coach card */}
            <div className="card-hover" style={{ background: "#fff", padding: "24px 28px", ...cardStyle, marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: G.lt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: G.dk }}>Coach Alex's Personalized Advice</div>
                  <div style={{ fontSize: 11, color: G.mu }}>Based on your {data.length} recorded answer{data.length > 1 ? "s" : ""}</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {[
                  { title: "Delivery", tips: [
                    "Open with a strong hook tied directly to the question.",
                    "Pause 1–2 seconds after key points to let ideas land.",
                    overall < 60 ? "Practice answering aloud daily for 15 minutes to build fluency." : "Maintain your strong pacing and clarity.",
                  ]},
                  { title: "Visual Presence", tips: [
                    "Position your camera at eye level to project authority.",
                    "Use deliberate, minimal hand gestures when explaining.",
                    data[0]?.eye !== "Excellent" ? "Look directly into the camera lens, not at your own image." : "Your eye contact was excellent — keep it up.",
                  ]},
                ].map(({ title, tips }) => (
                  <div key={title}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: G.mid, marginBottom: 10 }}>● {title}</div>
                    {tips.map((tip, i) => (
                      <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", marginBottom: 8 }}>
                        <span style={{ color: G.mid, flexShrink: 0, marginTop: 3, fontSize: 8 }}>●</span>
                        <span style={{ fontSize: 12, color: "#444", lineHeight: 1.6 }}>{tip}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Practice Again — centred, prominent */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="practice-btn" onClick={() => navigate("/")} style={{ fontFamily: "inherit" }}>
                <IcoRefresh /> Practice Again
              </button>
            </div>
          </div>
        </FadeSlide>

      </div>
    </div>
  );
}