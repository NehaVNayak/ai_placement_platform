export default function Footer() {
  return (
    <footer style={footer}>
      <div style={inner}>
        <div style={centerBox}>
          <p style={logo}>Resume Analyzer</p>
          <p style={tagline}>© 2026 Resume Analyzer</p>
        </div>
      </div>
    </footer>
  )
}

const footer = {
  marginTop: 'auto',
  borderTop: '1px solid var(--border)',
  padding: '28px 24px',
  background: 'var(--bg)',
}

const inner = {
  maxWidth: 1100,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
}

const centerBox = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const logo = {
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: 15,
  marginBottom: 4,
}

const tagline = {
  fontSize: 12,
  color: 'var(--muted)',
}