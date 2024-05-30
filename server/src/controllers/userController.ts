import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../models/userModel";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_KEY as string);

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET as string;
const frontendUrl = process.env.FRONTEND_URL as string;

export const getUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const user = await pool.query("SELECT * FROM users_test WHERE id = $1", [
			id,
		]);
		if (!user.rows[0]) {
			return res.status(404).json({ success: false, error: "User not found" });
		}
		res
			.status(200)
			.json({ success: true, message: "User found", user: user.rows[0] });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Internal server error" });
	}
};

export const registerUser = async (req: Request, res: Response) => {
	const { username, email, firstName, lastName, password } = req.body;
	if (!username || !email || !firstName || !lastName || !password) {
		return res.status(400).json({ success: false, error: "Invalid request" });
	}

	try {
		// Check if username or email already exists
		const userCheck = await pool.query(
			"SELECT * FROM users_test WHERE username = $1 OR email = $2",
			[username, email]
		);
		if (userCheck.rows.length > 0) {
			return res
				.status(400)
				.json({ success: false, error: "Username or email already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Insert the new user into the database
		const newUser = await pool.query(
			"INSERT INTO users_test (username, email, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
			[username, email, firstName, lastName, hashedPassword]
		);
		if (!newUser.rows[0]) {
			return res
				.status(400)
				.json({ success: false, error: "User not created" });
		}

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: newUser.rows[0],
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Internal server error" });
	}
};

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		// Check if username exists
		const userResult = await pool.query(
			"SELECT * FROM users_test WHERE email = $1",
			[email]
		);
		const user = userResult.rows[0];
		if (!user) {
			return res
				.status(401)
				.json({ success: false, error: "Incorrect email or password" });
		}

		// compare the hashed password with the one in the database
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res
				.status(401)
				.json({ success: false, error: "Incorrect email or password" });
		}
		const token = jwt.sign(
			{ id: user.id, username: user.username, email: user.email },
			jwtSecret,
			{ expiresIn: "1h" }
		);
		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		});

		res.status(200).json({ success: true, message: "Login Successful", token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Internal server error" });
	}
};

export const logoutUser = (req: Request, res: Response) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logout successful" });
};

export const getCurrentUser = async (req: Request, res: Response) => {
	const userId = (req.user as any).id;

	try {
		const userResult = await pool.query(
			"SELECT id, username, email, first_name, last_name FROM users_test WHERE id = $1",
			[userId]
		);
		const user = userResult.rows[0];

		if (!user) {
			return res.status(404).json({ success: false, error: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Internal server error" });
	}
};

export const sendPasswordResetEmail = async (req: Request, res: Response) => {
	const { email } = req.body;
	if (!email) {
		return res.status(400).json({ success: false, error: "Invalid request" });
	}

	try {
		const userResult = await pool.query(
			"SELECT * FROM users_test WHERE email = $1",
			[email]
		);
		const user = userResult.rows[0];
		if (!user) {
			return res
				.status(401)
				.json({ success: false, error: "Incorrect email or password" });
		}

		// generate a random token
		const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
			expiresIn: "1h",
		});
		const resetUrl = `"${frontendUrl}/reset-password?token=${token}"`;
		const msg = {
			to: email,
			from: "andrewmcmillan@precisionsailloft.com", // Use your verified SendGrid sender email
			// subject: "Password Reset Request",
			templateId: process.env.SENDGRID_TEMPLATE_ID as string, // Replace with your actual template ID
			dynamicTemplateData: {
				reset_url: resetUrl,
			},
		};
		await sgMail.send(msg);
		res
			.status(200)
			.json({ success: true, message: "Password reset email sent" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Internal server error" });
	}
};

export const resetPassword = async (req: Request, res: Response) => {
	const { token, newPassword } = req.body;

	if (!token || !newPassword) {
		return res.status(400).json({ success: false, error: "Invalid request" });
	}

	try {
		const decoded = jwt.verify(token, jwtSecret) as {
			id: number;
			email: string;
		};
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await pool.query("UPDATE users_test SET password = $1 WHERE id = $2", [
			hashedPassword,
			decoded.id,
		]);

		res
			.status(200)
			.json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Invalid or expired token" });
	}
};
