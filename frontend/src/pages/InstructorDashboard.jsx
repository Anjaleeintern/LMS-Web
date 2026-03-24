// // InstructorDashboard.jsx

// import { useState, useEffect, useContext } from "react";
// import API from "../services/api";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import AddLesson from "./AddLesson";

// export default function InstructorDashboard() {
//   const [courses, setCourses] = useState([]);
//   const [lessons, setLessons] = useState({});
//   const [expandedCourse, setExpandedCourse] = useState(null);

//   const [showCourseForm, setShowCourseForm] = useState(false);
//   const [selectedCourseId, setSelectedCourseId] = useState(null);

//   const [course, setCourse] = useState({ title: "", description: "" });
//   const [editingCourseId, setEditingCourseId] = useState(null);

//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [editingLesson, setEditingLesson] = useState(null);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/", { replace: true });
//   };

//   const fetchCourses = async () => {
//     const res = await API.get("/courses");
//     setCourses(res.data);
//   };

//   const fetchLessons = async (courseId) => {
//     const res = await API.get(`/lessons/${courseId}`);
//     setLessons((prev) => ({
//       ...prev,
//       [courseId]: res.data,
//     }));
//   };

//   const toggleLessons = async (courseId) => {
//     if (expandedCourse === courseId) {
//       setExpandedCourse(null);
//     } else {
//       setExpandedCourse(courseId);
//       await fetchLessons(courseId);
//     }
//   };

//   const handleCancel = () => {
//     setShowCourseForm(false);
//     setSelectedCourseId(null);
//     setEditingCourseId(null);
//     setCourse({ title: "", description: "" });
//   };

//   const handleCourseSubmit = async () => {
//     try {
//       if (editingCourseId) {
//         await API.put(`/courses/${editingCourseId}`, course);
//         alert("✅ Updated");
//       } else {
//         await API.post("/courses", course);
//         alert("✅ Created");
//       }

//       handleCancel();
//       fetchCourses();
//     } catch {
//       alert("❌ Error");
//     }
//   };

//   const deleteCourse = async (id) => {
//     if (!window.confirm("Delete course?")) return;
//     await API.delete(`/courses/${id}`);
//     fetchCourses();
//   };

//   const editCourse = (c) => {
//     setCourse({ title: c.title, description: c.description });
//     setEditingCourseId(c.id);
//     setShowCourseForm(true);
//   };

//   const deleteLesson = async (lessonId, courseId) => {
//     if (!window.confirm("Delete lesson?")) return;
//     await API.delete(`/lessons/${lessonId}`);
//     fetchLessons(courseId);
//   };

//   const getEmbedUrl = (url) => {
//     if (!url) return "";

//     // youtube watch url
//     if (url.includes("watch?v=")) {
//       return url.replace("watch?v=", "embed/");
//     }

//     // short youtube url
//     if (url.includes("youtu.be/")) {
//       return url.replace("youtu.be/", "www.youtube.com/embed/");
//     }

//     // already embed
//     if (url.includes("embed/")) {
//       return url;
//     }

//     return url;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-100 to-indigo-50 p-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-indigo-700">
//             👩‍🏫 Instructor Dashboard
//           </h1>
//           <p>Welcome, {user?.name}</p>
//         </div>

//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>

//       {/* BUTTON */}
//       <button
//         onClick={() => setShowCourseForm(!showCourseForm)}
//         className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-6"
//       >
//         + Create Course
//       </button>

//       {/* COURSE FORM */}
//       {showCourseForm && (
//         <div className="bg-white p-6 rounded-xl shadow mb-6">
//           <h2 className="text-xl font-bold mb-4">
//             {editingCourseId ? "Edit Course" : "Create Course"}
//           </h2>

//           <input
//             placeholder="Title"
//             value={course.title}
//             onChange={(e) => setCourse({ ...course, title: e.target.value })}
//             className="w-full mb-3 p-2 border rounded"
//           />

//           <input
//             placeholder="Description"
//             value={course.description}
//             onChange={(e) =>
//               setCourse({ ...course, description: e.target.value })
//             }
//             className="w-full mb-3 p-2 border rounded"
//           />

//           <div className="flex gap-3">
//             <button
//               onClick={handleCourseSubmit}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
//             >
//               {editingCourseId ? "Update" : "Create"}
//             </button>

//             <button
//               onClick={handleCancel}
//               className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ADD LESSON COMPONENT */}
//       {selectedCourseId && (
//          <AddLesson
//     courseId={selectedCourseId}
//     editingLesson={editingLesson} // ✅ ADD THIS
//     onCancel={() => {
//       setSelectedCourseId(null);
//       setEditingLesson(null); // ✅ RESET
//     }}
//     onSuccess={async () => {
//       await fetchLessons(selectedCourseId);
//       setExpandedCourse(selectedCourseId);
//     }}
//   />
//       )}

//       {/* COURSE LIST */}
//       <div className="grid md:grid-cols-3 gap-4">
//         {courses.map((c) => (
//           <div
//             key={c.id}
//             className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
//           >
//             <h3 className="font-bold">{c.title}</h3>
//             <p className="text-sm text-gray-600">{c.description}</p>

//             <div className="flex flex-wrap gap-2 mt-3">
//               <button
//                 onClick={() => editCourse(c)}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={() => deleteCourse(c.id)}
//                 className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
//               >
//                 Delete
//               </button>

//               <button
//                 onClick={() => toggleLessons(c.id)}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded"
//               >
//                 {expandedCourse === c.id ? "Hide ▲" : "Lessons ▼"}
//               </button>

//               <button
//                 onClick={() => setSelectedCourseId(c.id)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
//               >
//                 + Lesson
//               </button>
//             </div>

//             {expandedCourse === c.id && (
//               <div className="mt-3 bg-gray-100 p-2 rounded">
//                 {lessons[c.id]?.length === 0 ? (
//                   <p>No lessons</p>
//                 ) : (
//                   lessons[c.id]?.map((l) => (
//                     <div
//                       key={l.id}
//                       className="border-b py-3 flex justify-between items-start"
//                     >
//                      <div>
//   {/* TITLE */}
//   <p className="font-semibold text-indigo-700">
//     {l.title}
//   </p>

//   {/* TEXT CONTENT */}
//   {l.text_content && (
//     <p className="text-sm text-gray-600 mt-1">
//       {l.text_content}
//     </p>
//   )}

//   {/* VIDEO */}
//   {l.video_url && (
//     <div className="mt-2">
//       <iframe
//         width="250"
//         height="150"
//         src={getEmbedUrl(l.video_url)}
//         title="video"
//         allowFullScreen
//         className="rounded"
//       ></iframe>
//     </div>
//   )}
// </div>

//                       <button
//                         onClick={() => {
//                           setEditingLesson(l);
//                           setSelectedCourseId(c.id);
//                         }}
//                         className="text-blue-500 ml-2"
//                       >
//                         Edit
//                       </button>

//                       {/* DELETE BUTTON */}

//                       <button
//                         onClick={() => deleteLesson(l.id, c.id)}
//                         className="text-red-500 ml-2"
//                       >
//                         X
//                       </button>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useState, useEffect, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AddLesson from "./AddLesson";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState({});
  const [expandedCourse, setExpandedCourse] = useState(null);

  const [showCourseForm, setShowCourseForm] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const [course, setCourse] = useState({ title: "", description: "" });
  const [editingCourseId, setEditingCourseId] = useState(null);

  const [editingLesson, setEditingLesson] = useState(null);

  // ✅ NEW: student progress
  const [progressData, setProgressData] = useState([]);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
    fetchProgress();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const fetchCourses = async () => {
    const res = await API.get("/courses");
    setCourses(res.data);
  };

  const fetchLessons = async (courseId) => {
    const res = await API.get(`/lessons/${courseId}`);
    setLessons((prev) => ({
      ...prev,
      [courseId]: res.data,
    }));
  };

  // ✅ NEW: Fetch student progress
  const fetchProgress = async () => {
  try {
    const res = await API.get("/progress/instructor/analytics");
    setProgressData(res.data);
  } catch (err) {
    console.log(err);
  }
};

  const toggleLessons = async (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
      await fetchLessons(courseId);
    }
  };

  const handleCancel = () => {
    setShowCourseForm(false);
    setSelectedCourseId(null);
    setEditingCourseId(null);
    setEditingLesson(null);
    setCourse({ title: "", description: "" });
  };

  const handleCourseSubmit = async () => {
    try {
      if (editingCourseId) {
        await API.put(`/courses/${editingCourseId}`, course);
        alert("✅ Updated");
      } else {
        await API.post("/courses", course);
        alert("✅ Created");
      }

      handleCancel();
      fetchCourses();
    } catch {
      alert("❌ Error");
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete course?")) return;
    await API.delete(`/courses/${id}`);
    fetchCourses();
  };

  const editCourse = (c) => {
    setCourse({ title: c.title, description: c.description });
    setEditingCourseId(c.id);
    setShowCourseForm(true);
  };

  const deleteLesson = async (lessonId, courseId) => {
    if (!window.confirm("Delete lesson?")) return;
    await API.delete(`/lessons/${lessonId}`);
    fetchLessons(courseId);
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("watch?v="))
      return url.replace("watch?v=", "embed/");
    if (url.includes("youtu.be/"))
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    return url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">
            👩‍🏫 Instructor Dashboard
          </h1>
          <p className="text-gray-600">Welcome, {user?.name}</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
        >
          Logout
        </button>
      </div>

      {/* ✅ STUDENT PROGRESS SECTION */}
  <div className="bg-white p-5 rounded-xl shadow mb-6">
  <h2 className="text-xl font-bold text-indigo-600 mb-4">
    📊 Student Progress Dashboard
  </h2>

  {progressData.length === 0 ? (
    <p className="text-gray-500">No data available</p>
  ) : (
    <div className="space-y-3">
      {progressData.map((p, i) => (
        <div
          key={i}
          className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition"
        >
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">{p.student_name}</p>
              <p className="text-sm text-gray-500">{p.course_title}</p>
            </div>

            <p className="font-bold text-indigo-600">
              {Math.round(p.progress)}%
            </p>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-300 h-2 mt-2 rounded">
            <div
              className="bg-green-500 h-2 rounded transition-all"
              style={{ width: `${p.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

      {/* CREATE COURSE BUTTON */}
      <button
        onClick={() => setShowCourseForm(!showCourseForm)}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow mb-6 transition"
      >
        + Create Course
      </button>

      {/* COURSE FORM */}
      {showCourseForm && (
        <div className="bg-white p-6 rounded-xl shadow mb-6 animate-fadeIn">
          <h2 className="text-xl font-bold mb-4">
            {editingCourseId ? "Edit Course" : "Create Course"}
          </h2>

          <input
            placeholder="Title"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            placeholder="Description"
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            className="w-full mb-3 p-2 border rounded"
          />

          <div className="flex gap-3">
            <button
              onClick={handleCourseSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ADD LESSON */}
      {selectedCourseId && (
        <AddLesson
          courseId={selectedCourseId}
          editingLesson={editingLesson}
          onCancel={handleCancel}
          onSuccess={async () => {
            await fetchLessons(selectedCourseId);
            setExpandedCourse(selectedCourseId);
          }}
        />
      )}

      {/* COURSE LIST */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            <h3 className="text-lg font-bold text-gray-800">{c.title}</h3>
            <p className="text-sm text-gray-500 mb-3">{c.description}</p>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => editCourse(c)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteCourse(c.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>

              <button
                onClick={() => toggleLessons(c.id)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded"
              >
                {expandedCourse === c.id ? "Hide ▲" : "Lessons ▼"}
              </button>

              <button
                onClick={() => setSelectedCourseId(c.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
              >
                + Lesson
              </button>
            </div>

            {/* LESSONS */}
            {expandedCourse === c.id && (
              <div className="mt-4 space-y-3">
                {lessons[c.id]?.map((l) => (
                  <div
                    key={l.id}
                    className="bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-indigo-50 transition"
                  >
                    <p className="font-semibold text-indigo-700">
                      {l.title}
                    </p>

                    {l.text_content && (
                      <p className="text-sm text-gray-600 mt-1">
                        {l.text_content}
                      </p>
                    )}

                    {l.video_url && (
                      <iframe
                        className="mt-2 rounded"
                        width="100%"
                        height="150"
                        src={getEmbedUrl(l.video_url)}
                        title="video"
                        allowFullScreen
                      />
                    )}

                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={() => {
                          setEditingLesson(l);
                          setSelectedCourseId(c.id);
                        }}
                        className="text-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteLesson(l.id, c.id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}