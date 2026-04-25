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

function FocusSelect({ style, children, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      style={{
        ...inputStyle, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
        ...(focused ? { borderColor: "#16a34a", boxShadow: "0 0 0 3px rgba(22,163,74,0.1)" } : {}), ...style
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    >
      {children}
    </select>
  );
}

const labelStyle = { display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" };

function Field({ label, children }) {
  return <div><label style={labelStyle}>{label}</label>{children}</div>;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);

function StepEducation({ nextStep, prevStep, studentData, setStudentData }) {
  const [edu, setEdu] = useState({
    institution: "", degree: "", branch: "", cgpa: "",
    twelfth: "", tenth: "",
    startYear: "2020", endYear: "2024",
  });

  const addEducation = () => {
    setStudentData({ ...studentData, education: [...studentData.education, edu] });
    setEdu({ institution: "", degree: "", branch: "", cgpa: "", twelfth: "", tenth: "", startYear: "2020", endYear: "2024" });
  };

  return (
    <div style={styles.wrapper}>
      {/* Icon Header */}
      <div style={styles.iconHeader}>
        <div style={styles.iconCircle}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        </div>
        <div>
          <h2 style={styles.title}>Education Details</h2>
          <p style={styles.subtitle}>Tell us about your academic achievements and current studies.</p>
        </div>
      </div>

      {/* Form */}
      <div style={styles.form}>
        <Field label="College/University Name">
          <FocusInput
            placeholder="e.g. Stanford University"
            value={edu.institution}
            onChange={(e) => setEdu({ ...edu, institution: e.target.value })}
          />
        </Field>

        <div style={styles.grid2}>
          <Field label="Degree">
            <FocusInput
              placeholder="e.g. Bachelor of Technology"
              value={edu.degree}
              onChange={(e) => setEdu({ ...edu, degree: e.target.value })}
            />
          </Field>
          <Field label="Branch/Stream">
            <FocusInput
              placeholder="e.g. Computer Science"
              value={edu.branch}
              onChange={(e) => setEdu({ ...edu, branch: e.target.value })}
            />
          </Field>
        </div>

        <div style={styles.grid2}>
          <Field label="Start Year">
            <FocusSelect value={edu.startYear} onChange={(e) => setEdu({ ...edu, startYear: e.target.value })}>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </FocusSelect>
          </Field>
          <Field label="End Year (Expected)">
            <FocusSelect value={edu.endYear} onChange={(e) => setEdu({ ...edu, endYear: e.target.value })}>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </FocusSelect>
          </Field>
        </div>

        <Field label="Current CGPA/Percentage">
          <FocusInput
            placeholder="e.g. 3.8 or 85%"
            value={edu.cgpa}
            onChange={(e) => setEdu({ ...edu, cgpa: e.target.value })}
            style={{ maxWidth: "320px" }}
          />
        </Field>

        <div style={styles.grid2}>
          <Field label="12th Percentage">
            <FocusInput
              placeholder="e.g. 92%"
              value={edu.twelfth}
              onChange={(e) => setEdu({ ...edu, twelfth: e.target.value })}
            />
          </Field>
          <Field label="10th Percentage">
            <FocusInput
              placeholder="e.g. 95%"
              value={edu.tenth}
              onChange={(e) => setEdu({ ...edu, tenth: e.target.value })}
            />
          </Field>
        </div>

        <button style={styles.addBtn} onClick={addEducation}>
          <span style={styles.addPlus}>+</span> Add Another Education
        </button>

        {studentData.education.length > 0 && (
          <div style={styles.addedList}>
            {studentData.education.map((e, i) => (
              <div key={i} style={styles.addedItem}>
                <div style={styles.addedDot} />
                <div>
                  <p style={styles.addedTitle}>{e.institution}</p>
                  <p style={styles.addedSub}>{e.degree} · {e.branch} · {e.startYear}–{e.endYear}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <button style={styles.backBtn} onClick={prevStep}>← Back</button>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
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
    display: "flex", alignItems: "center", gap: "16px",
    padding: "32px 36px 24px",
    borderBottom: "1px solid #f3f4f6",
  },
  iconCircle: {
    width: "52px", height: "52px", borderRadius: "14px",
    background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  title: { fontSize: "26px", fontWeight: "800", color: "#111827", lineHeight: 1.2 },
  subtitle: { fontSize: "13px", color: "#6b7280", marginTop: "2px" },
  form: {
    padding: "28px 36px",
    display: "flex", flexDirection: "column", gap: "18px",
  },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  addBtn: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "11px 20px", background: "transparent",
    border: "1.5px dashed #d1fae5", borderRadius: "10px",
    color: "#16a34a", fontWeight: "600", fontSize: "14px",
    cursor: "pointer", fontFamily: "inherit", width: "fit-content",
    transition: "background 0.2s",
  },
  addPlus: { fontSize: "18px", lineHeight: 1 },
  addedList: { display: "flex", flexDirection: "column", gap: "10px" },
  addedItem: {
    display: "flex", alignItems: "flex-start", gap: "12px",
    padding: "12px 16px", background: "#f0fdf4", borderRadius: "10px",
  },
  addedDot: {
    width: "8px", height: "8px", borderRadius: "50%",
    background: "#16a34a", flexShrink: 0, marginTop: "6px",
  },
  addedTitle: { fontSize: "14px", fontWeight: "600", color: "#111827" },
  addedSub: { fontSize: "12px", color: "#6b7280", marginTop: "2px" },
  footer: {
    padding: "20px 36px", borderTop: "1px solid #f3f4f6",
    display: "flex", justifyContent: "space-between", alignItems: "center",
  },
  backBtn: {
    padding: "10px 20px", border: "none", background: "transparent",
    cursor: "pointer", fontSize: "14px", fontWeight: "600", color: "#374151",
    fontFamily: "inherit",
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

export default StepEducation;