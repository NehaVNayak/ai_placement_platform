import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes

  /* ---------------- REDIRECT IF NO EMAIL ---------------- */
  useEffect(() => {
    if (!email) {
      alert("Session expired. Please try again.");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /* ---------------- VERIFY ---------------- */
  const handleVerify = async () => {
    if (!otp) return alert("Enter OTP");

    if (timer <= 0) {
      alert("OTP expired. Please request again.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email_or_phone: email,  // 🔥 IMPORTANT
          otp: otp
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail);
        return;
      }

      alert("OTP Verified ✅");

      navigate("/reset-password", { state: { email } });

    } catch (err) {
      alert("Error verifying OTP");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Enter OTP</h2>

        <input
          style={styles.input}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />

        {/* TIMER */}
        <p style={styles.timer}>
          Expires in: {Math.floor(timer / 60)}:
          {String(timer % 60).padStart(2, "0")}
        </p>

        <button style={styles.button} onClick={handleVerify}>
          Verify OTP
        </button>

        {timer <= 0 && (
          <p
            style={styles.resend}
            onClick={() => navigate("/forgot-password")}
          >
            Resend OTP
          </p>
        )}
      </div>
    </div>
  );
}

export default VerifyOTP;

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#e9f7e9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },
  input: {
    width: "220px",
    height: "40px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    padding: "0 10px",
    marginTop: "15px"
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#198754",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  timer: {
    marginTop: "10px",
    color: "#555"
  },
  resend: {
    marginTop: "15px",
    color: "#198754",
    cursor: "pointer",
    fontWeight: "600"
  }
};