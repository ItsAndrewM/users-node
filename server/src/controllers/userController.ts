import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../models/userModel";
import exp from "constants";

const saltRounds = 10;

export const registerUser = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		// Check if username already exists
		const userCheck = await pool.query(
			"SELECT * FROM users_test WHERE username = $1",
			[username]
		);
		if (userCheck.rows.length > 0) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Insert the new user into the database
		const newUser = await pool.query(
			"INSERT INTO users_test (username, password) VALUES ($1, $2) RETURNING *",
			[username, hashedPassword]
		);

		res.status(201).json(newUser.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const loginUser = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		// Check if username exists
		const userResult = await pool.query(
			"SELECT * FROM users_test WHERE username = $1",
			[username]
		);
		const user = userResult.rows[0];
		if (!user) {
			return res
				.status(401)
				.json({ success: false, error: "Incorrect username or password" });
		}

		// compare the hashed password with the one in the database
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res
				.status(401)
				.json({ success: false, error: "Incorrect username or password" });
		}

		res.status(200).json({ success: true, message: "Login Successful" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Internal server error" });
	}
};
