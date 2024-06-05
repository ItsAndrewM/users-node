import { Request, Response } from "express";
import pool from "../models/userModel";
import upload from "../middleware/upload";

// Create a new post
export const createPost = async (req: Request, res: Response) => {
	upload.single("coverPhoto")(req, res, async (err) => {
		if (err) {
			return res.status(500).json({ error: "Error uploading file" });
		}

		const { title, content, authorId, published, tags } = req.body;
		const coverPhotoUrl = (req.file as Express.MulterS3.File)?.location; // The URL of the uploaded file

		// Ensure tags are formatted correctly as a PostgreSQL array literal
		const formattedTags = `{${tags
			.split(",")
			.map((tag: string) => tag.trim())
			.join(",")}}`;

		try {
			const newPost = await pool.query(
				"INSERT INTO posts (title, content, cover_photo_url, author_id, published, tags) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
				[title, content, coverPhotoUrl, authorId, published, formattedTags]
			);

			res.status(201).json(newPost.rows[0]);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal server error" });
		}
	});
};

// Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
	try {
		const posts = await pool.query("SELECT * FROM posts");

		res.status(200).json(posts.rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Get a single post by ID
export const getPostById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

		if (!post.rows[0]) {
			return res.status(404).json({ error: "Post not found" });
		}

		res.status(200).json(post.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Update a post by ID
export const updatePost = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { title, content, coverPhotoUrl, published, tags } = req.body;

	try {
		const updatedPost = await pool.query(
			"UPDATE posts SET title = $1, content = $2, cover_photo_url = $3, published = $4, tags = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *",
			[title, content, coverPhotoUrl, published, tags, id]
		);

		if (!updatedPost.rows[0]) {
			return res.status(404).json({ error: "Post not found" });
		}

		res.status(200).json(updatedPost.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Delete a post by ID
export const deletePost = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const deletedPost = await pool.query(
			"DELETE FROM posts WHERE id = $1 RETURNING *",
			[id]
		);

		if (!deletedPost.rows[0]) {
			return res.status(404).json({ error: "Post not found" });
		}

		res.status(200).json({ message: "Post deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};
