import { Router } from "express";
import {
	getCurrentUser,
	getUser,
	loginUser,
	logoutUser,
	registerUser,
	resetPassword,
	sendPasswordResetEmail,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authenticateToken, logoutUser);
router.post("/reset-password", authenticateToken, resetPassword);
router.post("/forgot-password", sendPasswordResetEmail);
router.get("/me", authenticateToken, getCurrentUser);
router.get("/:id", authenticateToken, getUser);

export default router;
