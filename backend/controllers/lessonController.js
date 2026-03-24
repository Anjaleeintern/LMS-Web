const db = require("../config/db");

// ✅ ADD / UPDATE LESSON
exports.addLesson = (req, res) => {
  const { course_id, title, text_content, video_url } = req.body;

  if (!course_id || !title) {
    return res.status(400).json({ message: "Course ID & Title required" });
  }

  db.run(
    `INSERT INTO lessons (course_id, title, text_content, video_url) VALUES (?, ?, ?, ?)`,
    [course_id, title, text_content || "", video_url || ""],
    function (err) {
      if (err) return res.status(500).json(err.message);

      res.json({
        message: "Lesson added",
        id: this.lastID,
      });
    }
  );
};

// ✅ GET LESSONS
exports.getLessons = (req, res) => {
  const { courseId } = req.params;

  db.all(
    `SELECT * FROM lessons WHERE course_id = ?`,
    [courseId],
    (err, rows) => {
      if (err) return res.status(500).json(err.message);
      res.json(rows);
    }
  );
};

// ✅ DELETE
exports.deleteLesson = (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM lessons WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json(err.message);
    res.json({ message: "Deleted" });
  });
};

// ✅ UPDATE LESSON (VERY IMPORTANT)
exports.updateLesson = (req, res) => {
  const { id } = req.params;
  const { title, text_content, video_url } = req.body;

  db.run(
    `UPDATE lessons SET title=?, text_content=?, video_url=? WHERE id=?`,
    [title, text_content, video_url, id],
    function (err) {
      if (err) return res.status(500).json(err.message);

      res.json({ message: "Lesson updated" });
    }
  );
};