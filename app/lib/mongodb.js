// lib/mongodb.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to environment variables");
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  // Use global variable in development to prevent multiple connections
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoose) global._mongoose = { conn: null, promise: null };

    if (!global._mongoose.promise) {
      global._mongoose.promise = mongoose.connect(MONGODB_URI).then((conn) => {
        global._mongoose.conn = conn;
        return conn;
      });
    }

    await global._mongoose.promise;
    isConnected = true;
  } else {
    // Production (serverless) - connect per invocation
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
  }
}
