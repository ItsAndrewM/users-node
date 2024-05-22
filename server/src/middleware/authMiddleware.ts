import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import pool from "../models/userModel";

const jwtSecret = process.env.JWT_SECRET as string;

export const authenticateToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies.token;

	if (!token) {
		return res
			.status(401)
			.json({ success: false, error: "Access denied. No token provided." });
	}

	try {
		const blacklistedToken = await pool.query(
			"SELECT * FROM token_blacklist WHERE token = $1",
			[token]
		);
		if (blacklistedToken.rows.length > 0) {
			return res
				.status(403)
				.json({ success: false, error: "Token has been blacklisted." });
		}

		jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
			if (err) {
				return res
					.status(403)
					.json({ success: false, error: "Invalid token." });
			}

			req.user = decoded;
			next();
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Internal server error" });
	}
};
