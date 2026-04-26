import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

const IcoMic    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>;
const IcoVol    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>;
const IcoStop   = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>;
const IcoUpload = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>;
const IcoCheck  = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoLeft   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoRight  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>;
const IcoTip    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>;
const IcoHelp   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IcoArrow  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IcoBack   = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoTrash  = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
const IcoRec    = () => <svg width="9" height="9" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#e74c3c"/></svg>;

const IcoTech = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IcoHR = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

function CircularTimer({ seconds, total = 120 }) {
  const r = 24, circ = 2 * Math.PI * r;
  const dash = circ * (seconds / total);
  const low = seconds < 30;
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4"/>
      <circle cx="32" cy="32" r={r} fill="none"
        stroke={low ? "#ff6b6b" : "#5cdd78"} strokeWidth="4"
        strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ * 0.25} strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.5s" }}/>
      <text x="32" y="29" textAnchor="middle" fontSize="11" fontWeight="700" fill={low ? "#ff6b6b" : "#fff"}>{m}:{s}</text>
      <text x="32" y="40" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.45)">left</text>
    </svg>
  );
}

const G = {
  dk: "#0f2415", mid: "#27ae60", navBg: "#0f2415",
  soft: "#2d5a0e", lt: "#eaf3de", bd: "#c0dd97",
  mu: "#5a7a5a", bg: "#f5f8f2"
};
const UPLOAD_IDLE = "idle", UPLOAD_UPLOADING = "uploading", UPLOAD_DONE = "done";

export default function MockInterview() {
  const navigate = useNavigate();
  const [category, setCategory]               = useState(null);
  const [questions, setQuestions]             = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recordings, setRecordings]           = useState({});
  const [selectedRecording, setSelectedRecording] = useState(null);
  const [timer, setTimer]                     = useState(120);
  const [recording, setRecording]             = useState(false);
  const [eyeContact, setEyeContact]           = useState("Detecting");
  const [results, setResults]                 = useState({});
  const [uploadStatus, setUploadStatus]       = useState({});
  const videoRef    = useRef(null);
  const recorderRef = useRef(null);
  const streamRef   = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    try {
      const fm = new FaceMesh({ locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}` });
      fm.setOptions({ maxNumFaces: 1, refineLandmarks: true });
      fm.onResults((r) => setEyeContact(r.multiFaceLandmarks?.length ? "Excellent" : "Not Detected"));
      const cam = new Camera(videoRef.current, { onFrame: async () => { await fm.send({ image: videoRef.current }); }, width: 640, height: 480 });
      cam.start();
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (!recording) return;
    if (timer <= 0) { stopRecording(); return; }
    const t = setTimeout(() => setTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, recording]);

  // Cancel speech immediately and speak new question
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  useEffect(() => {
    if (questions.length > 0) speak(questions[currentQuestion]);
    return () => { window.speechSynthesis.cancel(); }; // Cancel on unmount/change
  }, [currentQuestion, questions]);

  const loadQuestions = async (type) => {
    window.speechSynthesis.cancel();
    const res = await fetch(`http://localhost:8000/api/interview/questions/${type}`);
    const data = await res.json();
    setCategory(type); setQuestions(data.questions); setCurrentQuestion(0); setResults({}); setUploadStatus({});
    speak(data.questions[0]);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    streamRef.current = stream;
    videoRef.current.srcObject = stream;
    const recorder = new MediaRecorder(stream);
    let chunks = [];
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      setRecordings((prev) => {
        const updated = { ...prev };
        const existing = updated[currentQuestion] || [];
        const newRec = { blob, url: URL.createObjectURL(blob), timestamp: new Date() };
        updated[currentQuestion] = [...existing, newRec];
        setSelectedRecording(newRec); // auto-select latest
        return updated;
      });
      setUploadStatus((prev) => ({ ...prev, [currentQuestion]: UPLOAD_IDLE }));
    };
    recorder.start();
    recorderRef.current = recorder;
    setTimer(120); setRecording(true);
  };

  const stopRecording = () => { recorderRef.current?.stop(); setRecording(false); };

  const deleteRecording = (qIdx, rIdx, e) => {
    e.stopPropagation();
    setRecordings((prev) => {
      const updated = { ...prev };
      const list = [...(updated[qIdx] || [])];
      const deleted = list[rIdx];
      list.splice(rIdx, 1);
      updated[qIdx] = list;
      if (selectedRecording === deleted) setSelectedRecording(list[list.length - 1] || null);
      return updated;
    });
  };

  const uploadRecording = async () => {
    if (!(recordings[currentQuestion] || []).length) return alert("Please record first.");
    if (!selectedRecording) return alert("Please select a recording from the list.");
    setUploadStatus((prev) => ({ ...prev, [currentQuestion]: UPLOAD_UPLOADING }));
    try {
      const fd = new FormData();
      fd.append("video", selectedRecording.blob, "answer.webm");
      const res = await fetch("http://localhost:8000/api/interview/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResults((prev) => ({
        ...prev,
        [currentQuestion]: { ...data, question: questions[currentQuestion], video: selectedRecording.url, eye: eyeContact }
      }));
      setUploadStatus((prev) => ({ ...prev, [currentQuestion]: UPLOAD_DONE }));
    } catch {
      alert("Upload failed.");
      setUploadStatus((prev) => ({ ...prev, [currentQuestion]: UPLOAD_IDLE }));
    }
  };

  const submitInterview = () => {
    if (Object.keys(results).length === 0) return alert("Please submit at least one answer before finishing.");
    navigate("/result", { state: Object.values(results) });
  };

  // Navigate to specific question — cancel speech immediately
  const goToQuestion = (idx) => {
    window.speechSynthesis.cancel();
    setCurrentQuestion(idx);
    setSelectedRecording(recordings[idx]?.[recordings[idx].length - 1] || null);
  };

  const nextQ = () => { if (currentQuestion + 1 < questions.length) goToQuestion(currentQuestion + 1); };
  const prevQ = () => { if (currentQuestion > 0) goToQuestion(currentQuestion - 1); };

  const changeInterview = () => {
    window.speechSynthesis.cancel();
    setCategory(null); setQuestions([]); setCurrentQuestion(0);
    setResults({}); setRecordings({}); setSelectedRecording(null); setUploadStatus({});
  };

  const currentUploadStatus = uploadStatus[currentQuestion] || UPLOAD_IDLE;
  const currentRecs = recordings[currentQuestion] || [];

  return (
    <div style={{ background: G.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .screen { animation: fadeUp 0.3s ease; }
        .cat-card { transition: all 0.2s ease; cursor: pointer; position: relative; overflow: hidden; }
        .cat-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(15,36,21,0.1); border-color: #27ae60 !important; }
        .cat-card:hover .cat-icon { background: #27ae60 !important; color: #fff !important; }
        .rec-item { transition: all 0.15s; }
        .rec-item:hover { background: #f3f8ee; }
        .btn-primary:hover:not(:disabled) { background: #0a1a0f !important; }
        .btn-danger:hover:not(:disabled) { background: #c0392b !important; }
        .btn-outline:hover:not(:disabled) { background: #eaf3de !important; }
        .nav-pulse { width: 8px; height: 8px; border-radius: 50%; background: #27ae60; box-shadow: 0 0 0 3px rgba(39,174,96,0.2); animation: pulse 2.5s infinite; }
        .spinner { width: 11px; height: 11px; border: 2px solid rgba(39,174,96,0.2); border-top-color: #27ae60; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
        .q-pill { transition: all 0.18s; cursor: pointer; user-select: none; }
        .q-pill:hover { transform: scale(1.1); }
      `}</style>

      {/* NAV */}
      <nav style={{
        background: G.navBg, height: 56, padding: "0 28px",
        display: "flex", alignItems: "center", gap: 10,
        position: "sticky", top: 0, zIndex: 200,
        boxShadow: "0 1px 0 rgba(255,255,255,0.05), 0 4px 20px rgba(0,0,0,0.25)",
        flexShrink: 0,
      }}>
        <div className="nav-pulse" />
        <span style={{ fontSize: 13, fontWeight: 800, color: "#fff", letterSpacing: "-0.2px" }}>AI Mock Interview</span>
        <div style={{ flex: 1 }} />
        {category && (
          <button onClick={changeInterview} style={{
            background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 600,
            padding: "5px 14px", borderRadius: 7, cursor: "pointer", fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: 5, marginRight: 8,
          }}>
            <IcoBack /> Change Type
          </button>
        )}
        <button onClick={() => navigate("/")} style={{
          background: "#27ae60", color: "#fff", border: "none",
          fontSize: 11, fontWeight: 700, padding: "6px 16px",
          borderRadius: 7, cursor: "pointer", fontFamily: "inherit",
        }}>Home</button>
      </nav>

      {/* CATEGORY SELECT */}
      {!category && (
        <div className="screen" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px" }}>
          <div style={{ maxWidth: 820, width: "100%" }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: G.lt, border: `1px solid ${G.bd}`, borderRadius: 20, padding: "4px 14px", marginBottom: 18 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: G.mid, display: "inline-block" }} />
                <span style={{ fontSize: 10, fontWeight: 800, color: G.soft, letterSpacing: "1.2px", textTransform: "uppercase" }}>Choose your session</span>
              </div>
              <h1 style={{ fontSize: 38, fontWeight: 900, color: G.dk, letterSpacing: "-1px", lineHeight: 1.15, marginBottom: 12 }}>
                What are you preparing for?
              </h1>
              <p style={{ fontSize: 15, color: G.mu, maxWidth: 400, margin: "0 auto", lineHeight: 1.75 }}>
                Select an interview type to get tailored questions and AI-powered evaluation.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { type: "tech", label: "Technical Interview", sub: "Algorithms, data structures, system design, REST APIs, databases, and architecture.", tags: ["DSA", "System Design", "APIs", "OOP"], Icon: IcoTech, count: "15 questions", time: "~30 min", accent: "#e8f5e9" },
                { type: "nontech", label: "HR & Behavioral", sub: "Behavioral, culture-fit, leadership, and situational questions using STAR framework.", tags: ["STAR Method", "Leadership", "Culture Fit"], Icon: IcoHR, count: "15 questions", time: "~25 min", accent: "#f1f8e9" },
              ].map(({ type, label, sub, tags, Icon, count, time, accent }) => (
                <div key={type} className="cat-card" style={{ background: "#fff", border: `2px solid ${G.bd}`, borderRadius: 22, padding: "36px 32px 32px" }} onClick={() => loadQuestions(type)}>
                  <div style={{ position: "absolute", right: -36, top: -36, width: 160, height: 160, borderRadius: "50%", background: accent, opacity: 0.5 }} />
                  <div className="cat-icon" style={{ width: 56, height: 56, background: G.lt, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", color: G.soft, marginBottom: 20, transition: "all 0.2s", position: "relative" }}>
                    <Icon />
                  </div>
                  <div style={{ display: "flex", gap: 7, marginBottom: 12, position: "relative" }}>
                    <span style={{ background: G.lt, color: G.soft, fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20 }}>{count}</span>
                    <span style={{ background: "#fff8ec", color: "#9a5500", fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20, border: "1px solid #fde8b8" }}>{time}</span>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: G.dk, marginBottom: 8, letterSpacing: "-0.3px", position: "relative" }}>{label}</div>
                  <p style={{ fontSize: 13, color: G.mu, lineHeight: 1.7, marginBottom: 20, position: "relative" }}>{sub}</p>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 24, position: "relative" }}>
                    {tags.map(t => <span key={t} style={{ background: "#f5faf0", color: G.soft, fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20, border: `1px solid ${G.bd}` }}>{t}</span>)}
                  </div>
                  <button style={{ background: G.dk, color: "#fff", border: "none", borderRadius: 11, padding: "13px 0", width: "100%", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, position: "relative" }}>
                    Start Session <IcoArrow />
                  </button>
                </div>
              ))}
            </div>

            <p style={{ textAlign: "center", fontSize: 11, color: G.mu, marginTop: 22 }}>
              Your camera and microphone will be activated during the session for AI analysis.
            </p>
          </div>
        </div>
      )}

      {/* INTERVIEW SCREEN */}
      {category && (
        <div className="screen" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Progress strip with clickable Q pills */}
          <div style={{ background: "#fff", borderBottom: `1px solid ${G.bd}`, padding: "10px 28px", display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: G.mu, textTransform: "uppercase", letterSpacing: "0.6px", flexShrink: 0 }}>
              {category === "tech" ? "Technical" : "HR & Behavioral"}
            </span>
            <div style={{ flex: 1, height: 5, background: "#e8f0e8", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: 5, background: G.mid, borderRadius: 3, width: `${((currentQuestion + 1) / questions.length) * 100}%`, transition: "width 0.4s ease" }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: G.mid, flexShrink: 0 }}>
              {currentQuestion + 1} / {questions.length}
            </span>
            {/* Clickable Q pills */}
            <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
              {questions.slice(0, Math.min(questions.length, 12)).map((_, i) => {
                const done = !!results[i];
                const active = i === currentQuestion;
                const hasRec = !!(recordings[i] || []).length;
                return (
                  <button key={i} className="q-pill" onClick={() => goToQuestion(i)}
                    title={`Question ${i + 1}${done ? " ✓ submitted" : hasRec ? " (recorded)" : ""}`}
                    style={{
                      width: 26, height: 26, borderRadius: "50%",
                      border: active ? `2px solid ${G.mid}` : done ? `2px solid ${G.mid}` : `1.5px solid ${hasRec ? "#8fd49f" : "#d0e8d0"}`,
                      background: active ? G.dk : done ? G.mid : hasRec ? "#d4eeda" : "#f0f7f0",
                      color: active || done ? "#fff" : hasRec ? G.soft : G.mu,
                      fontSize: 10, fontWeight: 800,
                      cursor: "pointer", fontFamily: "inherit",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      padding: 0,
                    }}>
                    {done ? <IcoCheck /> : i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main split: Left (question + video) | Right (recordings) */}
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 360px", minHeight: 0 }}>

            {/* LEFT PANEL */}
            <div style={{ display: "flex", flexDirection: "column", borderRight: `1px solid ${G.bd}`, overflow: "hidden" }}>

              {/* Question header */}
              <div style={{ background: G.dk, padding: "22px 28px 18px", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <span style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)", fontSize: 9, fontWeight: 700, padding: "2px 9px", borderRadius: 20, letterSpacing: "0.8px", textTransform: "uppercase" }}>
                        {category === "tech" ? "Technical" : "Behavioral"} · Q{String(currentQuestion + 1).padStart(2, "0")}
                      </span>
                      <button onClick={() => speak(questions[currentQuestion])} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 7, padding: "4px 9px", color: "rgba(255,255,255,0.65)", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600 }}>
                        <IcoVol /> Read aloud
                      </button>
                    </div>
                    <p style={{ fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.65, marginBottom: 8 }}>
                      {questions[currentQuestion]}
                    </p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                      {category === "tech" ? "Tip: Explain reasoning step-by-step. Mention trade-offs and real-world examples." : "Tip: Use the STAR method — Situation, Task, Action, Result."}
                    </p>
                  </div>
                  <CircularTimer seconds={timer} total={120} />
                </div>
              </div>

             {/* Camera */}
              <div style={{ flex: 1, background: "#0a1a0f", position: "relative", overflow: "hidden", minHeight: 220 }}>
                <video ref={videoRef} autoPlay muted style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />

                {/* Eye contact badge */}
                <div style={{ position: "absolute", top: 10, left: 12, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", borderRadius: 18, padding: "4px 11px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: eyeContact === "Excellent" ? "#5cdd78" : "#ffaa33", display: "inline-block", animation: "pulse 2s infinite" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>Eye: {eyeContact}</span>
                </div>

                {/* REC indicator */}
                {recording && (
                  <div style={{ position: "absolute", top: 10, right: 12, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", borderRadius: 18, padding: "4px 11px", display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 6, height: 6, background: "#e74c3c", borderRadius: "50%", animation: "pulse 1s infinite" }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>REC {String(Math.floor(timer / 60)).padStart(2, "0")}:{String(timer % 60).padStart(2, "0")}</span>
                  </div>
                )}

                {!recording && currentRecs.length === 0 && (
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>
                      <IcoMic />
                    </div>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontWeight: 600 }}>Press Start Recording to begin</span>
                  </div>
                )}
              </div>

              {/* Control bar */}
              <div style={{ background: "#fff", borderTop: `1px solid ${G.bd}`, padding: "14px 20px", display: "flex", gap: 10, flexShrink: 0 }}>
                <button className="btn-primary" onClick={startRecording} disabled={recording}
                  style={{ flex: 1, background: G.dk, color: "#fff", border: "none", borderRadius: 9, padding: "11px 0", fontSize: 12, fontWeight: 700, cursor: recording ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontFamily: "inherit", opacity: recording ? 0.5 : 1, transition: "background 0.15s" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: recording ? "#888" : "#5cdd78" }} />
                  {recording ? "Recording…" : "Start Recording"}
                </button>

                <button className="btn-danger" onClick={stopRecording} disabled={!recording}
                  style={{ flex: 1, background: "#e74c3c", color: "#fff", border: "none", borderRadius: 9, padding: "11px 0", fontSize: 12, fontWeight: 700, cursor: !recording ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontFamily: "inherit", opacity: !recording ? 0.4 : 1, transition: "background 0.15s" }}>
                  <IcoStop /> Stop
                </button>

                <button className="btn-outline" onClick={uploadRecording}
                  disabled={currentUploadStatus === UPLOAD_UPLOADING || currentUploadStatus === UPLOAD_DONE}
                  style={{
                    flex: 1.4, borderRadius: 9, padding: "11px 0", fontSize: 12, fontWeight: 700,
                    fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                    cursor: (currentUploadStatus === UPLOAD_UPLOADING || currentUploadStatus === UPLOAD_DONE) ? "not-allowed" : "pointer",
                    background: currentUploadStatus === UPLOAD_DONE ? G.lt : "#fff",
                    color: G.soft,
                    border: `1.5px solid ${currentUploadStatus === UPLOAD_DONE ? G.mid : G.bd}`,
                    transition: "all 0.15s",
                  }}>
                  {currentUploadStatus === UPLOAD_UPLOADING && <><span className="spinner" /> Uploading…</>}
                  {currentUploadStatus === UPLOAD_DONE && <><IcoCheck /> Submitted</>}
                  {currentUploadStatus === UPLOAD_IDLE && <><IcoUpload /> Submit Answer</>}
                </button>
              </div>

              {/* Navigation */}
              <div style={{ background: G.bg, borderTop: `1px solid ${G.bd}`, padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                <button onClick={prevQ} disabled={currentQuestion === 0}
                  style={{ background: "none", border: "none", color: currentQuestion === 0 ? "#ccc" : G.dk, fontSize: 12, fontWeight: 600, cursor: currentQuestion === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit", padding: "5px 0" }}>
                  <IcoLeft /> Previous
                </button>

                <div style={{ display: "flex", gap: 4 }}>
                  {Array.from({ length: Math.min(questions.length, 7) }).map((_, i) => (
                    <div key={i} style={{
                      width: i === currentQuestion ? 20 : 6, height: 6,
                      borderRadius: 3,
                      background: i === currentQuestion ? G.mid : i < currentQuestion ? "#8fd49f" : "rgba(0,0,0,0.12)",
                      transition: "all 0.22s",
                    }} />
                  ))}
                </div>

                {currentQuestion < questions.length - 1 ? (
                  <button onClick={nextQ}
                    style={{ background: "none", border: "none", color: G.dk, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit", padding: "5px 0" }}>
                    Next <IcoRight />
                  </button>
                ) : (
                  <button onClick={submitInterview}
                    style={{ background: G.mid, color: "#fff", border: "none", borderRadius: 9, padding: "7px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                    Finish & Review
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT PANEL — recordings */}
            <div style={{ display: "flex", flexDirection: "column", background: "#fff", overflow: "hidden" }}>

              <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: G.dk }}>Your Takes</span>
                  {currentRecs.length > 0 && (
                    <span style={{ background: G.dk, color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 9px", borderRadius: 20 }}>
                      {currentRecs.length} Take{currentRecs.length > 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                {!currentRecs.length ? (
                  <div style={{ padding: "32px 0", textAlign: "center" }}>
                    <div style={{ width: 46, height: 46, background: G.lt, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", color: G.soft }}>
                      <IcoMic />
                    </div>
                    <p style={{ fontSize: 12, color: G.mu, lineHeight: 1.7 }}>No recordings yet.<br />Start recording to see takes here.</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {currentRecs.map((rec, i) => {
                      const isSelected = selectedRecording === rec;
                      const qResult = results[currentQuestion];
                      const score = qResult ? Math.round(qResult?.evaluation?.overall_score || 0) : null;
                      const scoreColor = score !== null ? (score >= 70 ? "#27ae60" : score >= 50 ? "#f0ad4e" : "#e74c3c") : G.mu;

                      return (
                        <div key={i} className="rec-item"
                          onClick={() => setSelectedRecording(rec)}
                          style={{
                            borderRadius: 12,
                            border: isSelected ? `2px solid ${G.mid}` : `1.5px solid #e0ead8`,
                            overflow: "hidden",
                            background: isSelected ? "#f0faf4" : "#fafcf8",
                            cursor: "pointer",
                          }}>

                          {/* Take label row */}
                          <div style={{ padding: "8px 10px 4px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              {/* Selection radio */}
                              <div style={{
                                width: 18, height: 18, borderRadius: "50%",
                                border: `2px solid ${isSelected ? G.mid : "#ccc"}`,
                                background: isSelected ? G.mid : "transparent",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                              }}>
                                {isSelected && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>}
                              </div>
                              <span style={{ fontSize: 11, fontWeight: 700, color: isSelected ? G.soft : G.mu }}>
                                Take {i + 1}
                              </span>
                              {isSelected && (
                                <span style={{ fontSize: 9, fontWeight: 700, background: G.lt, color: G.soft, padding: "1px 7px", borderRadius: 10 }}>Selected</span>
                              )}
                            </div>
                            <button onClick={(e) => deleteRecording(currentQuestion, i, e)}
                              style={{ background: "none", border: "none", color: "#bbb", cursor: "pointer", padding: "2px", display: "flex", alignItems: "center" }}
                              title="Delete this take">
                              <IcoTrash />
                            </button>
                          </div>

                          {/* Video player */}
                          <div style={{ background: "#0a1a0f", margin: "0 8px", borderRadius: 8, overflow: "hidden", aspectRatio: "16/9" }}>
                            <video
                              src={rec.url}
                              controls
                              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>

                          {/* Score bar */}
                          <div style={{ padding: "8px 10px 8px" }}>
                            {score !== null ? (
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ flex: 1, height: 4, background: "#e8f0e8", borderRadius: 2, overflow: "hidden" }}>
                                  <div style={{ height: 4, background: scoreColor, borderRadius: 2, width: `${score}%`, transition: "width 0.5s" }} />
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 700, color: scoreColor, flexShrink: 0 }}>{score}%</span>
                              </div>
                            ) : (
                              <span style={{ fontSize: 10, color: G.mu }}>
                                {isSelected ? "Selected for submission" : "Click to select"}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {currentUploadStatus === UPLOAD_DONE && results[currentQuestion] && (
                  <div style={{ marginTop: 10, background: G.lt, border: `1px solid ${G.bd}`, borderRadius: 9, padding: "9px 12px", fontSize: 11, color: G.soft, display: "flex", alignItems: "center", gap: 7 }}>
                    <IcoCheck /> AI analysis complete for Q{currentQuestion + 1}
                  </div>
                )}
              </div>

              {/* Coach tip */}
              <div style={{ borderTop: `1px solid ${G.bd}`, padding: "14px 16px", background: G.lt, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: G.dk, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                    <IcoTip />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 800, color: G.dk }}>Coach Tip</span>
                </div>
                <p style={{ fontSize: 11, color: G.soft, lineHeight: 1.7 }}>
                  {category === "tech"
                    ? <>Start broad, then drill down. Explain the <strong>why</strong> behind design choices — interviewers care about reasoning, not just correctness.</>
                    : <>Use the <strong>STAR</strong> method: Situation → Task → Action → Result. Aim for 90-second answers.</>}
                </p>
              </div>

              {/* Footer hint */}
              <div style={{ borderTop: `1px solid ${G.bd}`, padding: "10px 16px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                <span style={{ fontSize: 10, color: G.mu }}>
                  {currentRecs.length > 0 && !selectedRecording ? "Select a take, then Submit Answer" :
                   selectedRecording ? `Take ${currentRecs.indexOf(selectedRecording) + 1} selected` :
                   "Record your answer above"}
                </span>
                <button style={{ background: G.dk, border: "none", color: "#fff", width: 30, height: 30, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IcoHelp />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}