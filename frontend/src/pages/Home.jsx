import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/courses").then((res) => setCourses(res.data));
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await API.post("/enrollments", { course_id: courseId });
      alert("✅ Enrolled Successfully!");
    } catch (err) {
      alert("❌ Please login first");
    }
  };

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen">

      {/* HERO SECTION */}
      <div className="text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Learn Anytime, Anywhere 🚀
        </h1>

        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Join thousands of learners and instructors. Build skills, track progress, and grow your career.
        </p>

        <button
           onClick={() => {
            console.log("Clicked"); 
    console.log("USER:", user);

    if (!user) {
  navigate("/login"); // better than signup
} else {
  navigate(user.role === "student" ? "/student" : "/instructor");
}
  }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Get Started
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center px-6">
        <input
          placeholder="Search courses..."
          className="w-full md:w-1/2 p-3 border rounded-xl shadow-sm"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* COURSES */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="bg-white p-5 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <h2 className="font-bold text-lg mb-2">{course.title}</h2>
            <p className="text-gray-600 text-sm mb-3">{course.description}</p>

            <button
              onClick={() => handleEnroll(course.id)}
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Enroll
            </button>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <div className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-50 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">📊 Track Progress</h3>
            <p className="text-gray-600">
              Monitor your learning journey with real-time progress tracking.
            </p>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">🎓 Expert Courses</h3>
            <p className="text-gray-600">
              Learn from industry-level instructors and curated content.
            </p>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">⚡ Flexible Learning</h3>
            <p className="text-gray-600">
              Learn anytime, anywhere at your own pace.
            </p>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">About Our Platform</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Our LMS platform is designed to provide seamless learning experience
          for students and instructors with powerful features like course creation,
          progress tracking, and interactive learning.
        </p>
      </div>

      {/* FOOTER */}
      <div className="bg-gray-800 text-white text-center py-4">
        © 2026 LMS Platform | Built with ❤️
      </div>
    </div>
  );
}