import { useState } from "react";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import { toast } from "../../lib/hooks/use-toast";
import { Spinner } from "../ui/spinner";
import {
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useReactForm } from "../../lib/hooks/useReactForm";

const signupSchema = z
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
		path: ["confirmPassword"],
	});

export function NewSignUp() {
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useReactForm(signupSchema);

	const onSubmit = async (data) => {
		try {
			setLoading(true);
			const res = await fetch(`http://localhost:8080/api/user/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			const result = await res.json();
			if (result.success) {
				toast({
					title: "Success!",
					description: "Your account has been created.",
				});
			} else {
				throw new Error(result.message);
			}
		} catch (error) {
			toast({
				title: "Uh oh! Something went wrong.",
				description: error.message
					? error.message
					: "There was a problem with your request.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-xl">Sign Up</CardTitle>
				<CardDescription>
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
					<div className="grid grid-cols-2 gap-4">
						<FormItem>
							<FormLabel htmlFor="first-name">First name</FormLabel>
							<FormControl>
								<Input
									id="first-name"
									placeholder="Max"
									{...register("firstName")}
								/>
							</FormControl>
							<FormMessage>{errors.firstName?.message}</FormMessage>
						</FormItem>
						<FormItem>
							<FormLabel htmlFor="last-name">Last name</FormLabel>
							<FormControl>
								<Input
									id="last-name"
									placeholder="Robinson"
									{...register("lastName")}
								/>
							</FormControl>
							<FormMessage>{errors.lastName?.message}</FormMessage>
						</FormItem>
					</div>
					<FormItem>
						<FormLabel htmlFor="username">Username</FormLabel>
						<FormControl>
							<Input
								id="username"
								placeholder="Shadcn"
								{...register("username")}
							/>
						</FormControl>
						<FormMessage>{errors.username?.message}</FormMessage>
					</FormItem>
					<FormItem>
						<FormLabel htmlFor="email">Email</FormLabel>
						<FormControl>
							<Input
								id="email"
								placeholder="m@example.com"
								{...register("email")}
							/>
						</FormControl>
						<FormMessage>{errors.email?.message}</FormMessage>
					</FormItem>
					<FormItem>
						<FormLabel htmlFor="password">Password</FormLabel>
						<FormControl>
							<Input id="password" type="password" {...register("password")} />
						</FormControl>
						<FormMessage>{errors.password?.message}</FormMessage>
					</FormItem>
					<FormItem>
						<FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
						<FormControl>
							<Input
								id="confirmPassword"
								type="password"
								{...register("confirmPassword")}
							/>
						</FormControl>
						<FormMessage>{errors.confirmPassword?.message}</FormMessage>
					</FormItem>
					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? <Spinner className="text-white" /> : "Create an account"}
					</Button>
				</Form>
				<div className="mt-4 text-center text-sm">
					Already have an account?{" "}
					<Link to="/sign-in" className="underline">
						Sign in
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
