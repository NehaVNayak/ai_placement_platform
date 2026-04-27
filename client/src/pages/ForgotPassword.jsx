import { useState } from "react";
import { useNavigate } from "react-router-dom";


function ForgotPassword() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ UPDATED FUNCTION
  const handleContinue = async () => {
    console.log("Button clicked");

    if (!value) {
      alert("Enter email or phone");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8000/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_or_phone: value,
          method: "email",
        }),
      });

      const data = await res.json();

      console.log("Response:", data);

      if (!res.ok) {
        alert(data.detail || "Failed to send OTP");
        return;
      }

      alert("✅ OTP sent successfully");

      // 👉 NEXT STEP (you can enable later)
      navigate("/verify-otp", { state: { email: value } });

    } catch (error) {
      console.error(error);
      alert("❌ Backend not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Back */}
        <div style={styles.back} onClick={() => navigate("/login")}>
          ← Back to Login
        </div>

        {/* Card */}
        <div style={styles.card}>

          {/* Step Indicator */}
          <div style={styles.steps}>
            {["IDENTITY", "METHOD", "VERIFY", "RESET"].map((step, i) => (
              <div key={i} style={styles.stepItem}>
                <div
                  style={{
                    ...styles.circle,
                    background: i === 0 ? "#1a3a1a" : "#ddd",
                    color: i === 0 ? "#fff" : "#666",
                  }}
                >
                  {i + 1}
                </div>
                <span style={styles.stepText}>{step}</span>
              </div>
            ))}
          </div>

          {/* Title */}
          <h2 style={styles.title}>Forgot your password?</h2>
          <p style={styles.subtitle}>
            Enter your email or phone number to continue
          </p>

          {/* Input */}
          <div style={{ marginTop: "20px" }}>
            <label style={styles.label}>Email or Phone</label>
            <input
              style={styles.input}
              placeholder="Enter email or phone number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Continue →"}
          </button>

        </div>

        {/* Footer */}
        <div style={styles.footer}>
          Secure Placement Intelligence © 2024
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef5ee, #f5f8f0)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Manrope, sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
  },
  back: {
    textAlign: "left",
    marginBottom: "10px",
    cursor: "pointer",
    color: "#444",
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  steps: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
  },
  stepItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "10px",
  },
  circle: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    marginBottom: "5px",
  },
  stepText: {
    fontSize: "10px",
    color: "#777",
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "5px",
  },
  subtitle: {
    fontSize: "13px",
    color: "#777",
  },
  label: {
    display: "block",
    textAlign: "left",
    marginBottom: "6px",
    fontSize: "13px",
  },
  input: {
    width: "100%",
    height: "44px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    padding: "0 12px",
    fontSize: "14px",
  },
  button: {
    marginTop: "20px",
    width: "100%",
    height: "44px",
    borderRadius: "10px",
    background: "#1a3a1a",
    color: "#fff",
    border: "none",
    fontSize: "15px",
  },
  footer: {
    marginTop: "20px",
    fontSize: "12px",
    color: "#999",
  },
};