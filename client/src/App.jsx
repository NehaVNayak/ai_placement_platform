import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StudentSignup from "./pages/StudentSignup";
import TPOSignup from "./pages/TPOSignup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import FacultySignup from "./pages/FacultySignup";

import TPODashboard from "./pages/TPODashboard";
import Chatbot from "./pages/chatbot";
import FacultyDashboard from './pages/FacultyDashboard';
import TPOPerformanceDashboard from "./pages/TPOPerformanceDashboard";
import StudentPerformance from "./pages/StudentPerformance";

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
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
// Add this import at the top with the others
import ResumePage from "./pages/ResumePage";
import Performance from "./pages/Performance"

/* ✅ NEW IMPORT */
import FloatingChatbot from "./components/FloatingChatbot";

/* new import */
import TopNotification from "./components/TopNotification";
import TPOViewNotifications from "./pages/TPOViewNotifications";

/*function TPODashboard() {
  return <h2>TPO Dashboard</h2>;
}

function FacultyDashboard() {
  return <h2>Faculty Dashboard</h2>;
}*/

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingProject />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tpo-signup" element={<TPOSignup />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/faculty-signup" element={<FacultySignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* OPTIONAL: keep or remove */}
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/student-performance/:id" element={<StudentPerformance />} /> 
        <Route path="/view-notifications" element={<TPOViewNotifications />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
             path="/tpo-notification"
             element={
               <ProtectedRoute allowedRole="TPO">
                 <TPODashboard />
               </ProtectedRoute>
             }
          />

        <Route
          path="/tpo-dashboard"
          element={
            <ProtectedRoute allowedRole="TPO">
              <TPOPerformanceDashboard />
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
        path="/performanceAnalysis"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <Performance />
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

      <Route
        path="/resume"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <ResumePage />
          </ProtectedRoute>
        }
      />



      </Routes>

      {/* ✅ THIS IS THE MAIN ADDITION */}
      <FloatingChatbot />

    </Router>
  );
}

export default App;