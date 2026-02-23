function StepBasic({ nextStep, studentData, setStudentData }) {

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h3>Basic Information</h3>

      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="full_name" placeholder="Full Name" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} />
      <input name="github" placeholder="GitHub URL" onChange={handleChange} />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <textarea name="summary" placeholder="Professional Summary" onChange={handleChange} />

      <button onClick={nextStep}>Next</button>
    </div>
  );
}

export default StepBasic;