import { Router } from "express";
import { getHealth, getResources, getSessions } from "../controllers/contentController.js";

const router = Router();

router.get("/health", getHealth);
router.get("/sessions", getSessions);
router.get("/resources", getResources);

export default router;
