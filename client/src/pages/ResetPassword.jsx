import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password) return alert("Enter password");

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email_or_phone: email,
          new_password: password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Reset failed");
        setLoading(false);
        return;
      }

      alert("Password reset successful ✅");

      // 👉 Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      alert("Error resetting password");
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Reset Password</h2>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
        style={{
          padding: "10px",
          width: "250px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      <br /><br />

      <button
        onClick={handleReset}
        disabled={loading}
        style={{
          padding: "10px 20px",
          background: "#1a3a1a",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </div>
  );
}

export default ResetPassword;