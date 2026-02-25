import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      default: null
    },
    firebaseUid: {
      type: String,
      unique: true,
      sparse: true,
      default: null
    },
    goal: {
      type: String,
      default: "Calm"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);
