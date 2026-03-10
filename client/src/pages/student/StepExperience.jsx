import { useState } from "react";
import "../../styles/stepExperience.css";

function StepExperience({ nextStep, prevStep, studentData, setStudentData }) {

  const [exp, setExp] = useState({
    company: "",
    role: "",
    duration: "",
    description: ""
  });

  const addExperience = () => {
    setStudentData({
      ...studentData,
      experience: [...studentData.experience, exp]
    });

    setExp({ company: "", role: "", duration: "", description: "" });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Experience</h3>

      <input className="input" placeholder="Company"
        value={exp.company}
        onChange={(e) => setExp({ ...exp, company: e.target.value })}
      />

      <input className="input" placeholder="Role"
        value={exp.role}
        onChange={(e) => setExp({ ...exp, role: e.target.value })}
      />

      <input className="input" placeholder="Duration"
        value={exp.duration}
        onChange={(e) => setExp({ ...exp, duration: e.target.value })}
      />

      <textarea className="input" placeholder="Description"
        value={exp.description}
        onChange={(e) => setExp({ ...exp, description: e.target.value })}
      />

      <button className="btn-primary mb-3" onClick={addExperience}>
        Add Experience
      </button>

      <div className="flex justify-between">
        <button className="btn-secondary" onClick={prevStep}>Back</button>
        <button className="btn-primary" onClick={nextStep}>Next</button>
      </div>
    </div>
  );
}

export default StepExperience;