import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StudentSignup from "./pages/StudentSignup";
import TPOSignup from "./pages/TPOSignup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import FacultySignup from "./pages/FacultySignup";

function Dashboard() {
  return <h2>Student Dashboard</h2>;
}

function TPODashboard() {
  return <h2>TPO Dashboard</h2>;
}

function FacultyDashboard() {
  return <h2>Faculty Dashboard</h2>;
}

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/tpo-signup" element={<TPOSignup />} />

        <Route path="/student-signup" element={<StudentSignup />} />

        <Route path="/faculty-signup" element={<FacultySignup />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tpo-dashboard"
          element={
            <ProtectedRoute allowedRole="TPO">
              <TPODashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty-dashboard"
          element={
            <ProtectedRoute allowedRole="FACULTY">
              <FacultyDashboard />
            </ProtectedRoute>
          }
      />

      </Routes>
    </Router>
  );
}

export default App;