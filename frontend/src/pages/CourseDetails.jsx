import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [current, setCurrent] = useState(null);

  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    fetchLessons();
    
    fetchCompleted();
  }, []);

  // ✅ FETCH LESSONS
  const fetchLessons = async () => {
    const res = await API.get(`/lessons/${id}`);
    setLessons(res.data);

    if (res.data.length > 0) {
      setCurrent(res.data[0]);
    }
  };

  // ✅ FETCH PROGRESS %
  const progress =
  lessons.length === 0
    ? 0
    : Math.round((completedLessons.length / lessons.length) * 100);
  // ✅ FETCH COMPLETED LESSONS
  const fetchCompleted = async () => {
    const res = await API.get(`/progress/completed/${id}`);
   const uniqueIds = [...new Set(res.data.map((l) => l.lesson_id))];
setCompletedLessons(uniqueIds); // already array of ids
  };

  // ✅ MARK COMPLETE
  const markComplete = async (lessonId) => {
    try {
      await API.post("/progress", { lesson_id: lessonId });

      // ✅ UI instant update
      setCompletedLessons((prev) =>
        prev.includes(lessonId) ? prev : [...prev, lessonId]
      );

    
    } catch (err) {
      alert("Already completed or error");
    }
  };

  // ✅ YOUTUBE FIX
  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("watch?v="))
      return url.replace("watch?v=", "embed/");
    if (url.includes("youtu.be/"))
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    return url;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* ✅ PROGRESS BAR */}
      <div className="mb-6">
        <p className="font-semibold text-lg">
          Progress: {progress.toFixed(0)}%
        </p>

        <div className="bg-gray-300 h-3 rounded overflow-hidden">
          <div
            className="bg-green-500 h-3 rounded transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">

        {/* 📚 SIDEBAR */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold mb-3">Lessons</h2>

          {lessons.map((l, i) => {
            const isDone = completedLessons.includes(l.id);

            return (
              <div
                key={l.id}
                onClick={() => setCurrent(l)}
                className={`p-2 mb-2 cursor-pointer rounded-lg transition
                  ${isDone ? "bg-green-200" : ""}
                  ${
                    !isDone && current?.id === l.id
                      ? "bg-indigo-200"
                      : "hover:bg-gray-100"
                  }
                `}
              >
                {isDone ? "✅" : "📘"} Lesson {i + 1} - {l.title}
              </div>
            );
          })}
        </div>

        {/* 🎥 MAIN */}
        <div className="md:col-span-3 space-y-4">

          <h2 className="text-2xl font-bold">{current?.title}</h2>

          {/* VIDEO */}
          {current?.video_url && (
            <iframe
              width="100%"
              height="400"
              src={getEmbedUrl(current.video_url)}
              title="video"
              allowFullScreen
              className="rounded shadow"
            ></iframe>
          )}

          {/* TEXT */}
          {current?.text_content && (
            <div className="bg-white p-4 rounded shadow">
              {current.text_content}
            </div>
          )}

          {/* ✅ MARK COMPLETE BUTTON */}
          {current && (
            <button
              disabled={completedLessons.includes(current.id)}
              onClick={() => markComplete(current.id)}
              className={`mt-4 px-4 py-2 rounded-lg text-white transition shadow
                ${
                  completedLessons.includes(current.id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
            >
              {completedLessons.includes(current.id)
                ? "Completed ✅"
                : "Mark as Completed"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}