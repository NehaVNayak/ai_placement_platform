import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

// 🔐 Check if token expired
function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true; // If decode fails → treat as expired
  }
}

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ❌ No token → go to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // ⏳ Token expired → logout automatically
  if (isTokenExpired(token)) {
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  // 🚫 Role mismatch
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;