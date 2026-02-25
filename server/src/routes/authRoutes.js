import { Router } from "express";
import { firebaseLogin, login, me, register } from "../controllers/authController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/firebase", firebaseLogin);
router.get("/me", requireAuth, me);

export default router;
