const db = require("../config/db");

// Create course (Instructor only)
exports.createCourse = (req, res) => {
  const { title, description } = req.body;

  const query = `
    INSERT INTO courses (title, description, instructor_id)
    VALUES (?, ?, ?)
  `;

  db.run(query, [title, description, req.user.id], function (err) {
    if (err) return res.status(400).json(err.message);

    res.json({ message: "Course created" });
  });
};

// Get all courses
exports.getCourses = (req, res) => {
  db.all(`SELECT * FROM courses`, [], (err, rows) => {
    res.json(rows);
  });
};

// Enroll course
exports.enrollCourse = (req, res) => {
  const { course_id } = req.body;

  db.run(
    `INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)`,
    [req.user.id, course_id],
    function (err) {
      if (err) return res.status(400).json(err.message);

      res.json({ message: "Enrolled successfully" });
    }
  );
};