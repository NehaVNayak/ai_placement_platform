import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, Tooltip
} from 'recharts'

export default function ResultsPanel({ result }) {
  const {
    predicted_role, confidence, confidence_label,
    word_count, jd_provided, scores, suggestions
  } = result

  const radarData = [
    { subject: 'Technical',  score: scores.technical },
    { subject: 'Soft Skills',score: scores.soft },
    { subject: 'Verbs',      score: scores.action_verbs },
    { subject: 'Length',     score: scores.length },
    { subject: 'ATS',        score: scores.ats },
  ]

  return (
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>

      {/* ── Row 1: Three-column grid ── */}
      <div className="results-grid" style={resultsGrid}>

        {/* Circular score */}
        <div style={scoreCard}>
          <p style={scoreEyebrow}>ACADEMIC ALIGNMENT SCORE</p>
          <CircleScore value={scores.overall} />
          <div style={matchBadge(scores.overall)}>
            {candidacyLabel(scores.overall)}
          </div>
          <div style={metaGrid}>
            <MetaCell label="TARGET RANK"   value={predicted_role} />
            <MetaCell label="RELIABILITY"   value={`${confidence}%`} />
          </div>
        </div>

        {/* Performance bars */}
        <div style={metricsCard}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h3 style={cardTitle}>Structural Portfolio Metrics</h3>
            {jd_provided && (
              <span style={jdBadge}>✓ Institutional alignment active</span>
            )}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <ScoreBar label="Research Contributions"  value={scores.technical}    />
            <ScoreBar label="Instructional Excellence" value={scores.soft}         />
            <ScoreBar label="Publication Prestige"     value={scores.action_verbs} />
            <ScoreBar label="Scholarly Keywords"       value={scores.ats}          />
          </div>
        </div>

        {/* Radar */}
        <div style={radarCard}>
          <ResponsiveContainer width="100%" height={210}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="68%">
              <PolarGrid stroke="#e2e0d8" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill:'#9ca3af', fontSize:11, fontFamily:'DM Sans, sans-serif' }}
              />
              <Radar
                dataKey="score"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.18}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #e2e0d8',
                  borderRadius: 8,
                  fontSize: 13,
                  fontFamily: 'DM Sans, sans-serif',
                }}
                formatter={v => [`${v}/100`, 'Score']}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Row 2: Suggestions ── */}
      <div style={sugCard}>
        <h3 style={{ ...cardTitle, marginBottom: 20 }}>Strategic Scholarly Recommendations</h3>
        <div className="suggestions-grid" style={sugGrid}>
          {suggestions.map((s, i) => <SuggestionCard key={i} index={i} suggestion={
          typeof s === 'string' ? { title: s, detail: '' } : s
        } />)}
        </div>
      </div>
    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────────── */

function CircleScore({ value }) {
  const r    = 46
  const circ = 2 * Math.PI * r
  const off  = circ - (value / 100) * circ

  return (
    <div style={{ position:'relative', width:130, height:130, margin:'14px auto 10px' }}>
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={r} fill="none" stroke="#e2e0d8" strokeWidth="9"/>
        <circle
          cx="65" cy="65" r={r} fill="none"
          stroke="#22c55e" strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={off}
          transform="rotate(-90 65 65)"
          style={{ transition:'stroke-dashoffset 1.2s ease' }}
        />
      </svg>
      <div style={scoreLabel}>{value}</div>
    </div>
  )
}

function ScoreBar({ label, value }) {
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:13 }}>
        <span style={{ color:'var(--text-mid)' }}>{label}</span>
        <span style={{ fontWeight:600, color:'var(--text)' }}>{value}%</span>
      </div>
      <div style={barTrack}>
        <div style={barFill(value)} />
      </div>
    </div>
  )
}

function MetaCell({ label, value }) {
  return (
    <div style={metaCellStyle}>
      <p style={metaLabel}>{label}</p>
      <p style={metaValue}>{value}</p>
    </div>
  )
}

function SuggestionCard({ index, suggestion }) {
  // suggestion is already {title, detail} — use it directly
  const colors = ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d']
  const color  = colors[index % colors.length]

  // Severity badge logic
  const isWarning = suggestion.title?.toLowerCase().includes('missing') ||
                    suggestion.title?.toLowerCase().includes('no ') ||
                    suggestion.title?.toLowerCase().includes('unclear')

  return (
    <div style={sugItem(color)}>
      <div style={sugNum(color)}>{index + 1}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>
            {suggestion.title}
          </p>
          <span style={severityBadge(isWarning)}>
            {isWarning ? 'Fix' : 'Improve'}
          </span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
          {suggestion.detail}
        </p>
      </div>
    </div>
  )
}

const severityBadge = isWarning => ({
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.08em',
  padding: '2px 7px',
  borderRadius: 12,
  background: isWarning ? '#fef2f2' : '#f0fdf4',
  color: isWarning ? '#b91c1c' : '#15803d',
  flexShrink: 0,
})

/* ── Helpers ─────────────────────────────────────────────────── */

function candidacyLabel(s) {
  if (s >= 80) return 'OPTIMAL CANDIDACY'
  if (s >= 65) return 'STRONG CANDIDACY'
  if (s >= 50) return 'MODERATE CANDIDACY'
  return 'NEEDS DEVELOPMENT'
}

/* ── Styles ─────────────────────────────────────────────────── */

const cardBase = {
  background: 'var(--white)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  padding: '24px',
  boxShadow: 'var(--shadow)',
}

const resultsGrid = {
  display: 'grid',
  gridTemplateColumns: '210px 1fr 220px',
  gap: 18,
  marginBottom: 18,
  alignItems: 'start',
}

const scoreCard    = { ...cardBase, textAlign:'center' }
const metricsCard  = { ...cardBase }
const radarCard    = { ...cardBase, display:'flex', alignItems:'center', justifyContent:'center' }
const sugCard      = { ...cardBase }

const scoreEyebrow = {
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '0.12em',
  color: 'var(--muted)',
  textTransform: 'uppercase',
}

const scoreLabel = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'var(--font-display)',
  fontSize: 30,
  fontWeight: 700,
  color: 'var(--text)',
}

const matchBadge = score => ({
  display: 'inline-block',
  padding: '4px 12px',
  borderRadius: 20,
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.09em',
  background: score >= 65 ? 'var(--green-light)' : '#fef9c3',
  color: score >= 65 ? 'var(--green-deeper)' : '#92400e',
  marginBottom: 16,
})

const metaGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 8,
  borderTop: '1px solid var(--border)',
  paddingTop: 14,
}

const metaCellStyle = {
  background: 'var(--card-bg)',
  borderRadius: 6,
  padding: '9px 10px',
  textAlign: 'left',
}

const metaLabel = {
  fontSize: 9,
  fontWeight: 600,
  letterSpacing: '0.1em',
  color: 'var(--muted-light)',
  textTransform: 'uppercase',
  marginBottom: 3,
}

const metaValue = {
  fontSize: 13,
  fontWeight: 700,
  color: 'var(--text)',
  wordBreak: 'break-word',
}

const cardTitle = {
  fontFamily: 'var(--font-display)',
  fontSize: 18,
  fontWeight: 700,
  color: 'var(--text)',
}

const jdBadge = {
  fontSize: 11,
  color: 'var(--green-deeper)',
  background: 'var(--green-light)',
  padding: '4px 10px',
  borderRadius: 20,
  fontWeight: 500,
  whiteSpace: 'nowrap',
}

const barTrack = {
  height: 6,
  background: 'var(--card-bg)',
  borderRadius: 3,
  overflow: 'hidden',
  border: '1px solid var(--border)',
}

const barFill = value => ({
  height: '100%',
  width: `${value}%`,
  background: 'linear-gradient(90deg, var(--green) 0%, var(--green-dark) 100%)',
  borderRadius: 3,
  transition: 'width 1.1s cubic-bezier(0.4,0,0.2,1)',
})

const sugGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: 16,
}

const sugItem = color => ({
  display: 'flex',
  gap: 14,
  alignItems: 'flex-start',
  padding: '16px',
  background: 'var(--card-bg)',
  borderRadius: 'var(--radius-sm)',
  borderLeft: `3px solid ${color}`,
  animation: 'fadeUp 0.4s ease both',
})

const sugNum = color => ({
  width: 28,
  height: 28,
  borderRadius: '50%',
  background: color,
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  fontSize: 13,
  flexShrink: 0,
})