import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import { verifyFirebaseIdToken } from "../config/firebaseAdmin.js";

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, name: user.name },
    process.env.JWT_SECRET || "dev-secret",
    { expiresIn: "7d" }
  );
}

function publicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    goal: user.goal,
    firebaseUid: user.firebaseUid,
    createdAt: user.createdAt
  };
}

function dbUnavailable(res) {
  return res.status(503).json({ message: "Database is not connected" });
}

function normalizeEmail(email) {
  return String(email || "").toLowerCase().trim();
}

export async function register(req, res) {
  if (mongoose.connection.readyState !== 1) {
    return dbUnavailable(res);
  }

  const { name, email, password, goal } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  const normalizedEmail = normalizeEmail(email);
  const exists = await User.findOne({ email: normalizedEmail });
  if (exists) {
    return res.status(409).json({ message: "Email is already registered" });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    name: String(name).trim(),
    email: normalizedEmail,
    passwordHash,
    goal: goal || "Calm"
  });

  const token = signToken(user);
  return res.status(201).json({ token, user: publicUser(user) });
}

export async function login(req, res) {
  if (mongoose.connection.readyState !== 1) {
    return dbUnavailable(res);
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const normalizedEmail = normalizeEmail(email);
  const user = await User.findOne({ email: normalizedEmail });
  if (!user || !user.passwordHash) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const passwordOk = await bcrypt.compare(password, user.passwordHash);
  if (!passwordOk) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = signToken(user);
  return res.json({ token, user: publicUser(user) });
}

export async function firebaseLogin(req, res) {
  if (mongoose.connection.readyState !== 1) {
    return dbUnavailable(res);
  }

  const { idToken, goal } = req.body;
  if (!idToken) {
    return res.status(400).json({ message: "Firebase idToken is required" });
  }

  let decoded;
  try {
    decoded = await verifyFirebaseIdToken(idToken);
  } catch (error) {
    return res.status(401).json({ message: error.message || "Invalid Firebase token" });
  }

  const firebaseUid = decoded.uid;
  const email = normalizeEmail(decoded.email);
  const name = String(decoded.name || email.split("@")[0] || "Mind Mantra User").trim();

  if (!email) {
    return res.status(400).json({ message: "Firebase account must include email" });
  }

  let user = await User.findOne({
    $or: [{ firebaseUid }, { email }]
  });

  if (!user) {
    user = await User.create({
      name,
      email,
      firebaseUid,
      goal: goal || "Calm"
    });
  } else {
    user.firebaseUid = user.firebaseUid || firebaseUid;
    user.name = user.name || name;
    if (goal && !user.goal) {
      user.goal = goal;
    }
    await user.save();
  }

  const token = signToken(user);
  return res.json({ token, user: publicUser(user) });
}

export async function me(req, res) {
  if (mongoose.connection.readyState !== 1) {
    return dbUnavailable(res);
  }

  const user = await User.findById(req.user.sub);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({ user: publicUser(user) });
}
