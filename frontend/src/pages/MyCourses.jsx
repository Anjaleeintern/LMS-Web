import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/courses").then((res) => setCourses(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">
        My Courses
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition"
          >
            <h2 className="font-bold text-lg">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>

            <button
              onClick={() => navigate(`/course/${course.id}`)}
              className="mt-3 bg-blue-600 text-white px-4 py-1 rounded"
            >
              View Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}