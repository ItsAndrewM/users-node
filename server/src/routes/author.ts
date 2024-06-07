import { Router } from "express";
import {
	createAuthor,
	getAllAuthors,
	getAuthorById,
	updateAuthor,
	deleteAuthor,
} from "../controllers/authorController";

const router = Router();

router.post("/author/new", createAuthor);
router.get("/authors", getAllAuthors);
router.get("/authors/:id", getAuthorById);
router.put("/authors/:id", updateAuthor);
router.delete("/authors/:id", deleteAuthor);

export default router;
