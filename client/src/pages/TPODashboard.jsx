import { useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ import
import "../styles/tpoDashboard.css";

function TPODashboard() {

  const navigate = useNavigate();   // ✅ MUST be inside component

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    branches: []
  });

  // ✅ HANDLE INPUT + CHECKBOX
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        branches: checked
          ? [...prev.branches, value]
          : prev.branches.filter(b => b !== value)
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/tpo/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: formData.title,
          message: formData.message,
          branches: formData.branches
        })
      });

      await res.json();

      alert("Notification Sent ✅");

      setFormData({
        title: "",
        message: "",
        branches: []
      });

    } catch (error) {
      alert("Error sending notification ❌");
    }
  };

  return (
    <div className="dashboard-container">

      <div className="dashboard-card">

        <h2 className="dashboard-title">📢 Send Placement Notification</h2>

        <form className="dashboard-form" onSubmit={handleSubmit}>

          {/* TITLE */}
          <input
            name="title"
            placeholder="Job Title (e.g. Software Developer)"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* MESSAGE */}
          <textarea
            name="message"
            placeholder="Enter full message (company details, date, etc)"
            value={formData.message}
            onChange={handleChange}
            required
          />

          {/* CHECKBOXES */}
          <div className="checkbox-group">
            {["CSE","ISE","ECE","MECH","CIVIL","AIML"].map((branch) => (
              <label key={branch} className="checkbox-item">
                <input
                  type="checkbox"
                  value={branch}
                  checked={formData.branches.includes(branch)}
                  onChange={handleChange}
                />
                {branch}
              </label>
            ))}
          </div>

          {/* SEND BUTTON */}
          <button type="submit">Send Notification</button>

        </form>

        {/* ✅ VIEW NOTIFICATIONS BUTTON */}
        <button 
          className="view-btn" 
          onClick={() => navigate("/view-notifications")}
        >
          View Notifications
        </button>
          

      </div>

    </div>
  );
}

export default TPODashboard;