const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const db = require("../config/db");


// ✅ MARK LESSON COMPLETE (NO ERROR VERSION)
router.post("/", verifyToken, (req, res) => {
  const { lesson_id } = req.body;

  if (!lesson_id) {
    return res.status(400).json({ message: "Lesson ID required" });
  }

  // पहले check करो already completed है या नहीं
  db.get(
    `SELECT * FROM progress WHERE student_id = ? AND lesson_id = ?`,
    [req.user.id, lesson_id],
    (err, row) => {
      if (err) return res.status(500).json(err.message);

      if (row) {
        // ✅ already completed → error नहीं देंगे
        return res.json({ message: "Already completed" });
      }

      // insert new
      db.run(
        `INSERT INTO progress (student_id, lesson_id, completed) VALUES (?, ?, 1)`,
        [req.user.id, lesson_id],
        function (err) {
          if (err) return res.status(500).json(err.message);

          res.json({ message: "Completed successfully" });
        }
      );
    }
  );
});


// ✅ GET COMPLETED LESSONS
router.get("/completed/:courseId", verifyToken, (req, res) => {
  const courseId = req.params.courseId;

  db.all(
    `
    SELECT p.lesson_id
    FROM progress p
    JOIN lessons l ON l.id = p.lesson_id
    WHERE p.student_id = ? AND l.course_id = ?
    `,
    [req.user.id, courseId],
    (err, rows) => {
      if (err) return res.status(500).json(err.message);
      res.json(rows);
    }
  );
});


// ✅ REAL PROGRESS (0–100 FIXED)
router.get("/:courseId", verifyToken, (req, res) => {
  const courseId = req.params.courseId;

  db.get(
    `
    SELECT 
      COUNT(DISTINCT l.id) AS total,
      COUNT(DISTINCT p.lesson_id) AS completed
    FROM lessons l
    LEFT JOIN progress p 
      ON l.id = p.lesson_id 
      AND p.student_id = ?
    WHERE l.course_id = ?
    `,
    [req.user.id, courseId],
    (err, data) => {
      if (err) return res.status(500).json(err.message);

      const percent =
        data.total === 0 ? 0 : Math.round((data.completed / data.total) * 100);

      res.json({ progress: percent });
    }
  );
});


// ✅ INSTRUCTOR ANALYTICS (REAL DASHBOARD)
router.get("/instructor/analytics", verifyToken, (req, res) => {
  const instructorId = req.user.id;

  db.all(
    `
    SELECT 
      u.name AS student_name,
      c.title AS course_title,

      COUNT(DISTINCT l.id) AS total_lessons,
      COUNT(DISTINCT p.lesson_id) AS completed_lessons,

      CASE 
        WHEN COUNT(DISTINCT l.id) = 0 THEN 0
        ELSE ROUND((COUNT(DISTINCT p.lesson_id) * 100.0 / COUNT(DISTINCT l.id)))
      END AS progress

    FROM enrollments e
    JOIN users u ON u.id = e.student_id
    JOIN courses c ON c.id = e.course_id
    LEFT JOIN lessons l ON l.course_id = c.id
    LEFT JOIN progress p 
      ON p.lesson_id = l.id 
      AND p.student_id = u.id

    WHERE c.instructor_id = ?

    GROUP BY u.id, c.id
    `,
    [instructorId],
    (err, rows) => {
      if (err) return res.status(500).json(err.message);
      res.json(rows);
    }
  );
});

module.exports = router;