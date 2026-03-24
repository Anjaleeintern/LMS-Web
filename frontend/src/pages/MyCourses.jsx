import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const res = await API.get("/enrollments"); // ✅ IMPORTANT CHANGE
      setCourses(res.data);
    } catch (err) {
      console.log(err);
      alert("Error loading enrolled courses");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        🎓 My Courses
      </h1>

      {courses.length === 0 ? (
        <p className="text-gray-600">No enrolled courses yet</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 hover:shadow-2xl transition"
            >
              <h2 className="font-bold text-lg text-gray-800">
                {course.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {course.description}
              </p>

              <button
                onClick={() => navigate(`/course/${course.id}`)}
                className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Continue Learning ▶
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}