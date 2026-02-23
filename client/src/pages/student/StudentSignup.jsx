import { useState } from "react";
import StepBasic from "./StepBasic";
import StepEducation from "./StepEducation";
import StepProjects from "./StepProjects";
import StepExperience from "./StepExperience";
import StepSkills from "./StepSkills";

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
    education: [],
    projects: [],
    experience: [],
    certifications: [],
    skills: {}
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div>
      <h2>Student Resume Builder</h2>

      {step === 1 && <StepBasic nextStep={nextStep} studentData={studentData} setStudentData={setStudentData} />}
      {step === 2 && <StepEducation nextStep={nextStep} prevStep={prevStep} studentData={studentData} setStudentData={setStudentData} />}
      {step === 3 && <StepProjects nextStep={nextStep} prevStep={prevStep} studentData={studentData} setStudentData={setStudentData} />}
      {step === 4 && <StepExperience nextStep={nextStep} prevStep={prevStep} studentData={studentData} setStudentData={setStudentData} />}
      {step === 5 && <StepSkills prevStep={prevStep} studentData={studentData} setStudentData={setStudentData} />}

    </div>
  );
}

export default StudentSignup;