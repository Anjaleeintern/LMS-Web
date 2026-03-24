

import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ NEW
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [fullName, setFullName] = useState("");

  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const fetchData = async () => {
    try {
      const [allCourses, enrolled] = await Promise.all([
        API.get("/courses"),
        API.get("/enrollments"),
      ]);

      setCourses(allCourses.data);
      setEnrolledCourses(enrolled.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ OPEN FORM
  const openEnrollForm = (courseId) => {
    setSelectedCourse(courseId);
    setShowForm(true);
  };

  // ✅ SUBMIT FORM
  const submitEnroll = async () => {
    try {
      await API.post("/enrollments", {
        course_id: selectedCourse,
        full_name: fullName,
      });

      alert("✅ Enrolled Successfully");
      setShowForm(false);
      setFullName("");
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.some((c) => c.id === courseId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-50 p-6">

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">

        <div>
          <h2 className="text-lg font-semibold">
            Welcome, {user?.name} 👋
          </h2>

          <h1 className="text-3xl font-bold text-blue-700">
            🎓 Explore Courses
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/my-courses")}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            My Courses
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ✅ ENROLL FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl shadow-xl w-80 animate-scaleIn">
            <h2 className="text-xl font-bold mb-3">
              Enter Details
            </h2>

            <input
              placeholder="Full Name (for certificate)"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border p-2 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={submitEnroll}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COURSES */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((c) => {
            const enrolled = isEnrolled(c.id);

            return (
              <div
                key={c.id}
                className="bg-white p-5 rounded-xl shadow hover:scale-105 transition"
              >
                <h2 className="font-bold">{c.title}</h2>
                <p className="text-sm text-gray-600">
                  {c.description}
                </p>

                {enrolled ? (
                  <button
                    onClick={() => navigate(`/course/${c.id}`)}
                    className="mt-3 w-full bg-green-600 text-white py-2 rounded"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={() => openEnrollForm(c.id)}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}