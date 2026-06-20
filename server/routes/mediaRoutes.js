const express = require("express");
const router = express.Router();
const {
  getAllMedia,
  uploadMedia,
  updateMedia,
  deleteMedia,
} = require("../controllers/mediaController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Public - the live website reads from here
router.get("/", getAllMedia);

// Private - admin dashboard only
router.post("/upload", protect, upload.single("file"), uploadMedia);
router.put("/:id", protect, updateMedia);
router.delete("/:id", protect, deleteMedia);

module.exports = router;
