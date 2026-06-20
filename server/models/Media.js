const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      enum: ["chiropractic", "yoga", "studio", "events", "other"],
      default: "other",
    },
    url: {
      // full Cloudinary URL - the frontend uses this directly
      type: String,
      required: true,
    },
    publicId: {
      // Cloudinary's identifier for this file, needed to delete it later
      type: String,
      required: true,
    },
    featured: {
      // shown in the homepage hero/about highlight if true
      type: Boolean,
      default: false,
    },
    order: {
      // lower numbers show first in the gallery
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Media", mediaSchema);
