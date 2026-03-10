import { useState } from "react";
import axios from "axios";
import "../styles/facultySignup.css";

function FacultySignup() {

  const [facultyData, setFacultyData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    designation: "",
    qualification: "",
    specialization: "",
    subjects: "",
    expertise: "",
    experience_years: "",
    mentorship_available: false,
    bio: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFacultyData({
      ...facultyData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/api/faculty/signup",
        facultyData
      );

      alert(res.data.message);

      setFacultyData({
        name: "",
        email: "",
        password: "",
        phone: "",
        department: "",
        designation: "",
        qualification: "",
        specialization: "",
        subjects: "",
        expertise: "",
        experience_years: "",
        mentorship_available: false,
        bio: ""
      });

    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  return (
    <div className="page-container">

      <div className="card">

        <h2>Faculty Signup</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={facultyData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={facultyData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={facultyData.password}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={facultyData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={facultyData.department}
            onChange={handleChange}
          />

          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={facultyData.designation}
            onChange={handleChange}
          />

          <input
            type="text"
            name="qualification"
            placeholder="Highest Qualification"
            value={facultyData.qualification}
            onChange={handleChange}
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={facultyData.specialization}
            onChange={handleChange}
          />

          <input
            type="text"
            name="subjects"
            placeholder="Subjects Teaching"
            value={facultyData.subjects}
            onChange={handleChange}
          />

          <input
            type="text"
            name="expertise"
            placeholder="Areas of Expertise"
            value={facultyData.expertise}
            onChange={handleChange}
          />

          <input
            type="number"
            name="experience_years"
            placeholder="Years of Experience"
            value={facultyData.experience_years}
            onChange={handleChange}
          />

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="mentorship_available"
              checked={facultyData.mentorship_available}
              onChange={handleChange}
            />
            Available for Mentorship
          </label>

          <textarea
            name="bio"
            placeholder="Short Bio"
            value={facultyData.bio}
            onChange={handleChange}
          />

          <button type="submit">Signup</button>

        </form>

      </div>

    </div>
  );
}

export default FacultySignup;