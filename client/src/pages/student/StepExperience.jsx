import { useState } from "react";

const inputStyle = {
  width: "100%", padding: "12px 14px", borderRadius: "10px",
  border: "1.5px solid #e5e7eb", fontSize: "14px", color: "#111827",
  outline: "none", background: "#fff", boxSizing: "border-box",
  fontFamily: "inherit", transition: "border-color 0.2s",
};

function FocusInput({ style, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      style={{ ...inputStyle, ...(focused ? { borderColor: "#16a34a", boxShadow: "0 0 0 3px rgba(22,163,74,0.1)" } : {}), ...style }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
}

function FocusTextarea({ style, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      style={{
        ...inputStyle, resize: "vertical", minHeight: "100px",
        ...(focused ? { borderColor: "#16a34a", boxShadow: "0 0 0 3px rgba(22,163,74,0.1)" } : {}),
        ...style
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
}

const labelStyle = { display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" };
function Field({ label, children }) {
  return <div><label style={labelStyle}>{label}</label>{children}</div>;
}

function StepExperience({ nextStep, prevStep, studentData, setStudentData }) {
  const [exp, setExp] = useState({ company: "", role: "", duration: "", description: "" });

  const addExperience = () => {
    setStudentData({ ...studentData, experience: [...studentData.experience, exp] });
    setExp({ company: "", role: "", duration: "", description: "" });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.iconHeader}>
        <div style={styles.iconCircle}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <div style={styles.badgeRow}>
            <span style={styles.badge}>💼 WORK HISTORY</span>
          </div>
          <h2 style={styles.title}>Work Experience</h2>
          <p style={styles.subtitle}>Add internships, jobs, or freelance projects that showcase your skills.</p>
        </div>
      </div>

      <div style={styles.form}>
        <div style={styles.grid2}>
          <Field label="Company / Organization">
            <FocusInput
              placeholder="e.g. Google, TCS, Startup Inc."
              value={exp.company}
              onChange={(e) => setExp({ ...exp, company: e.target.value })}
            />
          </Field>
          <Field label="Role / Position">
            <FocusInput
              placeholder="e.g. Software Engineer Intern"
              value={exp.role}
              onChange={(e) => setExp({ ...exp, role: e.target.value })}
            />
          </Field>
        </div>

        <Field label="Duration">
          <FocusInput
            placeholder="e.g. June 2023 – Aug 2023 (3 months)"
            value={exp.duration}
            onChange={(e) => setExp({ ...exp, duration: e.target.value })}
          />
        </Field>

        <Field label="Key Responsibilities & Achievements">
          <FocusTextarea
            placeholder="Describe what you built, the impact you made, technologies used..."
            value={exp.description}
            onChange={(e) => setExp({ ...exp, description: e.target.value })}
            style={{ minHeight: "120px" }}
          />
        </Field>

        <button style={styles.addBtn} onClick={addExperience}>
          <span>+</span> Add Another Experience
        </button>

        {studentData.experience.length > 0 && (
          <div style={styles.addedList}>
            {studentData.experience.map((e, i) => (
              <div key={i} style={styles.addedItem}>
                <div style={styles.addedIconWrap}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p style={styles.addedTitle}>{e.role} <span style={{ color: "#6b7280" }}>@ {e.company}</span></p>
                  <p style={styles.addedSub}>{e.duration}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {studentData.experience.length === 0 && (
          <div style={styles.skipNote}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>No experience yet? That's okay — you can skip this step.</span>
          </div>
        )}
      </div>

      <div style={styles.footer}>
        <button style={styles.backBtn} onClick={prevStep}>← Back</button>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={styles.saveDraftBtn}>Save Draft</button>
          <button style={styles.continueBtn} onClick={nextStep}>Continue →</button>
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
  iconHeader: {
    display: "flex", alignItems: "flex-start", gap: "16px",
    padding: "32px 36px 24px", borderBottom: "1px solid #f3f4f6",
  },
  iconCircle: {
    width: "52px", height: "52px", borderRadius: "14px",
    background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, marginTop: "4px",
  },
  badgeRow: { marginBottom: "6px" },
  badge: { fontSize: "11px", fontWeight: "700", color: "#16a34a", letterSpacing: "0.08em" },
  title: { fontSize: "26px", fontWeight: "800", color: "#111827", lineHeight: 1.2 },
  subtitle: { fontSize: "13px", color: "#6b7280", marginTop: "4px" },
  form: { padding: "28px 36px", display: "flex", flexDirection: "column", gap: "18px" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  addBtn: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "11px 20px", background: "transparent",
    border: "1.5px dashed #d1fae5", borderRadius: "10px",
    color: "#16a34a", fontWeight: "600", fontSize: "14px",
    cursor: "pointer", fontFamily: "inherit", width: "fit-content",
  },
  addedList: { display: "flex", flexDirection: "column", gap: "10px" },
  addedItem: {
    display: "flex", alignItems: "center", gap: "12px",
    padding: "12px 16px", background: "#f0fdf4", borderRadius: "10px",
  },
  addedIconWrap: { flexShrink: 0 },
  addedTitle: { fontSize: "14px", fontWeight: "600", color: "#111827" },
  addedSub: { fontSize: "12px", color: "#6b7280", marginTop: "2px" },
  skipNote: {
    display: "flex", alignItems: "center", gap: "8px",
    fontSize: "13px", color: "#9ca3af",
    padding: "10px 14px", background: "#f9fafb", borderRadius: "8px",
  },
  footer: {
    padding: "20px 36px", borderTop: "1px solid #f3f4f6",
    display: "flex", justifyContent: "space-between", alignItems: "center",
  },
  backBtn: {
    padding: "10px 20px", border: "none", background: "transparent",
    cursor: "pointer", fontSize: "14px", fontWeight: "600", color: "#374151", fontFamily: "inherit",
  },
  saveDraftBtn: {
    padding: "10px 20px", border: "1.5px solid #e5e7eb", borderRadius: "10px",
    background: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: "600",
    color: "#374151", fontFamily: "inherit",
  },
  continueBtn: {
    padding: "12px 28px", background: "#16a34a", color: "#fff",
    border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: "700",
    cursor: "pointer", fontFamily: "inherit",
  },
};

export default StepExperience;