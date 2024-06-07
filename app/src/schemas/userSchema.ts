import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

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

export const addAuthorFormSchema = z.object({
	firstName: z.string().min(1, {
		message: "First name is required.",
	}),
	lastName: z.string().min(1, {
		message: "Last name is required.",
	}),
	avatarPhoto: z
		.any()
		.refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
		.refine(
			(file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
			"Only .jpg, .jpeg, .png and .webp formats are supported."
		),
	// avatarPhoto: z.string().min(1, {
	// 	message: "Avatar photo is required.",
	// }),
	bio: z
		.string()
		.min(10, {
			message: "Bio must be at least 10 characters.",
		})
		.max(160, {
			message: "Bio must not be longer than 30 characters.",
		}),
});
