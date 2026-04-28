import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

function TPOPerformanceDashboard() {

  const navigate = useNavigate();
  const API = "http://localhost:8000";

  const [students, setStudents] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [questionMap, setQuestionMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeBranch, setActiveBranch] = useState("ALL");

  const BRANCH_LIST = ["CSE", "ECE", "MECH", "CIVIL", "ISE", "AIML"];
  const ALL_BRANCHES = ["ALL", ...BRANCH_LIST];

  const ALL_SUBJECTS = [
    "DBMS", "OS", "CN", "OOPS", "SQL",
    "Python", "Java", "C++", "DSA",
    "Aptitude", "Verbal", "Reasoning"
  ];

  const SUBJECT_MAP = {
    "dsa": "DSA", "data structures": "DSA", "algorithms": "DSA", "coding": "DSA",
    "dbms": "DBMS", "database": "DBMS", "databases": "DBMS",
    "os": "OS", "operating system": "OS", "operating systems": "OS",
    "cn": "CN", "computer networks": "CN", "networking": "CN", "network": "CN",
    "oops": "OOPS", "oop": "OOPS", "object oriented": "OOPS", "object-oriented": "OOPS",
    "sql": "SQL",
    "python": "Python",
    "java": "Java",
    "c++": "C++", "cpp": "C++",
    "aptitude": "Aptitude", "quantitative": "Aptitude", "quant": "Aptitude",
    "verbal": "Verbal", "english": "Verbal",
    "reasoning": "Reasoning", "logical": "Reasoning", "logic": "Reasoning",
    "series": "Reasoning",
  };

  const resolveSubject = (attempt, question) => {
    const candidates = [
      attempt?.section,
      attempt?.topic,
      question?.subject,
      question?.category,
      question?.topic,
      question?.section,
    ];

    for (const raw of candidates) {
      if (!raw) continue;
      const lower = raw.toLowerCase().trim();
      const direct = ALL_SUBJECTS.find(s => s.toLowerCase() === lower);
      if (direct) return direct;
      const mapped = SUBJECT_MAP[lower];
      if (mapped) return mapped;
    }
    return null;
  };

  useEffect(() => {
    const load = async () => {
      try {
        const safeFetch = (url) => fetch(url).then(r => r.json()).catch(() => []);

        const [s, a, aptA, tq, aq, pq, cq] = await Promise.all([
          fetch(`${API}/api/faculty/students`).then(r => r.json()),
          fetch(`${API}/api/faculty/attempts`).then(r => r.json()),
          safeFetch(`${API}/api/faculty/aptitude-attempts`),
          safeFetch(`${API}/api/faculty/questions/technical`),
          safeFetch(`${API}/api/faculty/questions/aptitude`),
          safeFetch(`${API}/api/faculty/questions/programming`),
          safeFetch(`${API}/api/faculty/questions/coding`),
        ]);

        setStudents(s);

        const normStudentAttempts = (Array.isArray(a) ? a : []).map(x => ({
          ...x,
          _source:     "student",
          student_id:  String(x.student_id),
          question_id: String(x.question_id),
        }));

        const normAptitudeAttempts = (Array.isArray(aptA) ? aptA : []).map(x => ({
          ...x,
          _source:     "aptitude",
          student_id:  String(x.student_id),
          question_id: String(x.question_id),
        }));

        setAttempts([...normStudentAttempts, ...normAptitudeAttempts]);

        const qmap = {};
        [
          ...(Array.isArray(tq) ? tq : []),
          ...(Array.isArray(aq) ? aq : []),
          ...(Array.isArray(pq) ? pq : []),
          ...(Array.isArray(cq) ? cq : []),
        ].forEach(q => { qmap[String(q._id)] = q; });

        setQuestionMap(qmap);

      } catch (e) {
        console.error("Load error:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <h2 style={{ padding: 30 }}>Loading...</h2>;

  // ─── Branch-filtered data ───────────────────────────────────────────────────
  const isAll = activeBranch === "ALL";

  const branchStudents = isAll
    ? students
    : students.filter(s => s.education?.[0]?.branch === activeBranch);

  const studentIds = new Set(branchStudents.map(s => String(s._id)));

  const branchAttempts = attempts.filter(a => studentIds.has(a.student_id));

  const totalStudents = branchStudents.length;
  const solved        = branchAttempts.length;
  const correct       = branchAttempts.filter(a => a.is_correct).length;
  const accuracy      = solved ? ((correct / solved) * 100).toFixed(1) : 0;
  const activeUsers   = new Set(branchAttempts.map(a => a.student_id)).size;

  // ─── Enrollment chart data ──────────────────────────────────────────────────
  const enrollmentData = BRANCH_LIST.map(br => {
    const stu = students.filter(s => s.education?.[0]?.branch === br);
    const ids = new Set(stu.map(s => String(s._id)));
    const att = attempts.filter(a => ids.has(a.student_id));
    return {
      branch: br,
      total:  stu.length,
      active: new Set(att.map(a => a.student_id)).size,
    };
  });

  // ─── Subject performance ────────────────────────────────────────────────────
  const subjectMap = {};
  ALL_SUBJECTS.forEach(s => (subjectMap[s] = { correct: 0, total: 0 }));

  branchAttempts.forEach(a => {
    const q        = questionMap[a.question_id];
    const resolved = resolveSubject(a, q);
    if (!resolved) return;

    if (!subjectMap[resolved]) subjectMap[resolved] = { correct: 0, total: 0 };
    subjectMap[resolved].total++;
    if (a.is_correct) subjectMap[resolved].correct++;
  });

  const subjects = ALL_SUBJECTS.map(name => {
    const val = subjectMap[name] || { total: 0, correct: 0 };
    return {
      name,
      score:    val.total ? Math.round((val.correct / val.total) * 100) : 0,
      attempts: val.total,
      correct:  val.correct,
    };
  });

  const attempted = subjects.filter(s => s.attempts > 0);
  const weakAreas = [...attempted].sort((a, b) => a.score - b.score).slice(0, 4);

  // ─── Recent mock sessions ───────────────────────────────────────────────────
  const recentSessions = [...branchAttempts]
    .sort((a, b) => new Date(b.attempt_time) - new Date(a.attempt_time))
    .slice(0, 5)
    .map(a => {
      const stu = branchStudents.find(s => String(s._id) === a.student_id);
      return {
        id:     stu?._id,
        name:   stu?.full_name || "Student",
        score:  a.is_correct ? 85 : 65,
        branch: stu?.education?.[0]?.branch || "-",
        date:   new Date(a.attempt_time).toLocaleDateString(),
      };
    });

  // ─── Leaderboard ─────────────────────────────────────────────────────────────
  // When ALL: use all students; each student shows their branch too
  const leaderboardSource = isAll ? students : branchStudents;

  const leaderboard = leaderboardSource.map(s => {
    const sid          = String(s._id);
    const sAtt         = attempts.filter(a => a.student_id === sid);
    const correctCount = sAtt.filter(a => a.is_correct).length;
    const acc          = sAtt.length ? Math.round((correctCount / sAtt.length) * 100) : 0;
    return {
      _id:    s._id,
      name:   s.full_name,
      branch: s.education?.[0]?.branch,
      solved: sAtt.length,
      acc
    };
  }).sort((a, b) => b.acc - a.acc);

  // ─── Radar data ─────────────────────────────────────────────────────────────
  const radarData = [
    { subject: "Practice",   value: Number(accuracy) },
    { subject: "Accuracy",   value: Number(accuracy) },
    { subject: "Completion", value: Math.min(activeUsers * 10, 100) },
    { subject: "Interview",  value: Math.max(Number(accuracy) - 5, 0) },
    { subject: "Streak",     value: Math.max(Number(accuracy) - 10, 0) },
  ];

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ background: "#f0f5f1", minHeight: "100vh" }}>

      {/* NAV */}
      <div style={{
        background: "#12311e",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h3 style={{ margin: 0 }}>AI Placement Practice — TPO</h3>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <select
            value={activeBranch}
            onChange={e => setActiveBranch(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {ALL_BRANCHES.map(b => <option key={b}>{b}</option>)}
          </select>

          <button
            onClick={() => navigate("/tpo-notification")}
            style={{
              background: "#0f7c45",
              color: "#fff",
              border: "none",
              padding: "8px 14px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13
            }}
          >
            📢 Notify
          </button>
        </div>
      </div>

      <div style={{ padding: 25 }}>

        <h2 style={{ color: "#12311e", marginBottom: 20 }}>
          {isAll ? "All Departments" : `${activeBranch} Department`}
        </h2>

        {/* ── STAT CARDS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 15 }}>
          <Card title="TOTAL STUDENTS"   value={totalStudents} />
          <Card title="ACTIVE USERS"     value={activeUsers} />
          <Card title="QUESTIONS SOLVED" value={solved} />
          <Card title="AVG ACCURACY"     value={accuracy + "%"} />
          <Card title="MOCK INTERVIEWS"  value={Math.floor(solved / 5)} />
        </div>

        {/* ── CHARTS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginTop: 20 }}>

          <Box title="Branch-wise Enrollment">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={enrollmentData}>
                <XAxis dataKey="branch" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total"  fill="#1a5c35" name="Total" />
                <Bar dataKey="active" fill="#a8d5b5" name="Active" />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          <Box title="Performance Radar">
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar dataKey="value" fill="#1a5c35" fillOpacity={0.3} stroke="#1a5c35" />
              </RadarChart>
            </ResponsiveContainer>
          </Box>

          <Box title="Interview Scores">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={enrollmentData}>
                <XAxis dataKey="branch" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="active" fill="#3d9962" name="Active" />
              </BarChart>
            </ResponsiveContainer>
          </Box>

        </div>

        {/* ── SUBJECTS + WEAK AREAS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginTop: 20 }}>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10 }}>
            {subjects.map(s => (
              <div key={s.name} style={{
                background: "#fff",
                padding: 10,
                borderRadius: 10,
                textAlign: "center",
                border: "1.5px solid #1a5c35",
                boxShadow: "0 2px 8px rgba(26,92,53,0.12)"
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#444", marginBottom: 4 }}>{s.name}</div>
                <div style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: s.attempts === 0 ? "#ccc"
                    : s.score > 70 ? "#1a5c35"
                    : s.score > 50 ? "orange" : "red"
                }}>
                  {s.attempts === 0 ? "—" : `${s.score}%`}
                </div>
                <small style={{ color: "#9ab5a3" }}>{s.attempts} attempts</small>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#6b8577", marginBottom: 10, letterSpacing: ".08em" }}>
              ⚠ WEAK AREAS
            </div>
            {weakAreas.length === 0
              ? <div style={{ fontSize: 13, color: "#9ab5a3" }}>No attempts yet</div>
              : weakAreas.map(w => (
                <div key={w.name} style={{
                  background: "#fdeaea", padding: 10, borderRadius: 10, marginBottom: 10
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <b>{w.name}</b><b style={{ color: "red" }}>{w.score}%</b>
                  </div>
                  <div style={{ height: 5, background: "#ddd", marginTop: 5, borderRadius: 3 }}>
                    <div style={{ width: `${w.score}%`, background: "red", height: "100%", borderRadius: 3 }} />
                  </div>
                  <small style={{ color: "#9ab5a3" }}>{w.attempts} attempts</small>
                </div>
              ))
            }
          </div>

        </div>

        {/* ── RECENT MOCK INTERVIEW SESSIONS ── */}
        <div style={{
          background: "#fff", borderRadius: 12, padding: "1rem",
          marginTop: 20, border: "1.5px solid #1a5c35",
          boxShadow: "0 2px 8px rgba(26,92,53,0.12)"
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#6b8577", marginBottom: 10, letterSpacing: ".08em" }}>
            RECENT MOCK INTERVIEW SESSIONS
          </div>

          {recentSessions.length === 0 ? (
            <div style={{ fontSize: 13, color: "#9ab5a3" }}>No sessions available</div>
          ) : (
            recentSessions.map((s, i) => {
              const bg    = s.score >= 85 ? "#e8f5ee" : s.score >= 70 ? "#fef3cd" : "#fdeaea";
              const color = s.score >= 85 ? "#1a5c35" : s.score >= 70 ? "#e09c1a" : "#c94040";
              const label = s.score >= 85 ? "Excellent" : s.score >= 70 ? "Good" : "Needs Work";
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "8px 0",
                  borderBottom: i !== recentSessions.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none"
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", background: bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 600, color
                  }}>{s.score}</div>
                  <div style={{ flex: 1 }}>
                    <div
                      onClick={() => s.id && navigate(`/student-performance/${s.id}`)}
                      style={{
                        fontSize: 13, fontWeight: 500,
                        color: s.id ? "#1a5c35" : "#111",
                        cursor: s.id ? "pointer" : "default",
                        textDecoration: s.id ? "underline" : "none"
                      }}
                    >{s.name}</div>
                    <div style={{ fontSize: 11, color: "#9ab5a3" }}>{s.branch} · {s.date}</div>
                  </div>
                  <div style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: bg, color }}>{label}</div>
                </div>
              );
            })
          )}
        </div>

        {/* ── TOP STUDENTS / LEADERBOARD ── */}
        <div style={{
          background: "#fff", borderRadius: 12, padding: "1rem",
          marginTop: 20, border: "1.5px solid #1a5c35",
          boxShadow: "0 2px 8px rgba(26,92,53,0.12)"
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#6b8577", marginBottom: 10, letterSpacing: ".08em" }}>
            TOP STUDENTS — {isAll ? "ALL BRANCHES" : activeBranch}
          </div>

          {leaderboard.length === 0
            ? <div style={{ fontSize: 13, color: "#9ab5a3" }}>No students found</div>
            : leaderboard.slice(0, 5).map((s, i) => {
              const score = s.acc || 0;
              const bg    = score >= 85 ? "#e8f5ee" : score >= 70 ? "#fef3cd" : "#fdeaea";
              const color = score >= 85 ? "#1a5c35" : score >= 70 ? "#e09c1a" : "#c94040";
              const label = score >= 85 ? "Excellent" : score >= 70 ? "Good" : "Needs Work";
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 0",
                  borderBottom: i !== Math.min(leaderboard.length, 5) - 1 ? "1px solid rgba(0,0,0,0.05)" : "none"
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", background: bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 600, color
                  }}>{score}%</div>
                  <div style={{ flex: 1 }}>
                    <div
                      onClick={() => {
                        console.log("Navigating to student:", s._id);
                        navigate(`/student-performance/${s._id}`);
                      }}
                      style={{
                        fontSize: 13, fontWeight: 500, color: "#1a5c35",
                        cursor: "pointer", textDecoration: "underline"
                      }}
                    >{s.name}</div>
                    <div style={{ fontSize: 11, color: "#9ab5a3" }}>
                      {s.branch || "-"} · Rank #{i + 1} · {score}% Accuracy · {s.solved} solved
                    </div>
                  </div>
                  <div style={{ fontSize: 10, padding: "4px 10px", borderRadius: 20, background: bg, color }}>{label}</div>
                </div>
              );
            })
          }
        </div>

      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      background: "#fff", padding: 15, borderRadius: 12,
      border: "1.5px solid #1a5c35",
      boxShadow: "0 2px 8px rgba(26,92,53,0.12)"
    }}>
      <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#6b8577", letterSpacing: ".08em" }}>{title}</p>
      <h2 style={{ margin: "8px 0 0", color: "#12311e" }}>{value}</h2>
    </div>
  );
}

function Box({ title, children }) {
  return (
    <div style={{
      background: "#fff", padding: 15, borderRadius: 12,
      border: "1.5px solid #1a5c35",
      boxShadow: "0 2px 8px rgba(26,92,53,0.12)"
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#6b8577", marginBottom: 10, letterSpacing: ".08em" }}>{title}</div>
      {children}
    </div>
  );
}

export default TPOPerformanceDashboard;