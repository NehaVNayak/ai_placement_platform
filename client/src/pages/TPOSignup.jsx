import { useState } from "react";
import { tpoSignup } from "../api/authApi";

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
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>TPO Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="full_name" placeholder="Full Name" onChange={handleChange} required />
        <input name="college_name" placeholder="College Name" onChange={handleChange} required />
        <input name="contact_number" placeholder="Contact Number" onChange={handleChange} required />
        <input name="designation" placeholder="Designation" onChange={handleChange} required />

        <button type="submit">Signup</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default TPOSignup;