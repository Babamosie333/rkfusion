const path = require("path");
const cloudinary = require("../config/cloudinary");
const Media = require("../models/Media");

// @route  GET /api/media
// @access Public - powers the website gallery
const getAllMedia = async (req, res) => {
  try {
    const { category, type } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (type) filter.type = type;

    const media = await Media.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(media);
  } catch (err) {
    res.status(500).json({ message: "Could not load media", error: err.message });
  }
};

// @route  POST /api/media/upload
// @access Private (admin only)
const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file was uploaded" });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    const isVideo = [".mp4", ".mov", ".webm"].includes(ext);

    const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(dataUri, {
      resource_type: isVideo ? "video" : "image",
      folder: "rk-fusion",
    });

    const media = await Media.create({
      type: isVideo ? "video" : "image",
      title: req.body.title || "",
      category: req.body.category || "other",
      featured: req.body.featured === "true",
      url: result.secure_url,
      publicId: result.public_id,
    });

    res.status(201).json(media);
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// @route  PUT /api/media/:id
// @access Private (admin only) - edit title/category/featured/order
const updateMedia = async (req, res) => {
  try {
    const { title, category, featured, order } = req.body;
    const media = await Media.findByIdAndUpdate(
      req.params.id,
      { title, category, featured, order },
      { new: true, runValidators: true }
    );
    if (!media) return res.status(404).json({ message: "Media not found" });
    res.json(media);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// @route  DELETE /api/media/:id
// @access Private (admin only)
const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ message: "Media not found" });

    await cloudinary.uploader.destroy(media.publicId, {
      resource_type: media.type === "video" ? "video" : "image",
    });

    await media.deleteOne();
    res.json({ message: "Media deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

module.exports = { getAllMedia, uploadMedia, updateMedia, deleteMedia };
