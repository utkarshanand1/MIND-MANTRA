import mongoose from "mongoose";

export async function connectDb(mongoUri) {
  if (!mongoUri) {
    console.warn("MONGODB_URI not set. Skipping database connection.");
    return;
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}
