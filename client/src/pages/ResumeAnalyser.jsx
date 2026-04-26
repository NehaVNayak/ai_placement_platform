import { useState } from 'react'
import ResumeInputPanel   from './ResumeInputPanel.jsx'
import ResumeResultsPanel from './ResumeResultsPanel.jsx'

// ── Shared navbar from main project ──
import { useNavigate } from 'react-router-dom'

const styles = `
  .ra-root {
    min-height: 100vh;
    background: #f0f4ec;
    font-family: 'Manrope', sans-serif;
  }

  /* reuse same nav style as StudentDashboard */
  .ra-nav {
    background: #1a3a1a;
    height: 56px;
    display: flex;
    align-items: center;
    padding: 0 32px;
    gap: 32px;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .ra-nav-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    margin-right: 16px;
  }

  .ra-nav-link {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    cursor: pointer;
    background: none;
    border: none;
    font-family: inherit;
    padding: 0;
    transition: color 0.15s;
  }

  .ra-nav-link:hover { color: #fff; }

  .ra-nav-link.active {
    color: #fff;
    border-bottom: 2px solid #6fcf6f;
    padding-bottom: 2px;
  }

  .ra-hero {
    text-align: center;
    padding: 48px 24px 32px;
    max-width: 720px;
    margin: 0 auto;
  }

  .ra-hero h1 {
    font-size: clamp(1.8rem, 3vw, 2.4rem);
    font-weight: 800;
    color: #1a2a1a;
    margin-bottom: 12px;
  }

  .ra-hero p {
    font-size: 15px;
    color: #6a806a;
    line-height: 1.7;
  }

  .ra-main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px 56px;
  }

  .ra-error {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 14px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 10px;
    padding: 13px 16px;
    color: #b91c1c;
    font-size: 14px;
  }

  .ra-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    padding: 64px 0;
  }

  .ra-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e8f0e8;
    border-top: 3px solid #198754;
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
`

export default function ResumeAnalyser() {
  const navigate = useNavigate()
  const [result,  setResult]  = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const name = localStorage.getItem("name") || "Student"
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()

  async function handleEvaluate({ file, text, jdText, mode }) {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      let response
      if (mode === 'file') {
        const form = new FormData()
        form.append('file', file)
        if (jdText?.trim()) {
          form.append('jd', new Blob([jdText], { type: 'text/plain' }), 'jd.txt')
        }
        // ← points to YOUR FastAPI backend
        response = await fetch('http://localhost:8000/evaluate', {
          method: 'POST',
          body: form
        })
      } else {
        response = await fetch('http://localhost:8000/evaluate-text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resume_text: text,
            jd_text: jdText?.trim() || null
          }),
        })
      }

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.detail || 'Evaluation failed. Please try again.')
      }
      setResult(await response.json())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="ra-root">

        {/* ── SHARED NAVBAR (same as StudentDashboard) ── */}
        <nav className="ra-nav">
          <div className="ra-nav-brand">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18,color:'#6fcf6f'}}>
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
            AI Placement PreP
          </div>
          <button className="ra-nav-link" onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="ra-nav-link" onClick={() => navigate('/practice')}>Practice</button>
          <button className="ra-nav-link active">Resume</button>
          <button className="ra-nav-link" onClick={() => navigate('/mock-interview')}>Interview</button>
          <button className="ra-nav-link" onClick={() => navigate('/performance')}>Performance</button>
          <button className="ra-nav-link" onClick={() => { localStorage.clear(); navigate('/login'); }}
            style={{marginLeft:'auto', color:'rgba(255,255,255,0.55)'}}>
            Logout
          </button>
          <div style={{width:34,height:34,borderRadius:'50%',background:'#4a7a4a',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,color:'#fff'}}>
            {initials}
          </div>
        </nav>

        {/* ── HERO ── */}
        <div className="ra-hero">
          <h1>📄 AI Resume Analyser</h1>
          <p>Upload your resume and get instant AI-powered feedback on skills, ATS score, action verbs, and domain-specific suggestions.</p>
        </div>

        {/* ── MAIN CONTENT ── */}
        <main className="ra-main">
          <ResumeInputPanel onEvaluate={handleEvaluate} loading={loading} />

          {error && (
            <div className="ra-error">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {loading && (
            <div className="ra-loading">
              <div className="ra-spinner" />
              <p style={{color:'#6a806a', fontSize:15}}>Analysing your resume…</p>
            </div>
          )}

          {result && !loading && (
            <ResumeResultsPanel result={result} />
          )}
        </main>

      </div>
    </>
  )
}