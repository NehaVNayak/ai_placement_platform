import { useState } from 'react'
import Navbar       from './pages/Navbar.jsx'
import InputPanel   from './pages/Inputpanel.jsx'
import ResultsPanel from './pages/Resultspanel.jsx'
import Footer       from './pages/Footer.jsx'

export default function App() {
  const [result,  setResult]  = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  async function handleEvaluate({ file, text, jdText, mode }) {
    setLoading(true)
    setError(null)
    setResult(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    try {
      let response
      if (mode === 'file') {
        const form = new FormData()
        form.append('file', file)
        if (jdText?.trim()) {
          form.append('jd', new Blob([jdText], { type: 'text/plain' }), 'jd.txt')
        }
        response = await fetch('/evaluate', { method: 'POST', body: form })
      } else {
        response = await fetch('/evaluate-text', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ resume_text: text, jd_text: jdText?.trim() || null }),
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={heroSection}>
        <p style={heroEyebrow}>Academic CV Analysis Platform</p>
        <h1 style={h1Style}>
          Optimize your{' '}
          <span style={greenItalicStyle}>academic</span>
          <br />
          <span style={greenItalicStyle}>portfolio</span>
        </h1>
        <p style={heroSubtitle}>
          Advanced linguistic analysis tailored for Curriculum Vitae optimization, highlighting
          research impact and scholarly contributions for institutional review.
        </p>
      </section>

      {/* ── Two-column input area ── */}
      <main style={mainOuter}>
        <div className="main-grid" style={mainGrid}>
          <div>
            <InputPanel onEvaluate={handleEvaluate} loading={loading} />
            {error && <ErrorBox message={error} />}
          </div>
          <ScholarlyInsights />
        </div>
      </main>

      {/* ── Results ── */}
      {(loading || result) && (
        <section style={resultSection}>
          <div style={resultInner}>
            {loading ? <LoadingState /> : <ResultsPanel result={result} />}
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

/* ── Scholarly Insights sidebar ───────────────────────────── */
function ScholarlyInsights() {
  return (
    <div style={insightCard}>
      <h3 style={insightTitle}>Scholarly Insights</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 24 }}>
        <InsightRow
          icon="📊"
          title="Research Impact Metrics"
          desc="Quantifiable assessment of publication history, citation relevance, and grant acquisition potential."
        />
        <InsightRow
          icon="📚"
          title="Pedagogical Alignment"
          desc="Evaluates teaching philosophy and instructional experience against departmental standards."
        />
      </div>

      {/* Quote card */}
      <div style={quoteImgBox}>
        <div style={quoteOverlay}>
          <p style={quoteText}>
            "The structural refinements suggested for my publication list significantly improved
            the clarity of my tenure-track application." — Dr. Aris T.
          </p>
        </div>
      </div>
    </div>
  )
}

function InsightRow({ icon, title, desc }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div style={insightIconBox}>{icon}</div>
      <div>
        <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 3, color: 'var(--text)' }}>{title}</p>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>{desc}</p>
      </div>
    </div>
  )
}

function ErrorBox({ message }) {
  return (
    <div style={errorStyle}>
      <span style={{ fontSize: 18 }}>⚠️</span>
      <span style={{ fontSize: 14 }}>{message}</span>
    </div>
  )
}

function LoadingState() {
  return (
    <div style={loadingWrap}>
      <div style={spinner} />
      <p style={{ color: 'var(--muted)', fontSize: 15, fontStyle: 'italic' }}>
        Conducting scholarly evaluation…
      </p>
    </div>
  )
}

/* ── Styles ────────────────────────────────────────────────── */

const heroSection = {
  textAlign: 'center',
  padding: '52px 24px 36px',
  maxWidth: 720,
  margin: '0 auto',
  animation: 'fadeUp 0.6s ease both',
}

const heroEyebrow = {
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  marginBottom: 14,
}

const h1Style = {
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(34px, 5.5vw, 58px)',
  fontWeight: 700,
  lineHeight: 1.18,
  color: 'var(--text)',
  marginBottom: 18,
}

const greenItalicStyle = {
  color: 'var(--green)',
  fontStyle: 'italic',
}

const heroSubtitle = {
  fontSize: 15,
  color: 'var(--muted)',
  lineHeight: 1.75,
  maxWidth: 580,
  margin: '0 auto',
  fontWeight: 300,
}

const mainOuter = {
  maxWidth: 1100,
  margin: '0 auto',
  padding: '0 24px 56px',
  width: '100%',
  animation: 'fadeUp 0.6s 0.12s ease both',
}

const mainGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 24,
  alignItems: 'start',
}

const insightCard = {
  background: 'var(--white)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  padding: '28px',
  boxShadow: 'var(--shadow)',
}

const insightTitle = {
  fontFamily: 'var(--font-display)',
  fontSize: 20,
  fontWeight: 700,
  color: 'var(--text)',
  marginBottom: 20,
}

const insightIconBox = {
  width: 36,
  height: 36,
  background: 'var(--green-light)',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 18,
  flexShrink: 0,
}

const quoteImgBox = {
  height: 170,
  borderRadius: 10,
  background: 'linear-gradient(160deg, #1a2e1a 0%, #2a5a2a 60%, #1e3a1e 100%)',
  display: 'flex',
  alignItems: 'flex-end',
  overflow: 'hidden',
  position: 'relative',
}

const quoteOverlay = {
  width: '100%',
  padding: '18px 16px',
  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
}

const quoteText = {
  color: '#fff',
  fontSize: 12.5,
  fontStyle: 'italic',
  lineHeight: 1.6,
}

const resultSection = {
  background: 'var(--white)',
  borderTop: '1px solid var(--border)',
  padding: '52px 24px',
}

const resultInner = {
  maxWidth: 1100,
  margin: '0 auto',
}

const loadingWrap = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 18,
  padding: '64px 0',
}

const spinner = {
  width: 40,
  height: 40,
  border: '3px solid var(--border)',
  borderTop: '3px solid var(--green)',
  borderRadius: '50%',
  animation: 'spin 0.9s linear infinite',
}

const errorStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginTop: 14,
  background: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: 'var(--radius-sm)',
  padding: '13px 16px',
  color: '#b91c1c',
}