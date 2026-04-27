export default function Navbar() {
  return (
    <nav style={navStyle}>
      <div style={inner}>
        <span style={logo}>Resume Analyzer</span>
      </div>
    </nav>
  )
}

const navStyle = {
  background: 'var(--bg)',
  borderBottom: '1px solid var(--border)',
  position: 'sticky',
  top: 0,
  zIndex: 100,
}

const inner = {
  maxWidth: 1100,
  margin: '0 auto',
  padding: '0 24px',
  height: 52,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const logo = {
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: 17,
  color: 'var(--text)',
  letterSpacing: '0.01em',
}