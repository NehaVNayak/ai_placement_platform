import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import axios from "axios";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .cp-root {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #cdf9cd;
    font-family: 'Manrope', sans-serif;
    overflow: hidden;
  }

  /* NAV */
  .cp-nav {
    height: 48px;
    background: #1a3a1a;
    display: flex;
    align-items: center;
    padding: 0 20px;
    flex-shrink: 0;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .cp-nav-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
  }

  .cp-brand-dot {
    width: 9px; height: 9px;
    border-radius: 50%;
    background: #3ab43a;
    box-shadow: 0 0 0 2px rgba(58,180,58,0.3);
  }

  .cp-nav-avatar {
    margin-left: auto;
    width: 32px; height: 32px;
    border-radius: 50%;
    background: #4a7a4a;
    border: 2px solid rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #fff;
    cursor: pointer;
    overflow: hidden;
  }

  /* BODY */
  .cp-body {
    display: flex;
    flex: 1;
    gap: 10px;
    padding: 10px;
    overflow: hidden;
  }

  /* LEFT */
  .cp-left {
    width: 38%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    flex-shrink: 0;
  }

  .cp-left::-webkit-scrollbar { width: 4px; }
  .cp-left::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 2px; }

  .cp-panel {
    background: #fff;
    border-radius: 16px;
    padding: 20px 22px;
  }

  /* Live badge */
  .cp-live-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #d4f5d4;
    color: #1a6a1a;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 5px 12px;
    border-radius: 20px;
    margin-bottom: 16px;
  }

  .cp-live-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #2db82d;
  }

  .cp-problem-title {
    font-size: 17px;
    font-weight: 700;
    color: #1a2a1a;
    margin-bottom: 12px;
    line-height: 1.35;
  }

  .cp-problem-desc {
    font-size: 14px;
    color: #3a4a3a;
    line-height: 1.75;
  }

  .cp-problem-desc code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12.5px;
    background: #f0f4f0;
    border: 1px solid #dde8dd;
    border-radius: 5px;
    padding: 1px 6px;
    color: #1a3a1a;
  }

  .cp-problem-desc em { font-style: italic; color: #2a3a2a; }
  .cp-problem-desc strong { font-weight: 700; color: #1a2a1a; }

  /* Testcase tabs */
  .cp-tabs-row {
    display: flex;
    gap: 0;
    border-bottom: 1.5px solid #e8ede8;
    margin-bottom: 18px;
  }

  .cp-tab {
    padding: 8px 18px;
    font-size: 13px;
    font-weight: 600;
    color: #8a9a8a;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -1.5px;
    cursor: pointer;
    font-family: inherit;
    transition: color 0.15s;
  }

  .cp-tab.active { color: #1a2a1a; border-bottom-color: #1a2a1a; }
  .cp-tab:hover:not(.active) { color: #3a4a3a; }

  .cp-io-label {
    font-size: 11px;
    font-weight: 800;
    color: #5a6a5a;
    letter-spacing: 0.05em;
    margin-bottom: 6px;
  }

  .cp-io-box {
    background: #f5f8f5;
    border: 1px solid #e0e8e0;
    border-radius: 10px;
    padding: 10px 14px;
    margin-bottom: 14px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: #2a3a2a;
    line-height: 1.5;
  }

  .cp-expl-label {
    font-size: 11px;
    font-weight: 800;
    color: #5a6a5a;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
  }

  .cp-expl-text {
    font-size: 13px;
    color: #4a5a4a;
    line-height: 1.6;
    font-style: italic;
  }

  /* Constraints */
  .cp-constraints-title {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #3a4a3a;
    margin-bottom: 12px;
  }

  .cp-constraints-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .cp-constraints-list li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13px;
    color: #3a4a3a;
    font-family: 'JetBrains Mono', monospace;
    line-height: 1.4;
  }

  .cp-bullet {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #198754;
    margin-top: 5px;
    flex-shrink: 0;
  }

  .cp-constraints-list li.highlight {
    font-family: 'Manrope', sans-serif;
    color: #198754;
    font-weight: 600;
  }

  /* RIGHT */
  .cp-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
    overflow: hidden;
  }

  /* Topbar */
  .cp-topbar {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fff;
    border-radius: 14px;
    padding: 9px 14px;
    flex-shrink: 0;
  }

  .cp-lang-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .cp-lang-wrap select {
    appearance: none;
    -webkit-appearance: none;
    border: 1.5px solid #dde8dd;
    border-radius: 10px;
    background: #fff;
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #1a2a1a;
    padding: 7px 36px 7px 12px;
    cursor: pointer;
    outline: none;
  }

  .cp-lang-wrap svg {
    position: absolute;
    right: 10px;
    width: 14px; height: 14px;
    color: #5a7a5a;
    pointer-events: none;
  }

  .cp-run-btn {
    padding: 8px 18px;
    background: #fff;
    color: #1a2a1a;
    border: 1.5px solid #dde8dd;
    border-radius: 10px;
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }

  .cp-run-btn:hover { background: #f4faf4; border-color: #9aca9a; }

  .cp-submit-btn {
    padding: 8px 22px;
    background: #198754;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s;
  }

  .cp-submit-btn:hover { background: #157a47; }

  .cp-sep {
    width: 1px; height: 22px;
    background: #dde8dd;
    margin: 0 2px;
  }

  .cp-icon-btn {
    width: 34px; height: 34px;
    border: 1.5px solid #dde8dd;
    border-radius: 9px;
    background: #fff;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: #5a7a5a;
    transition: background 0.15s;
    flex-shrink: 0;
  }

  .cp-icon-btn:hover { background: #f4faf4; }
  .cp-icon-btn svg { width: 15px; height: 15px; }

  .cp-ai-chip {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #fffbeb;
    border: 1.5px solid #fde68a;
    border-radius: 20px;
    padding: 5px 14px;
    font-size: 12px;
    font-weight: 700;
    color: #78350f;
    white-space: nowrap;
  }

  .cp-ai-chip svg { width: 12px; height: 12px; fill: #f59e0b; }

  /* Editor section */
  .cp-editor-section {
    flex: 1;
    border-radius: 14px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 0;
    background: #1e3d1e;
  }

  .cp-editor-chrome {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 14px 8px;
    background: #1a3a1a;
    flex-shrink: 0;
  }

  .cp-chrome-dot {
    width: 11px; height: 11px;
    border-radius: 50%;
  }

  /* Console */
  .cp-console {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #e0e8e0;
    flex-shrink: 0;
    overflow: hidden;
  }

  .cp-console-hdr {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 14px;
    border-bottom: 1px solid #edf2ed;
    background: #fafcf8;
  }

  .cp-console-icon-wrap {
    width: 27px; height: 27px;
    background: #1a3a1a;
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .cp-console-icon-wrap svg { width: 13px; height: 13px; color: #fff; }

  .cp-console-label {
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #4a5a4a;
  }

  .cp-console-right {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .cp-status {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    font-weight: 700;
  }

  .cp-status svg { width: 15px; height: 15px; }
  .cp-status.ok { color: #198754; }
  .cp-status.err { color: #e24b4a; }

  .cp-runtime-txt {
    font-size: 13px;
    font-weight: 600;
    color: #6a7a6a;
  }

  .cp-console-body {
    padding: 12px 16px;
    max-height: 195px;
    overflow-y: auto;
  }

  .cp-console-body::-webkit-scrollbar { width: 4px; }
  .cp-console-body::-webkit-scrollbar-thumb { background: #d0ddd0; border-radius: 2px; }

  .cp-verdict-tag {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    padding: 6px 16px;
    border-radius: 8px;
    margin-bottom: 14px;
  }

  .cp-verdict-tag.ok { background: #1a3a1a; color: #a8e6b8; }
  .cp-verdict-tag.err { background: #3a1a1a; color: #f0a0a0; }

  .cp-tc-row {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f0f4f0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: #3a4a3a;
  }

  .cp-tc-row:last-child { border-bottom: none; }

  .cp-tc-status {
    margin-left: auto;
    font-weight: 600;
  }

  .cp-tc-status.ok { color: #198754; }
  .cp-tc-status.err { color: #e24b4a; }

  .cp-console-empty {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: #9aaa9a;
  }

  .cp-output-pre {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: #2a3a2a;
    white-space: pre-wrap;
    line-height: 1.6;
  }
    constraintCard: {
  width: "100%",
  maxWidth: "720px",
  background: "#fff",
  border: "1px solid #e6e6e6",
  borderRadius: "18px",
  padding: "22px",
  marginBottom: "22px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
},

constraintTitle: {
  fontSize: "11px",
  fontWeight: "800",
  letterSpacing: "0.12em",
  color: "#555",
  marginBottom: "14px",
},

constraintList: {
  paddingLeft: "18px",
  margin: 0,
},

constraintItem: {
  marginBottom: "10px",
  color: "#444",
  fontSize: "14px",
  lineHeight: "1.5",
},

constraintGreen: {
  marginTop: "8px",
  color: "#198754",
  fontSize: "14px",
  fontWeight: "600",
  listStyle: "none",
},
`;

function CodingPage() {
  const { topic } = useParams();

  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("# Write your solution here\n");
  const [rawOutput, setRawOutput] = useState(null);
  const [verdict, setVerdict] = useState(null);
  const [selectedLang, setSelectedLang] = useState("python");
  const [activeTest, setActiveTest] = useState(0);

  const query = new URLSearchParams(window.location.search);
  const questionId = query.get("q");

  useEffect(() => { fetchQuestion(); }, [topic, questionId]);
  useEffect(() => { if (question) fetchLastCode(); }, [question]);

  const fetchQuestion = async () => {
    try {
      const url = questionId
        ? `http://127.0.0.1:8000/api/coding/question-by-id?question_id=${questionId}`
        : `http://127.0.0.1:8000/api/coding/question?topic=${topic}`;
      const res = await axios.get(url);
      setQuestion(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchLastCode = async () => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId || !question?._id) return;
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/coding/submission?studentId=${studentId}&question_id=${question._id}`
      );
      if (res.data.code) setCode(res.data.code);
    } catch (_) {}
  };

  const runCode = async () => {
    setVerdict(null);
    setRawOutput("Running...");
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/coding/run", { code, language: selectedLang });
      setRawOutput(res.data.output || res.data.error || "No output.");
    } catch (_) { setRawOutput("Error running code."); }
  };

  const submitCode = async () => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) { alert("Student not logged in"); return; }
    setRawOutput(null);
    setVerdict(null);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/coding/submit", {
        code, language: selectedLang, question_id: question._id, studentId,
      });
      setVerdict({ status: res.data.status, results: res.data.results, runtime: res.data.runtime || null });
    } catch (_) { setVerdict({ status: "Error", results: [], runtime: null }); }
  };

  const monacoLang = { python: "python", java: "java", cpp: "cpp" };
  const isAccepted = verdict?.status?.toLowerCase().includes("accept");
  const hasOutput = rawOutput !== null || verdict !== null;

  return (
    <>
      <style>{css}</style>
      <div className="cp-root">

        {/* NAV */}
        <nav className="cp-nav">
          <div className="cp-nav-brand">
            <div className="cp-brand-dot" />
            AI Placement Prep
          </div>
          <div className="cp-nav-avatar">S</div>
        </nav>

        <div className="cp-body">

          {/* ─── LEFT ─── */}
          <div className="cp-left">

            {/* Problem */}
            <div className="cp-panel">
              <div className="cp-live-badge">
                <div className="cp-live-dot" />
                ✦ LIVE CODING ROUND
              </div>
              <div className="cp-problem-title">{question?.title || "Loading..."}</div>
              <div
                className="cp-problem-desc"
                dangerouslySetInnerHTML={{
                  __html: (question?.description || "")
                    .replace(/`([^`]+)`/g, "<code>$1</code>")
                    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
                    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
                    .replace(/\n/g, "<br/>"),
                }}
              />
            </div>

            {/* Testcases */}
            {question?.sample_testcases?.length > 0 && (
              <div className="cp-panel">
                <div className="cp-tabs-row">
                  {question.sample_testcases.map((_, i) => (
                    <button
                      key={i}
                      className={`cp-tab ${activeTest === i ? "active" : ""}`}
                      onClick={() => setActiveTest(i)}
                    >
                      Case {i + 1}
                    </button>
                  ))}
                </div>

                <div className="cp-io-label">Input:</div>
                <div className="cp-io-box">
                  <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
                    {question.sample_testcases[activeTest]?.input}
                  </pre>
                </div>

                <div className="cp-io-label">Output:</div>
                <div className="cp-io-box">
                  <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
                    {question.sample_testcases[activeTest]?.output}
                  </pre>
                </div>

                {question.sample_testcases[activeTest]?.explanation && (
                  <>
                    <div className="cp-expl-label">Explanation:</div>
                    <div className="cp-expl-text">
                      {question.sample_testcases[activeTest].explanation}
                    </div>
                  </>
                )}
              </div>
            )}
{/* Constraints */}
<div className="cp-panel">
  <div className="cp-constraints-title">Constraints</div>

  <ul className="cp-constraints-list">
    <li>
      <div className="cp-bullet"></div>
      <span>1 &lt;= n &lt;= 10⁵</span>
    </li>

    <li>
      <div className="cp-bullet"></div>
      <span>1 &lt;= values[i] &lt;= 10⁹</span>
    </li>

    <li>
      <div className="cp-bullet"></div>
      <span>Execution time limit: 1 sec</span>
    </li>

    <li className="highlight">
      <div className="cp-bullet"></div>
      <span>Optimize for time and space complexity.</span>
    </li>
  </ul>
</div>
          </div>

          {/* ─── RIGHT ─── */}
          <div className="cp-right">

            {/* Topbar */}
            <div className="cp-topbar">
              <div className="cp-lang-wrap">
                <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}>
                  <option value="python">Python 3</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              <button className="cp-run-btn" onClick={runCode}>Run Code</button>
              <button className="cp-submit-btn" onClick={submitCode}>Submit</button>

              <div className="cp-sep" />

              <button className="cp-icon-btn" onClick={fetchQuestion} title="Reset problem">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
              </button>

              <div className="cp-ai-chip">
                <svg viewBox="0 0 24 24">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                AI Suggestions Active
              </div>
            </div>

            {/* Editor */}
            <div className="cp-editor-section">
              <div className="cp-editor-chrome">
                <div className="cp-chrome-dot" style={{ background: "#ff5f57" }} />
                <div className="cp-chrome-dot" style={{ background: "#febc2e" }} />
                <div className="cp-chrome-dot" style={{ background: "#28c840" }} />
              </div>
              <Editor
                height="100%"
                theme="vs-dark"
                language={monacoLang[selectedLang]}
                value={code}
                onChange={(val) => setCode(val)}
                options={{
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  lineNumbers: "on",
                  renderLineHighlight: "line",
                  padding: { top: 12, bottom: 12 },
                  tabSize: 4,
                }}
              />
            </div>

            {/* Console */}
            <div className="cp-console">
              <div className="cp-console-hdr">
                <div className="cp-console-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 17 10 11 4 5" />
                    <line x1="12" y1="19" x2="20" y2="19" />
                  </svg>
                </div>
                <span className="cp-console-label">Output Console</span>
                {verdict && (
                  <div className="cp-console-right">
                    <div className={`cp-status ${isAccepted ? "ok" : "err"}`}>
                      {isAccepted ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                      )}
                      {verdict.status}
                    </div>
                    {verdict.runtime && (
                      <div className="cp-runtime-txt">Runtime: {verdict.runtime}</div>
                    )}
                  </div>
                )}
              </div>

              <div className="cp-console-body">
                {!hasOutput && (
                  <div className="cp-console-empty">Run your code to see output...</div>
                )}
                {rawOutput && !verdict && (
                  <pre className="cp-output-pre">{rawOutput}</pre>
                )}
                {verdict && (
                  <>
                    <div className={`cp-verdict-tag ${isAccepted ? "ok" : "err"}`}>
                      Final Verdict: {verdict.status}
                    </div>
                    {verdict.results?.map((r, i) => (
                      <div key={i} className="cp-tc-row">
                        <span>Testcase {r.testcase ?? i + 1}</span>
                        <span className={`cp-tc-status ${r.passed ? "ok" : "err"}`}>
                          {r.passed ? "Passed" : "Failed"}
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default CodingPage;