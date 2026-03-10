import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/stepSkills.css";

function StepSkills({ prevStep, studentData }) {

  const navigate = useNavigate();   // ✅ FIXED (initialize navigate)

  const skillOptions = {
    languages: [
      "Python","Java","C","C++","JavaScript","TypeScript",
      "HTML","CSS","SQL","PL/SQL","PHP","Go","Rust"
    ],
    web_dev: [
      "Node.js","React.js","Next.js","Express.js",
      "MongoDB","MySQL","PostgreSQL","Django",
      "Spring Boot","REST APIs"
    ],
    core_cs: [
      "OOP","DSA","DBMS","Operating Systems",
      "Computer Networks","System Design",
      "Compiler Design","Cloud Computing"
    ],
    tools: [
      "Git","GitHub","VS Code","Eclipse",
      "Apache NetBeans","Jira","Docker",
      "Kubernetes","AWS","Linux"
    ],
    soft_skills: [
      "Communication","Teamwork","Leadership",
      "Problem-Solving","Adaptability",
      "Time Management","Critical Thinking"
    ],
    languages_known: [
      "Kannada","English","Hindi",
      "Japanese","Spanish","German","French"
    ]
  };

  const [selectedSkills, setSelectedSkills] = useState({
    languages: [],
    web_dev: [],
    core_cs: [],
    tools: [],
    soft_skills: [],
    languages_known: []
  });

  const [customSkills, setCustomSkills] = useState({
    languages: "",
    web_dev: "",
    core_cs: "",
    tools: "",
    soft_skills: "",
    languages_known: ""
  });

  const handleCheckboxChange = (category, value) => {
    setSelectedSkills((prev) => {
      const exists = prev[category].includes(value);

      return {
        ...prev,
        [category]: exists
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value]
      };
    });
  };

  const handleSubmit = async () => {

    const formData = new FormData();

    for (const key in studentData) {
      if (key !== "education" && key !== "projects" && key !== "experience") {
        formData.append(key, studentData[key]);
      }
    }

    formData.append("education", JSON.stringify(studentData.education));
    formData.append("projects", JSON.stringify(studentData.projects));
    formData.append("experience", JSON.stringify(studentData.experience));

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/student/signup",
        {
          method: "POST",
          body: formData
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Application Submitted Successfully!");
        navigate("/dashboard");   // ✅ redirect works now
      } else {
        alert(result.detail || "Something went wrong!");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const renderCategory = (title, category) => (
    <div className="mb-6">

      <h4 className="font-semibold mb-2 text-blue-600">
        {title}
      </h4>

      <div className="grid grid-cols-2 gap-2 mb-3">
        {skillOptions[category].map((skill) => (
          <label key={skill} className="flex items-center space-x-2">

            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(category, skill)}
            />

            <span>{skill}</span>

          </label>
        ))}
      </div>

      <textarea
        className="input"
        placeholder="Add more (comma separated)"
        onChange={(e) =>
          setCustomSkills({
            ...customSkills,
            [category]: e.target.value
          })
        }
      />

    </div>
  );

  return (
    <div className="p-8 bg-white rounded-2xl shadow-xl">

      <h3 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Skills & Expertise
      </h3>

      {renderCategory("Programming Languages","languages")}
      {renderCategory("Web Development","web_dev")}
      {renderCategory("Core CS Concepts","core_cs")}
      {renderCategory("Tools & Platforms","tools")}
      {renderCategory("Soft Skills","soft_skills")}
      {renderCategory("Languages Known","languages_known")}

      <div className="flex justify-between mt-8">

        <button
          className="btn-secondary"
          onClick={prevStep}
        >
          Back
        </button>

        <button
          className="btn-primary"
          onClick={handleSubmit}
        >
          Submit Application
        </button>

      </div>

    </div>
  );
}

export default StepSkills;