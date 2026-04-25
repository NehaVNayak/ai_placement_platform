import { useState } from "react";

const inputStyle = {
  width: "100%", padding: "11px 14px", borderRadius: "10px",
  border: "1.5px solid #e5e7eb", fontSize: "14px", color: "#111827",
  outline: "none", background: "#fff", boxSizing: "border-box",
  fontFamily: "inherit", transition: "border-color 0.2s",
};

const labelStyle = {
  display: "block", fontSize: "13px", fontWeight: "600",
  color: "#374151", marginBottom: "6px",
};

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: "0" }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

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

function StepBasic({ nextStep, studentData, setStudentData }) {
  const [dragging, setDragging] = useState(false);

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setStudentData({ ...studentData, resume: e.target.files[0] });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setStudentData({ ...studentData, resume: file });
  };

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <span style={styles.badge}>● AI PLACEMENT PREP</span>
          <div>
            <p style={styles.stepBig}>Step 1</p>
            <p style={styles.stepSub}>of 5 steps</p>
          </div>
        </div>
        <h2 style={styles.title}>Student Signup</h2>
        <p style={styles.subtitle}>Complete your profile in 5 simple steps.</p>
        {/* Progress bar */}
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: "20%" }} />
        </div>
      </div>

      {/* Form */}
      <div style={styles.formSection}>
        <h3 style={styles.sectionTitle}>Basic Information</h3>

        <div style={styles.grid2}>
          <Field label="Full Name">
            <FocusInput name="full_name" placeholder="e.g. Alex Johnson" value={studentData.full_name} onChange={handleChange} />
          </Field>
          <Field label="Email Address">
            <FocusInput name="email" placeholder="alex@university.edu" value={studentData.email} onChange={handleChange} />
          </Field>
        </div>

        <div style={styles.grid2}>
          <Field label="Password">
            <div style={{ position: "relative" }}>
              <FocusInput name="password" type="password" placeholder="••••••••" value={studentData.password} onChange={handleChange} />
            </div>
          </Field>
          <Field label="Phone Number">
            <FocusInput name="phone" placeholder="+1 (555) 000-0000" value={studentData.phone} onChange={handleChange} />
          </Field>
        </div>

        <div style={styles.grid2}>
          <Field label="LinkedIn URL">
            <div style={styles.prefixInput}>
              <span style={styles.prefix}>linkedin.com/in/</span>
              <FocusInput name="linkedin" placeholder="username" value={studentData.linkedin} onChange={handleChange} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} />
            </div>
          </Field>
          <Field label="GitHub URL">
            <div style={styles.prefixInput}>
              <span style={styles.prefix}>github.com/</span>
              <FocusInput name="github" placeholder="username" value={studentData.github} onChange={handleChange} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} />
            </div>
          </Field>
        </div>

        <Field label="Current Location">
          <div style={{ position: "relative" }}>
            <span style={styles.inputIcon}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <FocusInput name="location" placeholder="City, Country" value={studentData.location} onChange={handleChange} style={{ paddingLeft: "36px" }} />
          </div>
        </Field>

        <Field label="Professional Summary">
          <FocusTextarea name="summary" placeholder="Briefly describe your career goals and technical interests..." value={studentData.summary} onChange={handleChange} />
        </Field>

        <Field label="Upload Latest Resume">
          <div
            style={{
              ...styles.dropzone,
              ...(dragging ? { borderColor: "#16a34a", background: "#f0fdf4" } : {}),
            }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("resumeInput").click()}
          >
            <input id="resumeInput" type="file" accept=".pdf,.docx" style={{ display: "none" }} onChange={handleFileChange} />
            <div style={styles.uploadIcon}>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            {studentData.resume ? (
              <p style={{ color: "#16a34a", fontWeight: "600", fontSize: "14px" }}>{studentData.resume.name}</p>
            ) : (
              <>
                <p style={styles.dropText}>Drag & drop your resume here</p>
                <p style={styles.dropSubtext}>PDF, DOCX (Max 5MB)</p>
              </>
            )}
          </div>
        </Field>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <button style={styles.saveDraftBtn}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save Draft
        </button>
        <button style={styles.continueBtn} onClick={nextStep}>
          Continue →
        </button>
      </div>

      <div style={styles.pageFooter}>
        <span>© 2024 AI Placement PreP. Secure Academic Environment.</span>
        <div style={{ display: "flex", gap: "16px" }}>
          <a href="#" style={styles.footerLink}>Help Center</a>
          <a href="#" style={styles.footerLink}>Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%", maxWidth: "720px",
    background: "#fff", borderRadius: "20px",
    boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
    overflow: "hidden",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  header: {
    padding: "28px 36px 20px",
    borderBottom: "1px solid #f3f4f6",
  },
  headerTop: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    marginBottom: "8px",
  },
  badge: {
    fontSize: "11px", fontWeight: "700", color: "#16a34a",
    letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "4px",
  },
  stepBig: { fontSize: "18px", fontWeight: "700", color: "#111827", textAlign: "right" },
  stepSub: { fontSize: "12px", color: "#9ca3af", textAlign: "right" },
  title: { fontSize: "20px", fontWeight: "700", color: "#111827", marginBottom: "2px" },
  subtitle: { fontSize: "13px", color: "#6b7280", marginBottom: "16px" },
  progressBar: {
    height: "6px", background: "#e5e7eb", borderRadius: "99px", overflow: "hidden",
  },
  progressFill: {
    height: "100%", background: "#16a34a", borderRadius: "99px", transition: "width 0.5s",
  },
  formSection: {
    padding: "28px 36px",
    display: "flex", flexDirection: "column", gap: "18px",
  },
  sectionTitle: {
    fontSize: "20px", fontWeight: "700", color: "#111827", marginBottom: "4px",
  },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  prefixInput: { display: "flex" },
  prefix: {
    padding: "11px 12px", background: "#f9fafb", border: "1.5px solid #e5e7eb",
    borderRight: "none", borderRadius: "10px 0 0 10px", fontSize: "13px", color: "#6b7280",
    whiteSpace: "nowrap", display: "flex", alignItems: "center",
  },
  inputIcon: {
    position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
    display: "flex", alignItems: "center",
  },
  dropzone: {
    border: "2px dashed #d1fae5", borderRadius: "12px", padding: "40px 20px",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    gap: "8px", cursor: "pointer", transition: "all 0.2s", background: "#fff",
  },
  uploadIcon: {
    width: "52px", height: "52px", borderRadius: "50%", background: "#16a34a",
    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px",
  },
  dropText: { fontSize: "15px", fontWeight: "600", color: "#111827" },
  dropSubtext: { fontSize: "13px", color: "#9ca3af" },
  footer: {
    padding: "20px 36px", borderTop: "1px solid #f3f4f6",
    display: "flex", justifyContent: "space-between", alignItems: "center",
  },
  saveDraftBtn: {
    display: "flex", alignItems: "center", gap: "6px",
    padding: "10px 20px", border: "1.5px solid #e5e7eb", borderRadius: "10px",
    background: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: "600", color: "#374151",
    fontFamily: "inherit",
  },
  continueBtn: {
    padding: "12px 28px", background: "#111827", color: "#fff",
    border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: "700",
    cursor: "pointer", fontFamily: "inherit", letterSpacing: "-0.2px",
  },
  pageFooter: {
    padding: "14px 36px", display: "flex", justifyContent: "space-between",
    fontSize: "12px", color: "#9ca3af", borderTop: "1px solid #f3f4f6",
  },
  footerLink: { color: "#6b7280", textDecoration: "none" },
};

export default StepBasic;