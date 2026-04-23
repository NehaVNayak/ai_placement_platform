import { useNavigate } from "react-router-dom";

function LandingProject() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "</>",
      title: "Coding Practice",
      desc: "Interactive IDE with real-time AI hints for DSA and Competitive Programming challenges.",
    },
    {
      icon: "📄",
      title: "AI Resume Analyzer",
      desc: "Instant ATS scoring and content suggestions to make your profile stand out to recruiters.",
    },
    {
      icon: "🎤",
      title: "Mock Interviews",
      desc: "Simulate high-pressure technical and HR rounds with our realistic conversational AI.",
    },
    {
      icon: "📊",
      title: "Performance Tracking",
      desc: "Detailed heatmaps and skill-gap analysis to focus your efforts where they matter most.",
    },
    {
      icon: "🎓",
      title: "Placement Curriculum",
      desc: "Structured learning paths designed by industry veterans from Tier-1 tech firms.",
    },
    {
      icon: "🏢",
      title: "Company Specific Prep",
      desc: "Targeted question banks for FAANG, BigN, and high-growth unicorn startups.",
    },
  ];

  const stats = [
    { number: "5000+", label: "Students Enrolled" },
    { number: "150+", label: "Partner Companies" },
    { number: "1000+", label: "Prep Questions" },
    { number: "95%", label: "Success Rate" },
  ];

  const steps = [
    { num: "1", title: "Create Profile", desc: "Upload your resume and set your dream career targets." },
    { num: "2", title: "Practice Daily", desc: "Engage with adaptive challenges curated by our AI engine." },
    { num: "3", title: "Get AI Feedback", desc: "Receive granular feedback on your code and interview answers." },
    { num: "4", title: "Crack Placements", desc: "Step into interviews with absolute confidence and data-backed skills." },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      company: "Placed at Google",
      avatar: "PS",
      quote: "The AI Interview feedback was a game-changer. It caught nuances in my communication that no manual review ever could. Highly recommended for elite prep!",
    },
    {
      name: "Rahul Verma",
      company: "Placed at Microsoft",
      avatar: "RV",
      quote: "From resume analysis to company-specific mock tests, this platform covers everything. I feel 10x more prepared during my actual interview rounds.",
    },
  ];

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logoWrap}>
          <span style={styles.logoDot}>●</span>
          <span style={styles.logoText}>AI Placement Prep</span>
        </div>

        <div style={styles.navLinks}>
          <span style={styles.navLinkActive}>Home</span>
          <span style={styles.navLink}>Features</span>
          <span style={styles.navLink}>Timeline</span>
          <span style={styles.navLink}>Success Stories</span>
          <span style={styles.navLink}>Pricing</span>
        </div>

        <div style={styles.navActions}>
          <button style={styles.loginBtn} onClick={() => navigate("/login")}>
            Login
          </button>
          <button style={styles.getStartedBtn} onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.badge}>
            <span style={styles.badgeDot}>→</span> THE FUTURE OF PLACEMENT PREPARATION
          </div>

          <h1 style={styles.heroTitle}>
            Crack<br />
            Placements<br />
            with AI 🚀
          </h1>

          <p style={styles.heroSubtitle}>Smarter Practice. Faster Growth.</p>

          <p style={styles.heroText}>
            The only platform that combines massive question
            banks with real-time AI feedback to accelerate your
            career journey.
          </p>

          <div style={styles.heroBtns}>
            <button style={styles.primaryBtn} onClick={() => navigate("/register")}>
              Start Free Today →
            </button>
            <button style={styles.secondaryBtn}>
              ▶ Watch Demo
            </button>
          </div>
        </div>

        <div style={styles.heroRight}>
          <div style={styles.dashboardCard}>
            <div style={styles.dashboardHeader}>
              <div>
                <div style={styles.dashboardTitle}>Student Dashboard</div>
                <div style={styles.dashboardSub}>Alex Kim, B.Tech, 5th Sem</div>
              </div>
              <div style={styles.dashboardBadge}>
                <span style={styles.badgeGreen}>●</span> Algorithms Specialist
              </div>
            </div>

            <div style={styles.scoreRow}>
              <div style={styles.scoreBox}>
                <div style={styles.scoreLabel}>READINESS SCORE</div>
                <div style={styles.scoreValue}>82%</div>
              </div>
              <div style={styles.scoreBox}>
                <div style={styles.scoreLabel}>RESUME SCORE</div>
                <div style={styles.scoreValue}>88</div>
              </div>
            </div>

            <div style={styles.aiPromptBox}>
              <div style={styles.aiAvatar}>🖼</div>
              <div style={styles.aiText}>Is this the top DSA problem today on Google SDE front?</div>
            </div>

            <div style={styles.performanceTag}>PERFORMANCE TREND →</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={styles.statsSection}>
        {stats.map((item, index) => (
          <div key={index} style={styles.statCard}>
            <h2 style={styles.statNumber}>{item.number}</h2>
            <p style={styles.statLabel}>{item.label}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section style={styles.featureSection}>
        <h2 style={styles.sectionTitle}>Powerful Tools for Your Peak Potential</h2>
        <p style={styles.sectionSub}>Master every stage of the placement cycle with our comprehensive AI-driven suite.</p>

        <div style={styles.grid}>
          {features.map((item, index) => (
            <div key={index} style={styles.featureCard}>
              <div style={styles.featureIconBox}>
                <span style={styles.featureIcon}>{item.icon}</span>
              </div>
              <h3 style={styles.featureTitle}>{item.title}</h3>
              <p style={styles.featureDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section style={styles.roadmapSection}>
        <h2 style={styles.sectionTitle}>The Roadmap to Success</h2>

        <div style={styles.stepsRow}>
          {steps.map((step, index) => (
            <div key={index} style={styles.stepItem}>
              <div style={styles.stepNum}>{step.num}</div>
              {index < steps.length - 1 && <div style={styles.stepLine} />}
              <h4 style={styles.stepTitle}>{step.title}</h4>
              <p style={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={styles.testimonialsSection}>
        <h2 style={styles.sectionTitle}>Voices of Success</h2>

        <div style={styles.testimonialsGrid}>
          {testimonials.map((t, i) => (
            <div key={i} style={styles.testimonialCard}>
              <div style={styles.quoteIcon}>"</div>
              <div style={styles.testimonialHeader}>
                <div style={styles.avatarCircle}>{t.avatar}</div>
                <div>
                  <div style={styles.testimonialName}>{t.name}</div>
                  <div style={styles.testimonialCompany}>{t.company}</div>
                </div>
              </div>
              <p style={styles.testimonialText}>"{t.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaWrapper}>
        <div style={styles.cta}>
          <h2 style={styles.ctaTitle}>Ready to Get Placed?</h2>
          <p style={styles.ctaText}>Join 5000+ students who are already using AI to secure their dream tech roles.</p>
          <button style={styles.ctaBtn} onClick={() => navigate("/register")}>
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div style={styles.footerBrand}>
            <div style={styles.footerLogo}>
              <span style={styles.logoDot}>●</span> AI Placement Prep
            </div>
            <p style={styles.footerBrandText}>
              Accelerate Business through Intelligence. Empowering the next generation of engineers with cutting-edge AI mentorship.
            </p>
          </div>

          <div style={styles.footerCol}>
            <div style={styles.footerColTitle}>PRODUCT</div>
            <div style={styles.footerLinks}>
              <span style={styles.footerLink}>Features</span>
              <span style={styles.footerLink}>Pricing</span>
              <span style={styles.footerLink}>Documentation</span>
              <span style={styles.footerLink}>Roadmap</span>
            </div>
          </div>

          <div style={styles.footerCol}>
            <div style={styles.footerColTitle}>RESOURCES</div>
            <div style={styles.footerLinks}>
              <span style={styles.footerLink}>Success Stories</span>
              <span style={styles.footerLink}>Interview Guide</span>
              <span style={styles.footerLink}>DSA Cheat Sheet</span>
              <span style={styles.footerLink}>API Docs</span>
            </div>
          </div>

          <div style={styles.footerCol}>
            <div style={styles.footerColTitle}>LEGAL</div>
            <div style={styles.footerLinks}>
              <span style={styles.footerLink}>Privacy Policy</span>
              <span style={styles.footerLink}>Terms of Service</span>
              <span style={styles.footerLink}>Cookie Policy</span>
              <span style={styles.footerLink}>Contact Us</span>
            </div>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <span>© 2026 AI Placement Prep. All rights reserved.</span>
          <div style={styles.socialIcons}>
            <span style={styles.socialIcon}>𝕏</span>
            <span style={styles.socialIcon}>in</span>
            <span style={styles.socialIcon}>f</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    background: "#ffffff",
    minHeight: "100vh",
    color: "#1a1a1a",
  },

  /* ── Navbar ── */
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 48px",
    background: "#ffffff",
    borderBottom: "1px solid #f0f0f0",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logoDot: {
    color: "#198754",
    fontSize: "14px",
  },
  logoText: {
    fontWeight: "700",
    fontSize: "16px",
    color: "#0f2d14",
  },
  navLinks: {
    display: "flex",
    gap: "28px",
    fontSize: "14px",
  },
  navLinkActive: {
    color: "#0f2d14",
    fontWeight: "600",
    cursor: "pointer",
    borderBottom: "2px solid #198754",
    paddingBottom: "2px",
  },
  navLink: {
    color: "#555",
    cursor: "pointer",
  },
  navActions: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  loginBtn: {
    padding: "8px 16px",
    border: "none",
    background: "transparent",
    color: "#333",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  getStartedBtn: {
    padding: "9px 18px",
    border: "none",
    background: "#0f2d14",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },

  /* ── Hero ── */
  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "60px 48px 50px",
    gap: "40px",
    flexWrap: "wrap",
  },
  heroLeft: {
    maxWidth: "480px",
    flex: "1 1 400px",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#f0faf4",
    border: "1px solid #b7dfca",
    borderRadius: "20px",
    padding: "5px 14px",
    fontSize: "11px",
    color: "#198754",
    fontWeight: "600",
    letterSpacing: "0.5px",
    marginBottom: "22px",
  },
  badgeDot: {
    fontSize: "12px",
  },
  heroTitle: {
    fontSize: "54px",
    fontWeight: "800",
    color: "#0a0a0a",
    lineHeight: "1.12",
    marginBottom: "14px",
    letterSpacing: "-1px",
  },
  heroSubtitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#198754",
    marginBottom: "14px",
  },
  heroText: {
    fontSize: "15px",
    color: "#555",
    lineHeight: "1.75",
    marginBottom: "28px",
  },
  heroBtns: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    padding: "13px 24px",
    background: "#198754",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
  },
  secondaryBtn: {
    padding: "13px 22px",
    background: "white",
    border: "1px solid #ddd",
    color: "#333",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
  },
  heroRight: {
    flex: "1 1 340px",
    display: "flex",
    justifyContent: "center",
  },
  dashboardCard: {
    background: "white",
    padding: "24px",
    borderRadius: "18px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
    width: "340px",
    border: "1px solid #f0f0f0",
  },
  dashboardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "18px",
  },
  dashboardTitle: {
    fontWeight: "700",
    fontSize: "15px",
    color: "#0f2d14",
  },
  dashboardSub: {
    fontSize: "12px",
    color: "#888",
    marginTop: "2px",
  },
  dashboardBadge: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    background: "#f0faf4",
    borderRadius: "12px",
    padding: "4px 10px",
    fontSize: "11px",
    color: "#198754",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  badgeGreen: {
    color: "#198754",
    fontSize: "10px",
  },
  scoreRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "16px",
  },
  scoreBox: {
    background: "#f8faf8",
    borderRadius: "12px",
    padding: "14px 16px",
    border: "1px solid #e8f5ee",
  },
  scoreLabel: {
    fontSize: "9px",
    color: "#888",
    fontWeight: "700",
    letterSpacing: "0.5px",
    marginBottom: "4px",
  },
  scoreValue: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#0f2d14",
  },
  aiPromptBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#f8f8f8",
    borderRadius: "10px",
    padding: "10px 14px",
    marginBottom: "12px",
  },
  aiAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "#e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    flexShrink: 0,
  },
  aiText: {
    fontSize: "12px",
    color: "#555",
    lineHeight: "1.5",
  },
  performanceTag: {
    fontSize: "11px",
    color: "#198754",
    fontWeight: "700",
    cursor: "pointer",
  },

  /* ── Stats ── */
  statsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "16px",
    padding: "20px 48px 40px",
  },
  statCard: {
    background: "white",
    padding: "24px 20px",
    borderRadius: "14px",
    textAlign: "center",
    border: "1px solid #f0f0f0",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
  },
  statNumber: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#0f2d14",
    margin: "0 0 4px",
  },
  statLabel: {
    fontSize: "13px",
    color: "#888",
    margin: 0,
  },

  /* ── Features ── */
  featureSection: {
    padding: "60px 48px",
    background: "#fafafa",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "800",
    color: "#0a0a0a",
    marginBottom: "10px",
    letterSpacing: "-0.5px",
  },
  sectionSub: {
    textAlign: "center",
    fontSize: "15px",
    color: "#777",
    marginBottom: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    maxWidth: "980px",
    margin: "0 auto",
  },
  featureCard: {
    background: "white",
    padding: "26px 24px",
    borderRadius: "16px",
    border: "1px solid #f0f0f0",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
  },
  featureIconBox: {
    width: "40px",
    height: "40px",
    background: "#0f2d14",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "14px",
  },
  featureIcon: {
    fontSize: "18px",
    color: "white",
  },
  featureTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#0a0a0a",
    marginBottom: "8px",
  },
  featureDesc: {
    fontSize: "13px",
    color: "#666",
    lineHeight: "1.65",
    margin: 0,
  },

  /* ── Roadmap ── */
  roadmapSection: {
    padding: "70px 48px",
    background: "#ffffff",
  },
  stepsRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "0",
    maxWidth: "860px",
    margin: "50px auto 0",
    flexWrap: "wrap",
  },
  stepItem: {
    flex: "1 1 180px",
    textAlign: "center",
    position: "relative",
    padding: "0 16px",
  },
  stepNum: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    border: "2px solid #c8e6d4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
    fontSize: "18px",
    fontWeight: "700",
    color: "#198754",
    background: "white",
    position: "relative",
    zIndex: 1,
  },
  stepLine: {
    position: "absolute",
    top: "24px",
    left: "calc(50% + 24px)",
    right: "calc(-50% + 24px)",
    height: "2px",
    background: "#e0f0e8",
  },
  stepTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#0a0a0a",
    marginBottom: "8px",
  },
  stepDesc: {
    fontSize: "13px",
    color: "#777",
    lineHeight: "1.6",
    margin: 0,
  },

  /* ── Testimonials ── */
  testimonialsSection: {
    padding: "70px 48px",
    background: "#fafafa",
  },
  testimonialsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    maxWidth: "820px",
    margin: "40px auto 0",
  },
  testimonialCard: {
    background: "white",
    padding: "28px",
    borderRadius: "16px",
    border: "1px solid #f0f0f0",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    position: "relative",
  },
  quoteIcon: {
    position: "absolute",
    top: "20px",
    right: "24px",
    fontSize: "48px",
    color: "#e8f5ee",
    fontFamily: "Georgia, serif",
    lineHeight: 1,
  },
  testimonialHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  avatarCircle: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#0f2d14",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "14px",
    flexShrink: 0,
  },
  testimonialName: {
    fontWeight: "700",
    fontSize: "15px",
    color: "#0a0a0a",
  },
  testimonialCompany: {
    fontSize: "12px",
    color: "#198754",
    fontWeight: "600",
  },
  testimonialText: {
    fontSize: "13px",
    color: "#555",
    lineHeight: "1.75",
    margin: 0,
    fontStyle: "italic",
  },

  /* ── CTA ── */
  ctaWrapper: {
    padding: "40px 48px",
    background: "#ffffff",
  },
  cta: {
    background: "#0f2d14",
    color: "white",
    textAlign: "center",
    padding: "70px 40px",
    borderRadius: "24px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  ctaTitle: {
    fontSize: "38px",
    fontWeight: "800",
    marginBottom: "14px",
    letterSpacing: "-0.5px",
  },
  ctaText: {
    fontSize: "15px",
    color: "#a8c5b5",
    marginBottom: "30px",
  },
  ctaBtn: {
    padding: "14px 32px",
    background: "#198754",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
  },

  /* ── Footer ── */
  footer: {
    background: "#0f2d14",
    color: "white",
    padding: "50px 48px 24px",
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: "40px",
    marginBottom: "40px",
    flexWrap: "wrap",
  },
  footerBrand: {
    maxWidth: "260px",
  },
  footerLogo: {
    fontWeight: "700",
    fontSize: "16px",
    marginBottom: "14px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  footerBrandText: {
    fontSize: "13px",
    color: "#7aab8a",
    lineHeight: "1.75",
    margin: 0,
  },
  footerCol: {},
  footerColTitle: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1px",
    color: "#7aab8a",
    marginBottom: "14px",
  },
  footerLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  footerLink: {
    fontSize: "13px",
    color: "#c8ddd0",
    cursor: "pointer",
  },
  footerBottom: {
    borderTop: "1px solid #1f4a2a",
    paddingTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "12px",
    color: "#7aab8a",
    flexWrap: "wrap",
    gap: "10px",
  },
  socialIcons: {
    display: "flex",
    gap: "14px",
  },
  socialIcon: {
    width: "28px",
    height: "28px",
    border: "1px solid #2d5a3a",
    borderRadius: "6px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "13px",
    color: "#7aab8a",
  },
};

export default LandingProject;