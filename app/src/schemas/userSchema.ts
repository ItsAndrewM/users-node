import { z } from "zod";

export const emailSchema = z.object({
	email: z.string().email("Invalid email address"),
});

export const loginFormSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(1, { message: "Password is required" })
		.min(6, { message: "Password must be at least 6 characters long" }),
});

export const registerUserFormSchema = z
	.object({
		email: z
			.string()
			.min(1, { message: "Email is required" })
			.email({ message: "Invalid email address" }),
		firstName: z.string().min(1, { message: "First name is required" }),
		lastName: z.string().min(1, { message: "Last name is required" }),
		username: z.string().min(1, { message: "Username is required" }),
		password: z
			.string()
			.min(1, { message: "Password is required" })
			.min(6, { message: "Password must be at least 6 characters long" })
			.refine((password) => /[!@#$%^&*(),.?":{}|<>]/g.test(password), {
				message: "Password must contain at least one special character",
			}),
		confirmPassword: z
			.string()
			.min(1, { message: "Confirm Password is required" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"], // Path to the field that will display the error message
	});
