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

export function SignUp() {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		firstName: "",
		lastName: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState({
		username: "",
		email: "",
		firstName: "",
		lastName: "",
		password: "",
		confirmPassword: "",
	});

	const validate = () => {
		const newErrors = {};
		if (!formData.username) newErrors.username = "Username is required";
		if (!formData.email) newErrors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(formData.email))
			newErrors.email = "Email is invalid";
		if (!formData.firstName) newErrors.firstName = "First name is required";
		if (!formData.lastName) newErrors.lastName = "Last name is required";
		if (!formData.password) newErrors.password = "Password is required";
		if (formData.password !== formData.confirmPassword)
			newErrors.confirmPassword = "Passwords do not match";
		return newErrors;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newErrors = validate();
		console.log(newErrors);
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}
		try {
			setLoading(true);
			const res = await fetch(`http://localhost:8080/api/user/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			console.log(data);
			if (data.success) {
				toast({
					title: "Success!",
					description: "Your account has been created.",
				});
				setLoading(false);
				setFormData({
					...formData,
					username: "",
					email: "",
					firstName: "",
					lastName: "",
					password: "",
					confirmPassword: "",
				});
				setErrors({
					...errors,
					username: "",
					email: "",
					firstName: "",
					lastName: "",
					password: "",
					confirmPassword: "",
				});
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			toast({
				title: "Uh oh! Something went wrong.",
				description: error.message
					? error.message
					: "There was a problem with your request.",
			});
			setLoading(false);
			console.log(error);
		}
		console.log(formData);
		// Proceed with form submission (e.g., make API call)
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
				<form className="grid gap-4" onSubmit={handleSubmit} noValidate>
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2 relative">
							<Label htmlFor="first-name">First name</Label>
							<Input
								id="first-name"
								placeholder="Max"
								required
								name="firstName"
								onChange={handleChange}
								value={formData.firstName}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="last-name">Last name</Label>
							<Input
								id="last-name"
								placeholder="Robinson"
								required
								name="lastName"
								onChange={handleChange}
								value={formData.lastName}
							/>
						</div>
						<div className="grid gap-2 relative">
							{" "}
							{errors.firstName && (
								<p className="text-red-500 ">{errors.firstName}</p>
							)}
						</div>
						<div className="grid gap-2 relative">
							{" "}
							{errors.lastName && (
								<p className="text-red-500 ">{errors.lastName}</p>
							)}
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							type="text"
							placeholder="Shadcn"
							required
							name="username"
							onChange={handleChange}
							value={formData.username}
						/>
						{errors.username && (
							<p className="text-red-500">{errors.username}</p>
						)}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
							name="email"
							onChange={handleChange}
							value={formData.email}
						/>
						{errors.email && <p className="text-red-500">{errors.email}</p>}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							name="password"
							onChange={handleChange}
							value={formData.password}
						/>
						{errors.password && (
							<p className="text-red-500">{errors.password}</p>
						)}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input
							id="confirmPassword"
							type="password"
							name="confirmPassword"
							onChange={handleChange}
							value={formData.confirmPassword}
						/>
						{errors.confirmPassword && (
							<p className="text-red-500">{errors.confirmPassword}</p>
						)}
					</div>
					<Button type="submit" className="w-full">
						{loading ? <Spinner className="text-white" /> : "Create an account"}
					</Button>
				</form>
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
