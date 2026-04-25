import { useState } from "react";
import StepBasic from "./student/StepBasic";
import StepEducation from "./student/StepEducation";
import StepExperience from "./student/StepExperience";
import StepProjects from "./student/StepProjects";
import StepSkills from "./student/StepSkills";

const STEPS = [
  { id: 1, label: "Basic Information", sub: "Identity & Contact" },
  { id: 2, label: "Education", sub: "Academic Details" },
  { id: 3, label: "Experience", sub: "Work History" },
  { id: 4, label: "Projects", sub: "Portfolio" },
  { id: 5, label: "Skills", sub: "Final Submission" },
];

const ICONS = {
  1: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  2: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  3: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  4: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  5: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
};

const CheckIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export function SidebarLayout({ step, children }) {
  return (
    <div style={styles.page}>
      {/* Left Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarTop}>
          <div style={styles.brand}>
            <div style={styles.brandIcon}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span style={styles.brandName}>PlacementPrep</span>
          </div>

          <div style={styles.sidebarHeading}>
            <p style={styles.sidebarSubtitle}>Placement Portal</p>
            <p style={styles.sidebarStepLabel}>Step {step} of 5</p>
          </div>

          <nav style={styles.nav}>
            {STEPS.map((s) => {
              const isCompleted = s.id < step;
              const isActive = s.id === step;
              const isUpcoming = s.id > step;
              return (
                <div key={s.id} style={{
                  ...styles.navItem,
                  ...(isActive ? styles.navItemActive : {}),
                  ...(isUpcoming ? styles.navItemUpcoming : {}),
                }}>
                  <div style={{
                    ...styles.navIcon,
                    ...(isCompleted ? styles.navIconCompleted : {}),
                    ...(isActive ? styles.navIconActive : {}),
                    ...(isUpcoming ? styles.navIconUpcoming : {}),
                  }}>
                    {isCompleted ? <CheckIcon /> : ICONS[s.id]}
                  </div>
                  <div>
                    {isUpcoming && <p style={styles.navStepNum}>STEP {s.id}</p>}
                    {isCompleted && <p style={{ ...styles.navStepNum, color: "#6ee7b7" }}>COMPLETED</p>}
                    {isActive && <p style={{ ...styles.navStepNum, color: "#86efac" }}>IN PROGRESS</p>}
                    <p style={{
                      ...styles.navLabel,
                      ...(isUpcoming ? styles.navLabelUpcoming : {}),
                    }}>{s.label}</p>
                  </div>
                  {isActive && <div style={styles.activePill} />}
                </div>
              );
            })}
          </nav>
        </div>

        <div style={styles.sidebarBottom}>
          <div style={styles.sidebarBg} />
        </div>
      </aside>

      {/* Right Content */}
      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: "#f0fdf4",
  },
  sidebar: {
    width: "300px",
    minWidth: "300px",
    background: "linear-gradient(160deg, #0f2d1a 0%, #0a1f12 60%, #071510 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "32px 24px",
    position: "relative",
    overflow: "hidden",
  },
  sidebarTop: { zIndex: 2, position: "relative" },
  brand: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" },
  brandIcon: {
    width: "36px", height: "36px", borderRadius: "10px",
    background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center",
  },
  brandName: { color: "#fff", fontWeight: "700", fontSize: "18px", letterSpacing: "-0.3px" },
  sidebarHeading: { marginBottom: "28px" },
  sidebarSubtitle: { color: "#6ee7b7", fontSize: "13px", fontWeight: "600", marginBottom: "2px" },
  sidebarStepLabel: { color: "#4ade80", fontSize: "12px" },
  nav: { display: "flex", flexDirection: "column", gap: "4px" },
  navItem: {
    display: "flex", alignItems: "center", gap: "12px",
    padding: "12px 14px", borderRadius: "12px", position: "relative",
    cursor: "pointer", transition: "background 0.2s",
  },
  navItemActive: { background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" },
  navItemUpcoming: { opacity: 0.5 },
  navIcon: {
    width: "36px", height: "36px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, color: "#fff",
  },
  navIconCompleted: { background: "#16a34a" },
  navIconActive: { background: "#16a34a" },
  navIconUpcoming: { background: "rgba(255,255,255,0.1)" },
  navStepNum: { fontSize: "10px", color: "#9ca3af", fontWeight: "600", letterSpacing: "0.05em", marginBottom: "1px" },
  navLabel: { color: "#fff", fontWeight: "600", fontSize: "14px" },
  navLabelUpcoming: { color: "#6b7280" },
  activePill: {
    position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
    width: "3px", height: "60%", background: "#4ade80", borderRadius: "0 2px 2px 0",
  },
  sidebarBottom: { position: "relative", height: "160px" },
  sidebarBg: {
    position: "absolute", bottom: 0, left: "-24px", right: "-24px",
    height: "160px",
    background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
  },
  main: {
    flex: 1,
    padding: "48px 60px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

// ─── Main StudentSignup ───────────────────────────────────────────────────────

function StudentSignup() {
  const [step, setStep] = useState(1);
  const [studentData, setStudentData] = useState({
    email: "", password: "", full_name: "", phone: "",
    linkedin: "", github: "", location: "", summary: "", resume: null,
    education: [], experience: [], projects: [],
  });

  const nextStep = () => setStep((p) => p + 1);
  const prevStep = () => setStep((p) => p - 1);

  return (
    <SidebarLayout step={step}>
      {step === 1 && <StepBasic nextStep={nextStep} studentData={studentData} setStudentData={setStudentData} />}
      {step === 2 && <StepEducation nextStep={nextStep} prevStep={prevStep} studentData={studentData} setStudentData={setStudentData} />}
      {step === 3 && <StepExperience nextStep={nextStep} prevStep={prevStep} studentData={studentData} setStudentData={setStudentData} />}
      {step === 4 && <StepProjects nextStep={nextStep} prevStep={prevStep} studentData={studentData} setStudentData={setStudentData} />}
      {step === 5 && <StepSkills prevStep={prevStep} studentData={studentData} setStudentData={setStudentData} />}
      {step > 5 && (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎉</div>
          <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#0f2d1a" }}>Signup Completed!</h2>
          <p style={{ color: "#6b7280", marginTop: "8px" }}>Your placement profile is ready.</p>
        </div>
      )}
    </SidebarLayout>
  );
}

export default StudentSignup;