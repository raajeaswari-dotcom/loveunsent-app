import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("MONGODB_URI is missing in .env.local");

declare global {
  var _mongoose: { conn: any; promise: any } | undefined;
}

if (!global._mongoose) {
  global._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (global._mongoose!.conn) return global._mongoose!.conn;

  if (!global._mongoose!.promise) {
    global._mongoose!.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => mongoose);
  }

  global._mongoose!.conn = await global._mongoose!.promise;
  return global._mongoose!.conn;
}
