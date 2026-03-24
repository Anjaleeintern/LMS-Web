const db = require("../config/db");

// Mark lesson complete
exports.markComplete = (req, res) => {
  const { lesson_id } = req.body;

  db.run(
    `INSERT INTO progress (student_id, lesson_id, completed) VALUES (?, ?, 1)`,
    [req.user.id, lesson_id],
    function (err) {
      if (err) return res.status(400).json(err.message);

      res.json({ message: "Lesson completed" });
    }
  );
};

// Get progress %
exports.getProgress = (req, res) => {
  const { course_id } = req.params;

  const totalQuery = `
    SELECT COUNT(*) as total FROM lessons WHERE course_id = ?
  `;

  const completedQuery = `
    SELECT COUNT(*) as completed
    FROM progress p
    JOIN lessons l ON p.lesson_id = l.id
    WHERE l.course_id = ? AND p.student_id = ?
  `;

  db.get(totalQuery, [course_id], (err, total) => {
    db.get(completedQuery, [course_id, req.user.id], (err, completed) => {
      const percent =
        total.total === 0 ? 0 : (completed.completed / total.total) * 100;

      res.json({ progress: percent });
    });
  });
};