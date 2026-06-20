// Local development entry point only.
// On Vercel, api/index.js exports the same app as a serverless function instead.
const app = require("./app");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`RK Fusion API listening on port ${PORT}`));
