import { useState } from "react";

import StepBasic from "./student/StepBasic";
import StepEducation from "./student/StepEducation";
import StepExperience from "./student/StepExperience";
import StepProjects from "./student/StepProjects";
import StepSkills from "./student/StepSkills";

import "../styles/studentSignup.css";

function StudentSignup() {

  const [step, setStep] = useState(1);

  const [studentData, setStudentData] = useState({
    email: "",
    password: "",
    full_name: "",
    phone: "",
    linkedin: "",
    github: "",
    location: "",
    summary: "",
    resume: null,

    education: [],
    experience: [],
    projects: []
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="signup-page">

      <div className="signup-card">

        {step === 1 && (
          <StepBasic
            nextStep={nextStep}
            studentData={studentData}
            setStudentData={setStudentData}
          />
        )}

        {step === 2 && (
          <StepEducation
            nextStep={nextStep}
            prevStep={prevStep}
            studentData={studentData}
            setStudentData={setStudentData}
          />
        )}

        {step === 3 && (
          <StepExperience
            nextStep={nextStep}
            prevStep={prevStep}
            studentData={studentData}
            setStudentData={setStudentData}
          />
        )}

        {step === 4 && (
          <StepProjects
            nextStep={nextStep}
            prevStep={prevStep}
            studentData={studentData}
            setStudentData={setStudentData}
          />
        )}

        {step === 5 && (
          <StepSkills
            prevStep={prevStep}
            studentData={studentData}
            setStudentData={setStudentData}
          />
        )}

        {step > 5 && (
          <div style={{ textAlign: "center" }}>
            <h2>Signup Completed</h2>
          </div>
        )}

      </div>

    </div>
  );
}

export default StudentSignup;