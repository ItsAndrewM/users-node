import { Router } from "express";
import {
	createAuthor,
	getAllAuthors,
	getAuthorById,
	updateAuthor,
	deleteAuthor,
} from "../controllers/authorController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/author/new", authenticateToken, createAuthor);
// router.get("/authors", authenticateToken, getAllAuthors);
router.get("/authors", getAllAuthors);
router.get("/authors/:id", authenticateToken, getAuthorById);
router.put("/authors/:id", authenticateToken, updateAuthor);
router.delete("/authors/:id", authenticateToken, deleteAuthor);

export default router;
