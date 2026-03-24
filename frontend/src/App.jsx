import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import CourseDetails from "./pages/CourseDetails";
import MyCourses from "./pages/MyCourses";
import Home from "./pages/Home";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor"
          element={
            <ProtectedRoute role="instructor">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/course/:id" element={<CourseDetails />} />
      <Route path="/my-courses" element={<MyCourses />} />
      </Routes>
      
   
  );
}

export default App;