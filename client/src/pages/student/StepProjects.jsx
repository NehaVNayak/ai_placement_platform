import { useState } from "react";
import "../../styles/stepProjects.css";

function StepProjects({ nextStep, prevStep, studentData, setStudentData }) {

  const [project, setProject] = useState({
    title: "",
    tech_stack: "",
    duration: "",
    description: ""
  });

  const addProject = () => {
    setStudentData({
      ...studentData,
      projects: [...studentData.projects, project]
    });

    setProject({ title: "", tech_stack: "", duration: "", description: "" });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Projects</h3>

      <input className="input" placeholder="Project Title"
        value={project.title}
        onChange={(e) => setProject({ ...project, title: e.target.value })}
      />

      <input className="input" placeholder="Tech Stack"
        value={project.tech_stack}
        onChange={(e) => setProject({ ...project, tech_stack: e.target.value })}
      />

      <input className="input" placeholder="Duration"
        value={project.duration}
        onChange={(e) => setProject({ ...project, duration: e.target.value })}
      />

      <textarea className="input" placeholder="Description"
        value={project.description}
        onChange={(e) => setProject({ ...project, description: e.target.value })}
      />

      <button className="btn-primary mb-3" onClick={addProject}>
        Add Project
      </button>

      <div className="flex justify-between">
        <button className="btn-secondary" onClick={prevStep}>Back</button>
        <button className="btn-primary" onClick={nextStep}>Next</button>
      </div>
    </div>
  );
}

export default StepProjects;