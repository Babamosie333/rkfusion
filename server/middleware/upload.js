const multer = require("multer");
const path = require("path");

const IMAGE_TYPES = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
const VIDEO_TYPES = [".mp4", ".mov", ".webm"];

// Files are kept in memory only (as a buffer) and streamed straight to
// Cloudinary in the controller - serverless functions have no persistent
// disk to save them to.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if ([...IMAGE_TYPES, ...VIDEO_TYPES].includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type. Allowed: jpg, jpeg, png, webp, gif, mp4, mov, webm"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max (covers short videos)
});

module.exports = upload;
