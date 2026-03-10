import { useState } from "react";
import "../../styles/stepEducation.css";

function StepEducation({ nextStep, prevStep, studentData, setStudentData }) {

  const [edu, setEdu] = useState({
    institution: "",
    degree: "",
    branch: "",
    cgpa: "",
    duration: ""
  });

  const addEducation = () => {
    setStudentData({
      ...studentData,
      education: [...studentData.education, edu]
    });

    setEdu({
      institution: "",
      degree: "",
      branch: "",
      cgpa: "",
      duration: ""
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Education</h3>

      <input className="input" placeholder="Institution"
        value={edu.institution}
        onChange={(e) => setEdu({ ...edu, institution: e.target.value })}
      />

      <input className="input" placeholder="Degree (B.E, B.Tech, etc.)"
        value={edu.degree}
        onChange={(e) => setEdu({ ...edu, degree: e.target.value })}
      />

      <input className="input" placeholder="Branch (CSE, ECE, ME, etc.)"
        value={edu.branch}
        onChange={(e) => setEdu({ ...edu, branch: e.target.value })}
      />

      <input className="input" placeholder="CGPA"
        value={edu.cgpa}
        onChange={(e) => setEdu({ ...edu, cgpa: e.target.value })}
      />

      <input className="input" placeholder="Duration (2022-2026)"
        value={edu.duration}
        onChange={(e) => setEdu({ ...edu, duration: e.target.value })}
      />

      <button className="btn-primary mb-3" onClick={addEducation}>
        Add Education
      </button>

      <div className="flex justify-between">
        <button className="btn-secondary" onClick={prevStep}>Back</button>
        <button className="btn-primary" onClick={nextStep}>Next</button>
      </div>
    </div>
  );
}

export default StepEducation;