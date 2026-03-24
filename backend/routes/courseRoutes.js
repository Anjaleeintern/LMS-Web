const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { verifyToken } = require("../middleware/authMiddleware");

// Create course
router.post("/", verifyToken , (req, res) => {
  const { title, description } = req.body;
  console.log(title, description, req.user);

  db.run(
    `INSERT INTO courses (title, description, instructor_id) VALUES (?, ?, ?)`,
    [title, description, req.user.id],
    function (err) {
      if (err) return res.json(err);
      res.json({ id: this.lastID });
    }
  );
});

// Get instructor courses
router.get("/", (req, res) => {
  db.all(`SELECT * FROM courses`, [], (err, rows) => {
    res.json(rows);
  });
});


// UPDATE COURSE
router.put("/:id", verifyToken, (req, res) => {
  const { title, description } = req.body;

  db.run(
    `UPDATE courses SET title=?, description=? WHERE id=?`,
    [title, description, req.params.id],
    () => res.json({ message: "Updated" })
  );
});

// DELETE COURSE
router.delete("/:id", verifyToken, (req, res) => {
  db.run(`DELETE FROM courses WHERE id=?`, [req.params.id], () =>
    res.json({ message: "Deleted" })
  );
});

module.exports = router;