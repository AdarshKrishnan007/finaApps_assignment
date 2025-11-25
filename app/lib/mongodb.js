// lib/mongodb.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to environment variables");
}

let isConnected = false; // Track connection status

export async function connectDB() {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  // In development, use a global variable to preserve the connection across hot reloads
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoose) {
      global._mongoose = { conn: null, promise: null };
    }

    if (!global._mongoose.promise) {
      global._mongoose.promise = mongoose
        .connect(MONGODB_URI)
        .then((mongooseInstance) => {
          global._mongoose.conn = mongooseInstance;
          return mongooseInstance;
        });
    }

    await global._mongoose.promise;
    isConnected = true;
  } else {
    // In production, create a new connection per serverless function invocation
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
  }

  console.log("MongoDB connected");
}
