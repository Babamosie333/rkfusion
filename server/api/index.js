// Vercel entry point. Vercel auto-detects any file under /api as a
// serverless function and routes requests to it (see ../vercel.json,
// which forwards every path here so Express's own router can match it).
module.exports = require("../app");
