const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { verifyToken } = require("../middleware/authMiddleware");

// ✅ Enroll in course
router.post("/", verifyToken, (req, res) => {
  const { course_id, full_name } = req.body;

  if (!course_id || !full_name) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.run(
    `INSERT INTO enrollments (student_id, course_id, full_name) VALUES (?, ?, ?)`,
    [req.user.id, course_id, full_name],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE")) {
          return res.status(400).json({ message: "Already enrolled" });
        }
        return res.status(500).json(err.message);
      }

      res.json({ message: "Enrolled successfully" });
    }
  );
});

// ✅ Get enrolled courses
router.get("/", verifyToken, (req, res) => {
  db.all(
    `
    SELECT courses.*
    FROM enrollments
    JOIN courses ON courses.id = enrollments.course_id
    WHERE enrollments.student_id = ?
    `,
    [req.user.id],
    (err, rows) => {
      res.json(rows);
    }
  );
});

module.exports = router;