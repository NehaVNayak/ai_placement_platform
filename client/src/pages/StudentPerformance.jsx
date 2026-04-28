import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

export default function StudentPerformance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = "http://localhost:8000";

  const [student,     setStudent]     = useState(null);
  const [attempts,    setAttempts]    = useState([]);
  const [questionMap, setQuestionMap] = useState({});
  const [loading,     setLoading]     = useState(true);

  const ALL_SUBJECTS = [
    "DBMS","OS","CN","OOPS","SQL",
    "Python","Java","C++","DSA",
    "Aptitude","Verbal","Reasoning"
  ];

  const SUBJECT_MAP = {
    // DSA
    "dsa":"DSA","data structures":"DSA","algorithms":"DSA","coding":"DSA",
    // DBMS
    "dbms":"DBMS","database":"DBMS","databases":"DBMS",
    // OS
    "os":"OS","operating system":"OS","operating systems":"OS",
    // CN
    "cn":"CN","computer networks":"CN","networking":"CN","network":"CN",
    // OOPS
    "oops":"OOPS","oop":"OOPS","object oriented":"OOPS","object-oriented":"OOPS",
    // SQL
    "sql":"SQL",
    // Languages
    "python":"Python","java":"Java","c++":"C++","cpp":"C++",
    // Aptitude
    "aptitude":"Aptitude","quantitative":"Aptitude","quant":"Aptitude",
    "verbal":"Verbal","english":"Verbal",
    // Reasoning
    "reasoning":"Reasoning","logical":"Reasoning","logic":"Reasoning",
    "series":"Reasoning","number series":"Reasoning",
  };

  // ✅ Pass BOTH attempt and question — attempt fields take priority
  const resolveSubject = (attempt, question) => {
    const candidates = [
      attempt?.section,
      attempt?.topic,
      attempt?.subject,
      attempt?.language,
      question?.subject,
      question?.category,
      question?.topic,
      question?.section,
      question?.language,
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

        const [students, techA, aptA, progA, codeA, tq, aq, pq, cq] = await Promise.all([
          fetch(`${API}/api/faculty/students`).then(r => r.json()),
          fetch(`${API}/api/faculty/attempts`).then(r => r.json()),          // student_attempts (DBMS, OS, CN...)
          safeFetch(`${API}/api/faculty/aptitude-attempts`),                  // aptitude_attempts (Aptitude, Verbal, Reasoning)
          safeFetch(`${API}/api/faculty/programming-attempts`),               // programming_attempts (Python, Java, C++)
          safeFetch(`${API}/api/faculty/coding-attempts`),                    // coding_submissions (DSA)
          safeFetch(`${API}/api/faculty/questions/technical`),
          safeFetch(`${API}/api/faculty/questions/aptitude`),
          safeFetch(`${API}/api/faculty/questions/programming`),
          safeFetch(`${API}/api/faculty/questions/coding`),
        ]);

        const found = students.find(s => String(s._id) === String(id));
        setStudent(found);

        // Normalize all attempt collections
        const normalize = (arr, source) =>
          (Array.isArray(arr) ? arr : [])
            .filter(a => String(a.student_id) === String(id))
            .map(a => ({
              ...a,
              _source:     source,
              student_id:  String(a.student_id),
              question_id: String(a.question_id || a.problem_id || ""),
              // coding_submissions uses "passed" instead of "is_correct"
              is_correct:  "is_correct" in a ? a.is_correct : (a.passed || false),
            }));

        setAttempts([
          ...normalize(techA,  "technical"),
          ...normalize(aptA,   "aptitude"),
          ...normalize(progA,  "programming"),
          ...normalize(codeA,  "coding"),
        ]);

        const qmap = {};
        [
          ...(Array.isArray(tq) ? tq : []),
          ...(Array.isArray(aq) ? aq : []),
          ...(Array.isArray(pq) ? pq : []),
          ...(Array.isArray(cq) ? cq : []),
        ].forEach(q => { qmap[String(q._id)] = q; });
        setQuestionMap(qmap);

      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <h2 style={{ padding: 30 }}>Loading...</h2>;
  if (!student) return <h2 style={{ padding: 30 }}>Student not found.</h2>;

  // ── STATS ──────────────────────────────────────────────────────────────────
  const totalAttempts = attempts.length;
  const totalCorrect  = attempts.filter(a => a.is_correct).length;
  const totalWrong    = totalAttempts - totalCorrect;
  const accuracy      = totalAttempts ? ((totalCorrect / totalAttempts) * 100).toFixed(1) : 0;

  // ── SUBJECT MAP ────────────────────────────────────────────────────────────
  const subjectMap = {};
  ALL_SUBJECTS.forEach(s => (subjectMap[s] = { correct: 0, total: 0 }));

  attempts.forEach(a => {
    const q        = questionMap[a.question_id];
    const resolved = resolveSubject(a, q);   // ✅ pass BOTH
    if (!resolved) {
      console.warn("Unresolved subject for attempt:", JSON.stringify(a));
      return;
    }
    if (!subjectMap[resolved]) subjectMap[resolved] = { correct: 0, total: 0 };
    subjectMap[resolved].total++;
    if (a.is_correct) subjectMap[resolved].correct++;
  });

  const subjects = ALL_SUBJECTS.map(name => {
    const v = subjectMap[name];
    return {
      name,
      score:   v.total ? Math.round((v.correct / v.total) * 100) : 0,
      correct: v.correct,
      total:   v.total,
    };
  });

  const attempted   = subjects.filter(s => s.total > 0);
  const weakAreas   = [...attempted].sort((a, b) => a.score - b.score).slice(0, 4);
  const strongAreas = [...attempted].sort((a, b) => b.score - a.score).slice(0, 4);

  // ── RECENT ATTEMPTS ────────────────────────────────────────────────────────
  const recentAttempts = [...attempts]
    .sort((a, b) => new Date(b.attempt_time) - new Date(a.attempt_time))
    .slice(0, 8)
    .map(a => {
      const q       = questionMap[a.question_id];
      const subject = resolveSubject(a, q) || "General";
      return {
        subject,
        correct: a.is_correct,
        date:    new Date(a.attempt_time).toLocaleDateString(),
        time:    new Date(a.attempt_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
    });

  const radarData = attempted.slice(0, 6).map(s => ({ subject: s.name, score: s.score }));

  const branch  = student.education?.[0]?.branch  || "N/A";
  const college = student.education?.[0]?.college  || "";
  const degree  = student.education?.[0]?.degree   || "";

  const cardBorder = "2px solid #1a5c35";
  const panelStyle = {
    background: "#fff", borderRadius: 14,
    border: cardBorder,
    boxShadow: "0 2px 12px rgba(26,92,53,0.10)"
  };

  return (
    <div style={{ background: "#f0f5f1", minHeight: "100vh" }}>

      {/* NAV */}
      <div style={{
        background: "#12311e", color: "white",
        padding: "15px 30px", display: "flex",
        justifyContent: "space-between", alignItems: "center"
      }}>
        <h3 style={{ margin: 0 }}>AI Placement Practice</h3>
        <button onClick={() => navigate(-1)} style={{
          background: "transparent", border: "1px solid #a8d5b5",
          color: "#a8d5b5", padding: "6px 18px", borderRadius: 20,
          cursor: "pointer", fontSize: 13
        }}>← Back</button>
      </div>

      <div style={{ padding: 25 }}>

        {/* PROFILE HEADER */}
        <div style={{
          ...panelStyle, padding: "20px 25px",
          display: "flex", alignItems: "center", gap: 20, marginBottom: 20,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", background: "#1a5c35",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, color: "#fff", fontWeight: 700, flexShrink: 0
          }}>
            {student.full_name?.[0]?.toUpperCase() || "S"}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, color: "#12311e" }}>{student.full_name}</h2>
            <div style={{ fontSize: 13, color: "#6b8577", marginTop: 4 }}>
              {student.email} · {student.phone || ""}
            </div>
            <div style={{ fontSize: 13, color: "#6b8577" }}>
              {degree} · <b style={{ color: "#1a5c35" }}>{branch}</b> · {college}
            </div>
          </div>
          <div style={{
            textAlign: "center", background: "#e8f5ee", borderRadius: 12,
            padding: "12px 24px", border: "2px solid #1a5c35"
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#1a5c35" }}>{accuracy}%</div>
            <div style={{ fontSize: 11, color: "#6b8577" }}>Overall Accuracy</div>
          </div>
        </div>

        {/* STAT CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 15, marginBottom: 20 }}>
          <StatCard title="TOTAL ATTEMPTS" value={totalAttempts} color="#1a5c35" border={cardBorder} />
          <StatCard title="CORRECT"        value={totalCorrect}  color="#2e7d52" border={cardBorder} />
          <StatCard title="WRONG"          value={totalWrong}    color="#c94040" border="2px solid #c94040" />
          <StatCard title="SUBJECTS TRIED" value={attempted.length} color="#e09c1a" border="2px solid #e09c1a" />
        </div>

        {/* SUBJECT GRID + RADAR */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
          <div>
            <SLabel>SUBJECT-WISE PERFORMANCE</SLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {subjects.map(s => {
                const subjectColor = s.total === 0 ? "#ccc"
                  : s.score > 70 ? "#1a5c35"
                  : s.score > 50 ? "#e09c1a" : "#c94040";
                return (
                  <div key={s.name} style={{
                    background: "#fff", padding: 12, borderRadius: 10, textAlign: "center",
                    border: `2px solid ${s.total === 0 ? "#d0ddd5" : subjectColor}`,
                    boxShadow: s.total > 0 ? `0 2px 8px ${subjectColor}22` : "none"
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#444" }}>{s.name}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, margin: "6px 0", color: subjectColor }}>
                      {s.total === 0 ? "—" : `${s.score}%`}
                    </div>
                    <div style={{ fontSize: 11, color: "#9ab5a3" }}>
                      {s.total === 0 ? "Not attempted" : `${s.correct}/${s.total} correct`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ ...panelStyle, padding: 15 }}>
            <SLabel>PERFORMANCE RADAR</SLabel>
            {radarData.length === 0
              ? <div style={{ fontSize: 13, color: "#9ab5a3", paddingTop: 20 }}>No data yet</div>
              : <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
                    <Radar dataKey="score" fill="#1a5c35" fillOpacity={0.35} stroke="#1a5c35" />
                  </RadarChart>
                </ResponsiveContainer>
            }
          </div>
        </div>

        {/* WEAK + STRONG */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div style={{ ...panelStyle, padding: 15, border: "2px solid #c94040", boxShadow: "0 2px 12px rgba(201,64,64,0.10)" }}>
            <SLabel>⚠ WEAK AREAS</SLabel>
            {weakAreas.length === 0
              ? <div style={{ fontSize: 13, color: "#9ab5a3" }}>No data yet</div>
              : weakAreas.map(w => (
                <div key={w.name} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600 }}>
                    <span>{w.name}</span><span style={{ color: "#c94040" }}>{w.score}%</span>
                  </div>
                  <div style={{ height: 6, background: "#fdeaea", borderRadius: 3, marginTop: 4 }}>
                    <div style={{ width: `${w.score}%`, background: "#c94040", height: "100%", borderRadius: 3 }} />
                  </div>
                  <div style={{ fontSize: 11, color: "#9ab5a3", marginTop: 2 }}>{w.correct}/{w.total} correct</div>
                </div>
              ))
            }
          </div>

          <div style={{ ...panelStyle, padding: 15 }}>
            <SLabel>✅ STRONG AREAS</SLabel>
            {strongAreas.length === 0
              ? <div style={{ fontSize: 13, color: "#9ab5a3" }}>No data yet</div>
              : strongAreas.map(s => (
                <div key={s.name} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600 }}>
                    <span>{s.name}</span><span style={{ color: "#1a5c35" }}>{s.score}%</span>
                  </div>
                  <div style={{ height: 6, background: "#e8f5ee", borderRadius: 3, marginTop: 4 }}>
                    <div style={{ width: `${s.score}%`, background: "#1a5c35", height: "100%", borderRadius: 3 }} />
                  </div>
                  <div style={{ fontSize: 11, color: "#9ab5a3", marginTop: 2 }}>{s.correct}/{s.total} correct</div>
                </div>
              ))
            }
          </div>
        </div>

        {/* BAR CHART */}
        <div style={{ ...panelStyle, padding: 15, marginBottom: 20 }}>
          <SLabel>ATTEMPTS PER SUBJECT</SLabel>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={attempted}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total"   fill="#a8d5b5" name="Total"   radius={[4,4,0,0]} />
              <Bar dataKey="correct" fill="#1a5c35" name="Correct" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* RECENT ATTEMPTS */}
        <div style={{ ...panelStyle, padding: 15 }}>
          <SLabel>RECENT ATTEMPTS</SLabel>
          {recentAttempts.length === 0
            ? <div style={{ fontSize: 13, color: "#9ab5a3" }}>No attempts yet</div>
            : recentAttempts.map((a, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "8px 0",
                borderBottom: i !== recentAttempts.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none"
              }}>
                <div style={{
                  width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
                  background: a.correct ? "#1a5c35" : "#c94040"
                }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{a.subject}</span>
                  <span style={{ fontSize: 11, color: "#9ab5a3", marginLeft: 8 }}>{a.date} · {a.time}</span>
                </div>
                <div style={{
                  fontSize: 11, padding: "3px 12px", borderRadius: 20, fontWeight: 600,
                  background: a.correct ? "#e8f5ee" : "#fdeaea",
                  color: a.correct ? "#1a5c35" : "#c94040",
                  border: a.correct ? "1.5px solid #1a5c35" : "1.5px solid #c94040"
                }}>
                  {a.correct ? "Correct" : "Wrong"}
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, color, border }) {
  return (
    <div style={{
      background: "#fff", padding: 15, borderRadius: 10,
      border: border || "2px solid #1a5c35",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#6b8577", letterSpacing: ".08em" }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color, marginTop: 6 }}>{value}</div>
    </div>
  );
}

function SLabel({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, color: "#6b8577", marginBottom: 12, letterSpacing: ".08em" }}>
      {children}
    </div>
  );
}