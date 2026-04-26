import { useState, useRef } from 'react'

export default function InputPanel({ onEvaluate, loading }) {
  const [mode,     setMode]     = useState('file')
  const [file,     setFile]     = useState(null)
  const [text,     setText]     = useState('')
  const [jdText,   setJdText]   = useState('')
  const [jdOpen,   setJdOpen]   = useState(false)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef()

  const canSubmit = !loading && (mode === 'file' ? !!file : !!text.trim())

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f && (f.name.endsWith('.pdf') || f.name.endsWith('.txt'))) setFile(f)
  }

  function handleSubmit() {
    if (canSubmit) onEvaluate({ file, text, jdText, mode })
  }

  return (
    <div style={card}>

      {/* Tab switcher */}
      <div style={tabRow}>
        <TabBtn label="Upload CV File"  active={mode==='file'} onClick={() => setMode('file')} />
        <TabBtn label="Paste CV Text"   active={mode==='text'} onClick={() => setMode('text')} />
      </div>

      {/* File drop zone */}
      {mode === 'file' && (
        <div
          style={dropzone(dragging, !!file)}
          onClick={() => fileRef.current.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <input
            ref={fileRef} type="file" accept=".pdf,.txt"
            style={{ display: 'none' }}
            onChange={e => setFile(e.target.files[0])}
          />
          <div style={uploadIcon}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </div>
          {file ? (
            <>
              <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--green-dark)', marginBottom: 4 }}>
                {file.name}
              </p>
              <p style={{ fontSize: 12, color: 'var(--muted)' }}>
                {(file.size / 1024).toFixed(1)} KB · click to change
              </p>
            </>
          ) : (
            <>
              <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                Upload your curriculum vitae
              </p>
              <p style={{ fontSize: 13, color: 'var(--muted)' }}>
                PDF or DOCX format preferred (Max 5MB)
              </p>
            </>
          )}
        </div>
      )}

      {/* Text paste */}
      {mode === 'text' && (
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste your curriculum vitae text here…"
          style={textarea}
          rows={9}
        />
      )}

      {/* JD / academic posting accordion */}
      <div style={accordion}>
        <button style={accordionHeader} onClick={() => setJdOpen(o => !o)}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <span style={acIcon}>🎓</span>
            Add Academic Posting for Alignment Analysis
          </span>
          <span style={{
            transform: jdOpen ? 'rotate(180deg)' : 'none',
            transition: 'var(--transition)',
            color: 'var(--muted-light)',
            fontSize: 13,
          }}>▾</span>
        </button>

        {jdOpen && (
          <textarea
            value={jdText}
            onChange={e => setJdText(e.target.value)}
            placeholder="Paste the faculty position or grant description here to evaluate scholarly alignment…"
            style={{
              ...textarea,
              marginTop: 0,
              borderTop: 'none',
              borderRadius: '0 0 var(--radius-sm) var(--radius-sm)',
              height: 110,
              background: '#fafaf6',
            }}
            rows={4}
          />
        )}
      </div>

      {/* Submit */}
      <button onClick={handleSubmit} disabled={!canSubmit} style={submitBtn(canSubmit)}>
        {loading ? 'Evaluating…' : 'Begin Scholarly Evaluation'}
        {!loading && <span style={{ marginLeft: 10, fontSize: 15 }}>📊</span>}
      </button>
    </div>
  )
}

function TabBtn({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={tabBtn(active)}>
      {label}
    </button>
  )
}

/* ── Styles ─────────────────────────────────────────────────── */

const card = {
  background: 'var(--white)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  padding: '24px',
  boxShadow: 'var(--shadow)',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}

const tabRow = {
  display: 'flex',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)',
  overflow: 'hidden',
  background: 'var(--card-bg)',
}

const tabBtn = active => ({
  flex: 1,
  padding: '10px 16px',
  border: 'none',
  background: active ? 'var(--white)' : 'transparent',
  color: active ? 'var(--text)' : 'var(--muted)',
  fontWeight: active ? 600 : 400,
  fontSize: 14,
  borderBottom: active ? '2px solid var(--green)' : '2px solid transparent',
  transition: 'var(--transition)',
})

const dropzone = (dragging, hasFile) => ({
  border: `2px dashed ${dragging || hasFile ? 'var(--green)' : '#d1d5db'}`,
  borderRadius: 'var(--radius-sm)',
  padding: '38px 20px',
  textAlign: 'center',
  cursor: 'pointer',
  background: dragging ? 'var(--green-dim)' : hasFile ? 'var(--green-dim)' : 'var(--card-bg)',
  transition: 'var(--transition)',
})

const uploadIcon = {
  width: 46,
  height: 46,
  background: 'var(--green-light)',
  color: 'var(--green-dark)',
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 14px',
}

const textarea = {
  width: '100%',
  background: 'var(--card-bg)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)',
  color: 'var(--text)',
  fontSize: 14,
  padding: '13px 14px',
  resize: 'vertical',
  outline: 'none',
  lineHeight: 1.65,
}

const accordion = {
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)',
  overflow: 'hidden',
}

const accordionHeader = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 15px',
  background: 'var(--card-bg)',
  border: 'none',
  fontSize: 13.5,
  fontWeight: 500,
  color: 'var(--text-mid)',
}

const acIcon = { fontSize: 15 }

const submitBtn = enabled => ({
  width: '100%',
  padding: '15px',
  border: 'none',
  borderRadius: 30,
  background: enabled
    ? 'linear-gradient(135deg, var(--green) 0%, var(--green-dark) 100%)'
    : 'var(--border)',
  color: enabled ? '#fff' : 'var(--muted)',
  fontWeight: 600,
  fontSize: 15,
  cursor: enabled ? 'pointer' : 'not-allowed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'var(--transition)',
  letterSpacing: '0.01em',
  boxShadow: enabled ? '0 4px 14px rgba(34,197,94,0.3)' : 'none',
})