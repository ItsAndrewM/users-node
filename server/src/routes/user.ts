import { Router } from "express";
import {
	getUser,
	loginUser,
	registerUser,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", authenticateToken, getUser);

export default router;
