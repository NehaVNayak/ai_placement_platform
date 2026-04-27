import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TECH_SKILLS = ["React", "Node.js", "Python", "TypeScript", "Java", "C++", "MongoDB", "PostgreSQL", "Docker", "AWS", "Django", "Spring Boot", "Next.js", "Express.js", "Redis"];
const SOFT_SKILLS_OPTIONS = ["Communication", "Leadership", "Teamwork", "Problem-Solving", "Adaptability", "Time Management", "Critical Thinking", "Creativity"];
const TOOLS_OPTIONS = ["Git", "Figma", "Docker", "VS Code", "Jira", "Kubernetes", "Linux", "Postman", "Notion"];
const ROLES = ["Full Stack Developer", "Frontend Developer", "Backend Developer", "Data Scientist", "ML Engineer", "DevOps Engineer", "Mobile Developer", "UI/UX Designer"];
const AVAILABILITY = ["Immediate (Within 2 weeks)", "1 Month Notice", "2-3 Months", "Currently Employed - Open to Offers"];

function Tag({ label, onRemove }) {
  return (
    <div style={styles.tag}>
      {label}
      {onRemove && <button onClick={onRemove} style={styles.tagRemove}>×</button>}
    </div>
  );
}

function SkillBadge({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.skillBadge,
        ...(selected ? styles.skillBadgeSelected : {}),
      }}
    >
      {label}
    </button>
  );
}

function StepSkills({ prevStep, studentData, setStudentData }) {
  const navigate = useNavigate();

  const [techSkills, setTechSkills] = useState(["React", "Node.js", "Python", "TypeScript"]);
  const [softSkills, setSoftSkills] = useState(["Communication", "Leadership"]);
  const [tools, setTools] = useState(["Git", "Figma", "Docker"]);
  const [customSkill, setCustomSkill] = useState("");
  const [preferredRole, setPreferredRole] = useState("Full Stack Developer");
  const [availability, setAvailability] = useState("Immediate (Within 2 weeks)");
  const [confirmed, setConfirmed] = useState(false);

  const toggleSkill = (list, setList, skill) => {
    setList(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const addCustomSkill = () => {
    if (customSkill.trim()) {
      setTechSkills(prev => [...prev, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  const handleSubmit = async () => {
    if (!confirmed) { alert("Please confirm the accuracy of your information."); return; }
    const formData = new FormData();
    for (const key in studentData) {
      if (!["education", "projects", "experience"].includes(key)) formData.append(key, studentData[key]);
    }
    formData.append("education", JSON.stringify(studentData.education));
    formData.append("projects", JSON.stringify(studentData.projects));
    formData.append("experience", JSON.stringify(studentData.experience));
    formData.append("tech_skills", JSON.stringify(techSkills));
    formData.append("soft_skills", JSON.stringify(softSkills));
    formData.append("tools", JSON.stringify(tools));
    formData.append("preferred_role", preferredRole);
    formData.append("availability", availability);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/student/signup", { method: "POST", body: formData });
      const result = await res.json();
      if (res.ok) { alert("Application Submitted Successfully!"); navigate("/dashboard"); }
      else alert(result.detail || "Something went wrong!");
    } catch (err) { console.error(err); alert("Server error"); }
  };

  return (
    <div style={styles.wrapper}>
      {/* Page Title (outside card) */}
      <div style={styles.pageTitle}>
        <h2 style={styles.pageTitleText}>Skills & Final Submission</h2>
        <p style={styles.pageTitleSub}>Complete your professional profile to qualify for upcoming campus placement drives.</p>
      </div>

      {/* Skills Card */}
      <div style={styles.card}>
        {/* Technical Skills */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Technical Skills</h3>
          <div style={styles.tagRow}>
            {techSkills.map(s => (
              <Tag key={s} label={s} onRemove={() => setTechSkills(prev => prev.filter(x => x !== s))} />
            ))}
            <div style={styles.addSkillRow}>
              <input
                style={styles.skillInput}
                placeholder="+ Add Skill"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomSkill()}
              />
            </div>
          </div>
          <div style={styles.skillGrid}>
            {TECH_SKILLS.filter(s => !techSkills.includes(s)).slice(0, 8).map(s => (
              <SkillBadge key={s} label={s} selected={false} onClick={() => setTechSkills(prev => [...prev, s])} />
            ))}
          </div>
        </section>

        <div style={styles.divider} />

        {/* Soft Skills + Tools */}
        <div style={styles.twoCol}>
          <section>
            <h3 style={styles.sectionTitleSm}>Soft Skills</h3>
            <div style={styles.tagRowCompact}>
              {SOFT_SKILLS_OPTIONS.map(s => (
                <SkillBadge
                  key={s} label={s.toUpperCase()}
                  selected={softSkills.includes(s)}
                  onClick={() => toggleSkill(softSkills, setSoftSkills, s)}
                />
              ))}
            </div>
          </section>
          <section>
            <h3 style={styles.sectionTitleSm}>Tools</h3>
            <div style={styles.tagRowCompact}>
              {TOOLS_OPTIONS.map(s => (
                <SkillBadge
                  key={s} label={s.toUpperCase()}
                  selected={tools.includes(s)}
                  onClick={() => toggleSkill(tools, setTools, s)}
                />
              ))}
            </div>
          </section>
        </div>

        <div style={styles.divider} />

        {/* Preferred Role + Availability */}
        <div style={styles.twoCol}>
          <div>
            <label style={styles.fieldLabel}>Preferred Role</label>
            <select
              style={styles.select}
              value={preferredRole}
              onChange={(e) => setPreferredRole(e.target.value)}
            >
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label style={styles.fieldLabel}>Availability</label>
            <select
              style={styles.select}
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              {AVAILABILITY.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Final Review Card */}
      <div style={styles.reviewCard}>
        <div style={styles.reviewHeader}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span style={styles.reviewTitle}>Final Review Summary</span>
        </div>
        <div style={styles.reviewRow}>
          <span style={styles.reviewKey}>Full Name</span>
          <span style={styles.reviewVal}>{studentData.full_name || "—"}</span>
        </div>
        <div style={styles.reviewRow}>
          <span style={styles.reviewKey}>Graduation Year</span>
          <span style={styles.reviewVal}>{studentData.education?.[0]?.endYear || "—"}</span>
        </div>
        <div style={styles.reviewRow}>
          <span style={styles.reviewKey}>GPA</span>
          <span style={styles.reviewVal}>{studentData.education?.[0]?.cgpa || "—"}</span>
        </div>
      </div>

      {/* Confirmation */}
      <div style={styles.confirmBox}>
        <label style={styles.confirmLabel}>
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            style={{ marginRight: "12px", accentColor: "#16a34a", width: "16px", height: "16px" }}
          />
          I confirm that the information provided is accurate and I am ready to be considered for active placement drives and campus interviews.
        </label>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <button style={styles.backBtn} onClick={prevStep}>← Back to Projects</button>
        <button
          style={{ ...styles.submitBtn, ...(confirmed ? {} : { opacity: 0.6, cursor: "not-allowed" }) }}
          onClick={handleSubmit}
          disabled={!confirmed}
        >
          Complete Signup 🚀
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%", maxWidth: "760px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    display: "flex", flexDirection: "column", gap: "20px",
  },
  pageTitle: { paddingBottom: "4px" },
  pageTitleText: { fontSize: "28px", fontWeight: "800", color: "#111827", marginBottom: "6px" },
  pageTitleSub: { fontSize: "14px", color: "#6b7280" },
  card: {
    background: "#fff", borderRadius: "16px",
    border: "1.5px solid #e5e7eb",
    padding: "28px 32px",
  },
  section: { marginBottom: "4px" },
  sectionTitle: { fontSize: "18px", fontWeight: "700", color: "#111827", marginBottom: "14px" },
  sectionTitleSm: { fontSize: "15px", fontWeight: "700", color: "#111827", marginBottom: "10px" },
  tagRow: { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" },
  tag: {
    display: "flex", alignItems: "center", gap: "6px",
    padding: "6px 12px", background: "#fff", border: "1.5px solid #d1d5db",
    borderRadius: "99px", fontSize: "13px", fontWeight: "600", color: "#374151",
  },
  tagRemove: {
    background: "none", border: "none", cursor: "pointer",
    color: "#9ca3af", fontSize: "16px", padding: "0", lineHeight: 1,
  },
  addSkillRow: { display: "flex", alignItems: "center" },
  skillInput: {
    padding: "6px 14px", border: "1.5px dashed #d1fae5", borderRadius: "99px",
    fontSize: "13px", color: "#16a34a", fontWeight: "600", outline: "none",
    background: "transparent", fontFamily: "inherit", width: "120px",
  },
  skillGrid: { display: "flex", flexWrap: "wrap", gap: "8px" },
  skillBadge: {
    padding: "6px 14px", border: "1.5px solid #e5e7eb", borderRadius: "8px",
    background: "#f9fafb", fontSize: "13px", fontWeight: "600", color: "#374151",
    cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
  },
  skillBadgeSelected: {
    background: "#16a34a", color: "#fff", border: "1.5px solid #16a34a",
  },
  divider: { height: "1px", background: "#f3f4f6", margin: "20px 0" },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" },
  tagRowCompact: { display: "flex", flexWrap: "wrap", gap: "8px" },
  fieldLabel: { display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "8px" },
  select: {
    width: "100%", padding: "11px 14px", borderRadius: "10px",
    border: "1.5px solid #e5e7eb", fontSize: "14px", color: "#111827",
    outline: "none", background: "#fff", fontFamily: "inherit",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
    boxSizing: "border-box",
  },
  reviewCard: {
    background: "#f0fdf4", borderRadius: "14px",
    border: "1.5px solid #d1fae5", padding: "20px 24px",
  },
  reviewHeader: {
    display: "flex", alignItems: "center", gap: "10px",
    marginBottom: "16px",
  },
  reviewTitle: { fontSize: "16px", fontWeight: "700", color: "#111827" },
  reviewRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "10px 0", borderBottom: "1px solid #dcfce7",
  },
  reviewKey: { fontSize: "14px", color: "#6b7280" },
  reviewVal: { fontSize: "14px", fontWeight: "700", color: "#111827" },
  confirmBox: {
    background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: "12px",
    padding: "16px 20px",
  },
  confirmLabel: {
    display: "flex", alignItems: "flex-start",
    fontSize: "14px", color: "#374151", lineHeight: 1.5, cursor: "pointer",
  },
  footer: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    paddingTop: "4px",
  },
  backBtn: {
    display: "flex", alignItems: "center", gap: "6px",
    padding: "11px 22px", border: "none", background: "transparent",
    cursor: "pointer", fontSize: "14px", fontWeight: "600", color: "#374151",
    fontFamily: "inherit",
  },
  submitBtn: {
    padding: "13px 32px", background: "#16a34a", color: "#fff",
    border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: "700",
    cursor: "pointer", fontFamily: "inherit",
  },
};

export default StepSkills;