import { useState, useEffect } from "react";
import API from "../services/api";

export default function AddLesson({
  courseId,
  onCancel,
  onSuccess,
  editingLesson,
}) {
  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  // ✅ PREFILL DATA (EDIT MODE)
  useEffect(() => {
    if (editingLesson) {
      setTitle(editingLesson.title);
      setTextContent(editingLesson.text_content || "");
      setVideoUrl(editingLesson.video_url || "");
    }
  }, [editingLesson]);

  const handleSubmit = async () => {
    try {
      if (editingLesson) {
        // ✅ UPDATE
        await API.put(`/lessons/${editingLesson.id}`, {
          title,
          text_content: textContent,
          video_url: videoUrl,
        });

        alert("✅ Lesson Updated");
      } else {
        // ✅ ADD
        await API.post("/lessons", {
          course_id: courseId,
          title,
          text_content: textContent,
          video_url: videoUrl,
        });

        alert("✅ Lesson Added");
      }

      setTitle("");
      setTextContent("");
      setVideoUrl("");

      await onSuccess();
      onCancel();
    } catch (err) {
      alert("❌ Error");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-4">
      <h2 className="text-lg font-bold mb-3">
        {editingLesson ? "Edit Lesson ✏️" : "Add Lesson ➕"}
      </h2>

      <input
        placeholder="Lesson Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <textarea
        placeholder="Text Content"
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        placeholder="YouTube Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {editingLesson ? "Update Lesson" : "Add Lesson"}
      </button>

      <button
        onClick={onCancel}
        className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </div>
  );
}