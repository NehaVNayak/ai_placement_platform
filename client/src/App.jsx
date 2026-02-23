import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TPOSignup from "./pages/TPOSignup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";


function Dashboard() {
  return <h2>Welcome to Dashboard</h2>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TPOSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/tpo-dashboard"
          element={
            <ProtectedRoute allowedRole="TPO">
              <TPODashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


