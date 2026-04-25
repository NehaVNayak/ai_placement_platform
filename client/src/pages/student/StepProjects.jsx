import { useState } from "react";

const inputStyle = {
  width: "100%", padding: "12px 14px", borderRadius: "10px",
  border: "1.5px solid #e5e7eb", fontSize: "14px", color: "#111827",
  outline: "none", background: "#fff", boxSizing: "border-box",
  fontFamily: "inherit", transition: "border-color 0.2s",
};

function FocusInput({ style, icon, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      {icon && <span style={styles.icon}>{icon}</span>}
      <input
        style={{
          ...inputStyle,
          ...(icon ? { paddingLeft: "36px" } : {}),
          ...(focused ? { borderColor: "#16a34a", boxShadow: "0 0 0 3px rgba(22,163,74,0.1)" } : {}),
          ...style
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
    </div>
  );
}

function FocusTextarea({ style, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      style={{
        ...inputStyle, resize: "vertical", minHeight: "110px",
        ...(focused ? { borderColor: "#16a34a", boxShadow: "0 0 0 3px rgba(22,163,74,0.1)" } : {}),
        ...style
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
}

function FocusSelect({ children, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      style={{
        ...inputStyle, appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
        ...(focused ? { borderColor: "#16a34a", boxShadow: "0 0 0 3px rgba(22,163,74,0.1)" } : {}),
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    >{children}</select>
  );
}

const labelStyle = { display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" };
function Field({ label, children }) {
  return <div><label style={labelStyle}>{label}</label>{children}</div>;
}

const LinkIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

function StepProjects({ nextStep, prevStep, studentData, setStudentData }) {
  const [project, setProject] = useState({
    title: "", tech_stack: "", github_link: "", demo_link: "",
    team_size: "Solo Project", duration: "", description: "", features: "",
  });

  const addProject = () => {
    setStudentData({ ...studentData, projects: [...studentData.projects, project] });
    setProject({ title: "", tech_stack: "", github_link: "", demo_link: "", team_size: "Solo Project", duration: "", description: "", features: "" });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.folderIcon}>
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
            </svg>
          </div>
          <span style={styles.badgeText}>PORTFOLIO SHOWCASE</span>
        </div>
        <h2 style={styles.title}>Projects & Portfolio</h2>
        <p style={styles.subtitle}>Highlight your most impactful work to show recruiters your technical depth.</p>
      </div>

      <div style={styles.form}>
        <div style={styles.grid2}>
          <Field label="Project Title">
            <FocusInput placeholder="e.g., AI Logistics Optimizer" value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value })} />
          </Field>
          <Field label="Tech Stack">
            <FocusInput placeholder="e.g., Python, PyTorch, React" value={project.tech_stack} onChange={(e) => setProject({ ...project, tech_stack: e.target.value })} />
          </Field>
        </div>

        <div style={styles.grid2}>
          <Field label="GitHub Link">
            <FocusInput icon={<LinkIcon />} placeholder="github.com/username/project" value={project.github_link} onChange={(e) => setProject({ ...project, github_link: e.target.value })} />
          </Field>
          <Field label="Live Demo Link">
            <FocusInput icon={<GlobeIcon />} placeholder="project-demo.com" value={project.demo_link} onChange={(e) => setProject({ ...project, demo_link: e.target.value })} />
          </Field>
        </div>

        <div style={styles.grid2}>
          <Field label="Team Size">
            <FocusSelect value={project.team_size} onChange={(e) => setProject({ ...project, team_size: e.target.value })}>
              <option>Solo Project</option>
              <option>2 Members</option>
              <option>3-4 Members</option>
              <option>5+ Members</option>
            </FocusSelect>
          </Field>
          <Field label="Duration">
            <FocusInput placeholder="e.g., 3 months" value={project.duration} onChange={(e) => setProject({ ...project, duration: e.target.value })} />
          </Field>
        </div>

        <Field label="Project Description">
          <FocusTextarea
            placeholder="Explain the problem you solved and the impact of your solution..."
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
          />
        </Field>

        <Field label="Key Features">
          <FocusInput
            placeholder="e.g., Real-time data visualization, OAuth2 integration"
            value={project.features}
            onChange={(e) => setProject({ ...project, features: e.target.value })}
          />
        </Field>

        <button style={styles.addBtn} onClick={addProject}>
          <span style={styles.plusCircle}>+</span> Add Another Project
        </button>

        {studentData.projects.length > 0 && (
          <div style={styles.addedList}>
            {studentData.projects.map((p, i) => (
              <div key={i} style={styles.addedItem}>
                <div style={styles.addedNum}>{i + 1}</div>
                <div>
                  <p style={styles.addedTitle}>{p.title}</p>
                  <p style={styles.addedSub}>{p.tech_stack} · {p.duration}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={styles.footer}>
        <button style={styles.backBtn} onClick={prevStep}>← Back</button>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={styles.stepLabel}>Step 4 of 5</span>
          <button style={styles.continueBtn} onClick={nextStep}>Complete Profile →</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%", maxWidth: "720px", background: "#fff",
    borderRadius: "20px", boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
    overflow: "hidden", fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  header: { padding: "32px 36px 24px", borderBottom: "1px solid #f3f4f6" },
  headerLeft: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" },
  folderIcon: {
    width: "34px", height: "34px", background: "#dcfce7", borderRadius: "8px",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  badgeText: { fontSize: "11px", fontWeight: "700", color: "#16a34a", letterSpacing: "0.08em" },
  title: { fontSize: "26px", fontWeight: "800", color: "#111827", lineHeight: 1.2, marginBottom: "6px" },
  subtitle: { fontSize: "13px", color: "#6b7280" },
  form: { padding: "28px 36px", display: "flex", flexDirection: "column", gap: "18px" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  icon: {
    position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
    display: "flex", alignItems: "center", zIndex: 1,
  },
  addBtn: {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "12px 20px", background: "transparent",
    border: "1.5px dashed #d1fae5", borderRadius: "10px",
    color: "#16a34a", fontWeight: "600", fontSize: "14px",
    cursor: "pointer", fontFamily: "inherit", width: "fit-content",
  },
  plusCircle: {
    width: "22px", height: "22px", borderRadius: "50%", background: "#dcfce7",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontSize: "16px", lineHeight: 1,
  },
  addedList: { display: "flex", flexDirection: "column", gap: "10px" },
  addedItem: {
    display: "flex", alignItems: "center", gap: "12px",
    padding: "12px 16px", background: "#f0fdf4", borderRadius: "10px",
  },
  addedNum: {
    width: "28px", height: "28px", borderRadius: "50%", background: "#16a34a",
    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "12px", fontWeight: "700", flexShrink: 0,
  },
  addedTitle: { fontSize: "14px", fontWeight: "600", color: "#111827" },
  addedSub: { fontSize: "12px", color: "#6b7280", marginTop: "2px" },
  footer: {
    padding: "20px 36px", borderTop: "1px solid #f3f4f6",
    display: "flex", justifyContent: "space-between", alignItems: "center",
  },
  backBtn: {
    display: "flex", alignItems: "center", gap: "6px",
    padding: "10px 20px", border: "1.5px solid #e5e7eb", borderRadius: "99px",
    background: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: "600",
    color: "#374151", fontFamily: "inherit",
  },
  stepLabel: { fontSize: "13px", color: "#9ca3af", fontWeight: "500" },
  continueBtn: {
    padding: "12px 28px", background: "#16a34a", color: "#fff",
    border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: "700",
    cursor: "pointer", fontFamily: "inherit",
  },
};

export default StepProjects;