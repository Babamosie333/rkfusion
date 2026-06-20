const mongoose = require("mongoose");

// Serverless functions can be invoked many times per minute, each in its own
// short-lived execution. Without caching, every invocation would open a new
// MongoDB connection and quickly exhaust your connection limit. This caches
// the connection across invocations within the same warm function instance.
let cached = global._rkFusionMongoose;
if (!cached) {
  cached = global._rkFusionMongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI)
      .then((mongooseInstance) => {
        console.log(`MongoDB connected: ${mongooseInstance.connection.host}`);
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
};

module.exports = connectDB;
