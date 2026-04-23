import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StudentSignup from "./pages/StudentSignup";
import TPOSignup from "./pages/TPOSignup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import FacultySignup from "./pages/FacultySignup";

import PracticeDashboard from "./pages/PracticeDashboard";
import TechnicalSubjects from "./pages/TechnicalSubjects";
import TechnicalPractice from "./pages/TechnicalPractice";
import StudentDashboard from "./pages/StudentDashboard";
import ProgrammingSubjects from "./pages/ProgrammingSubjects";
import ProgrammingPractice from "./pages/ProgrammingPractice";
import CodingPage from "./pages/CodingPage";
import CodingSubjects from "./pages/CodingSubjects";
import CodingQuestions from "./pages/CodingQuestions";
import AptitudeDashboard from "./pages/AptitudeDashboard";
import AptitudeTopics from "./pages/AptitudeTopics";
import AptitudePractice from "./pages/AptitudePractice";
import PerformanceDashboard from "./pages/PerformanceDashboard";
import WeakTopicsCard from "./pages/WeakTopicsCard";
import LandingPage from "./pages/Landingpage";   
import MockInterview from "./pages/MockInterview";
import ResultPage from "./pages/ResultPage";
import Cirriculum from "./pages/Cirriculum";
import LandingProject from "./pages/LandingProject";




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

        <Route path="/" element={<LandingProject />} />
        <Route path="/tpo-signup" element={<TPOSignup />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/faculty-signup" element={<FacultySignup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentDashboard />
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

        {/* Practice Routes */}

        <Route
          path="/practice"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <PracticeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/technical"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <TechnicalSubjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/technical-practice/:subject"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <TechnicalPractice />
            </ProtectedRoute>
          }
        />

        {/* Programming Routes */}

        <Route
          path="/languages"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <ProgrammingSubjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/programming-practice/:subject"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <ProgrammingPractice />
            </ProtectedRoute>
          }
        />

        <Route
        path="/coding/:topic/problem"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <CodingPage />
          </ProtectedRoute>
        }
      />

        <Route
          path="/coding-subjects"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <CodingSubjects />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/coding/:topic"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <CodingQuestions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aptitude"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <AptitudeDashboard />
            </ProtectedRoute>
          }
        />

      <Route
        path="/aptitude-topics/:section"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <AptitudeTopics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/aptitude-practice/:section/:topic"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <AptitudePractice />
          </ProtectedRoute>
        }
      />

      <Route
        path="/performance"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <PerformanceDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/weak-topics"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <WeakTopicsCard />
          </ProtectedRoute>
        }
      />

      {/* 🔥 LANDING PAGE (FIRST SCREEN) */}
        <Route
        path="/mock-interview"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <LandingPage />
          </ProtectedRoute>
        }
      />

        {/* 🔥 INTERVIEW PAGE */}
        <Route
        path="/interview"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <MockInterview />
          </ProtectedRoute>
        }
      />

        {/* 🔥 RESULT PAGE */}
         <Route
        path="/result"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <ResultPage />
          </ProtectedRoute>
        }
      />

       <Route
        path="/curriculum"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <Cirriculum />
          </ProtectedRoute>
        }
      />



      </Routes>
    </Router>
  );
}

export default App;