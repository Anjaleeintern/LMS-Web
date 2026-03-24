const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");

const {
  addLesson,
  getLessons,
  deleteLesson,
  updateLesson, // ✅ ADD THIS
} = require("../controllers/lessonController");

router.post("/", verifyToken, addLesson);
router.get("/:courseId", getLessons);
router.delete("/:id", verifyToken, deleteLesson);
router.put("/:id", verifyToken, updateLesson); // ✅ ADD THIS

module.exports = router;