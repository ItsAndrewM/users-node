import { Request, Response } from "express";
import upload from "../middleware/upload";
import pool from "../models/userModel";

// Create a new author
export const createAuthor = async (req: Request, res: Response) => {
	upload.single("avatarPhoto")(req, res, async (err) => {
		if (err) {
			return res
				.status(500)
				.json({ success: false, error: "Error uploading file" });
		}
		const avatarUrl = (req.file as Express.MulterS3.File)?.location;
		if (!avatarUrl) {
			return res
				.status(500)
				.json({ success: false, error: "Missing avatar file" });
		}
		const { firstName, lastName, bio } = req.body;
		if (!firstName || !lastName || !bio) {
			return res
				.status(400)
				.json({ success: false, error: "Missing required fields" });
		}
		try {
			const newAuthor = await pool.query(
				"INSERT INTO authors (first_name, last_name, avatar_url, bio) VALUES ($1, $2, $3, $4) RETURNING *",
				[firstName, lastName, avatarUrl, bio]
			);

			res.status(201).json({
				success: true,
				message: "Author created successfully",
				author: newAuthor.rows[0],
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ success: false, error: "Internal server error" });
		}
	});
};

// Get all authors
export const getAllAuthors = async (req: Request, res: Response) => {
	try {
		const authors = await pool.query("SELECT * FROM authors");

		res
			.status(200)
			.json({
				success: true,
				message: "Authors fetched successfully",
				authors: authors.rows,
			});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Get a single author by ID
export const getAuthorById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const author = await pool.query("SELECT * FROM authors WHERE id = $1", [
			id,
		]);

		if (!author.rows[0]) {
			return res.status(404).json({ error: "Author not found" });
		}

		res.status(200).json(author.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Update an author by ID
export const updateAuthor = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { firstName, lastName, avatarUrl, bio } = req.body;

	try {
		const updatedAuthor = await pool.query(
			"UPDATE authors SET first_name = $1, last_name = $2, avatar_url = $3, bio = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *",
			[firstName, lastName, avatarUrl, bio, id]
		);

		if (!updatedAuthor.rows[0]) {
			return res.status(404).json({ error: "Author not found" });
		}

		res.status(200).json(updatedAuthor.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Delete an author by ID
export const deleteAuthor = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const deletedAuthor = await pool.query(
			"DELETE FROM authors WHERE id = $1 RETURNING *",
			[id]
		);

		if (!deletedAuthor.rows[0]) {
			return res.status(404).json({ error: "Author not found" });
		}

		res.status(200).json({ message: "Author deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};
