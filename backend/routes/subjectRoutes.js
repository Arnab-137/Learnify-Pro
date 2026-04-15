const express = require("express");

const { getSubjects, getLecturesBySubject } = require("../controllers/subjectController");
const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);
router.get("/", getSubjects);
router.get("/:subjectId/lectures", getLecturesBySubject);

module.exports = router;
