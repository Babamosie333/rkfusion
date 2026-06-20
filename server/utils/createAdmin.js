// Run once with: npm run seed:admin
// Creates the first admin account from ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD in your .env
require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const email = (process.env.ADMIN_SEED_EMAIL || "").toLowerCase().trim();
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!email || !password) {
    console.error("Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD in server/.env first.");
    process.exit(1);
  }

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`Admin already exists for ${email}. Nothing to do.`);
    process.exit(0);
  }

  await Admin.create({ email, password, name: "RK Fusion Admin" });
  console.log(`Admin account created for ${email}. You can now log in from /admin-login.`);
  process.exit(0);
};

run().catch((err) => {
  console.error("Seeding failed:", err.message);
  process.exit(1);
});
