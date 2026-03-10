import "../../styles/stepBasic.css";


function StepBasic({ nextStep, studentData, setStudentData }) {

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setStudentData({
      ...studentData,
      resume: e.target.files[0]
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Basic Information</h3>

      <input className="input" name="email" placeholder="Email" onChange={handleChange} />
      <input className="input" name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input className="input" name="full_name" placeholder="Full Name" onChange={handleChange} />
      <input className="input" name="phone" placeholder="Phone" onChange={handleChange} />
      <input className="input" name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} />
      <input className="input" name="github" placeholder="GitHub URL" onChange={handleChange} />
      <input className="input" name="location" placeholder="Location" onChange={handleChange} />
      <textarea className="input" name="summary" placeholder="Professional Summary" onChange={handleChange} />

      {/* Resume Upload */}
      <label className="block mt-3 font-medium">Upload Resume (PDF)</label>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4"
      />

      <div className="flex justify-end">
        <button className="btn-primary" onClick={nextStep}>Next</button>
      </div>
    </div>
  );
}

export default StepBasic;