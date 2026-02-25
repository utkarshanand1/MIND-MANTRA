import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contentRoutes from "./routes/contentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDb } from "./config/db.js";
import { initFirebaseAdmin } from "./config/firebaseAdmin.js";

dotenv.config();
initFirebaseAdmin();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Mind Mantra API" });
});

app.use("/api", contentRoutes);
app.use("/api/auth", authRoutes);

connectDb(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (no database)`);
    });
  });
