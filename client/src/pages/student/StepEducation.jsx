import { useState } from "react";

function StepEducation({ nextStep, prevStep, studentData, setStudentData }) {

  const [edu, setEdu] = useState({
    institution: "",
    degree: "",
    cgpa: "",
    duration: ""
  });

  const addEducation = () => {
    setStudentData({
      ...studentData,
      education: [...studentData.education, edu]
    });
    setEdu({ institution: "", degree: "", cgpa: "", duration: "" });
  };

  return (
    <div>
      <h3>Education</h3>

      <input placeholder="Institution" value={edu.institution}
        onChange={(e) => setEdu({ ...edu, institution: e.target.value })} />

      <input placeholder="Degree" value={edu.degree}
        onChange={(e) => setEdu({ ...edu, degree: e.target.value })} />

      <input placeholder="CGPA" value={edu.cgpa}
        onChange={(e) => setEdu({ ...edu, cgpa: e.target.value })} />

      <input placeholder="Duration" value={edu.duration}
        onChange={(e) => setEdu({ ...edu, duration: e.target.value })} />

      <button onClick={addEducation}>Add Education</button>

      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
}

export default StepEducation;