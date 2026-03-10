import { useState } from "react";
import { tpoSignup } from "../api/authApi";
import "../styles/tpoSignup.css";

function TPOSignup() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    college_name: "",
    contact_number: "",
    designation: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await tpoSignup(formData);
      setMessage(res.message);

      // reset form after success
      setFormData({
        email: "",
        password: "",
        full_name: "",
        college_name: "",
        contact_number: "",
        designation: ""
      });

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="page-container">

      <div className="card">

        <h2>TPO Signup</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />

          <input
            name="college_name"
            placeholder="College Name"
            value={formData.college_name}
            onChange={handleChange}
            required
          />

          <input
            name="contact_number"
            placeholder="Contact Number"
            value={formData.contact_number}
            onChange={handleChange}
            required
          />

          <input
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />

          <button type="submit">Signup</button>

        </form>

        {message && <p className="message">{message}</p>}

      </div>

    </div>
  );
}

export default TPOSignup;