import { Router } from "express";
import {
	getCurrentUser,
	getUser,
	loginUser,
	logoutUser,
	registerUser,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authenticateToken, logoutUser);
router.get("/me", authenticateToken, getCurrentUser);
router.get("/:id", authenticateToken, getUser);

export default router;
