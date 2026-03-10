import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
      const res = await loginUser(formData);

      // store token and role
      localStorage.setItem("token", res.access_token);
      localStorage.setItem("role", res.role);

      setMessage("Login successful!");

      // redirect based on role
      if (res.role === "STUDENT") {
        navigate("/dashboard");
      }
      else if (res.role === "TPO") {
        navigate("/tpo-dashboard");
      }
      else if (res.role === "FACULTY") {
        navigate("/faculty-dashboard");
      }

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="page-container">

      <div className="card">

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>

        </form>

        {message && <p className="message">{message}</p>}

      </div>

    </div>
  );
}

export default Login;