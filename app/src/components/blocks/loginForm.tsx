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
import { toast } from "../../lib/hooks/use-toast";
import { Spinner } from "../ui/spinner";
import { useAuth } from "../../lib/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { loginFormSchema } from "@/schemas/userSchema";

export function LoginForm() {
	const { login } = useAuth();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const result = loginFormSchema.safeParse(formData);
		if (!result.success) {
			const newErrors = result.error.errors.reduce((acc, curr) => {
				acc[curr.path[0]] = curr.message;
				return acc;
			}, {});
			setErrors(newErrors);
			return;
		}
		try {
			setLoading(true);
			const res = await fetch(`http://localhost:8080/api/user/login`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			console.log(data);
			if (data.success) {
				login();
				toast({
					title: "Success!",
					description: "You are now logged in.",
				});
				setLoading(false);
				setFormData({
					...formData,
					email: "",
					password: "",
				});
				setErrors({
					...errors,
					email: "",
					password: "",
				});
				navigate("/dashboard");
			} else {
				throw new Error(data.error || "Unknown error occurred");
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
	};

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<form className="grid gap-4" noValidate onSubmit={handleSubmit}>
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
							name="email"
							onChange={handleChange}
						/>
					</div>
					<div className="grid gap-2">
						{errors.email && <p className="text-red-500">{errors.email}</p>}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							name="password"
							required
							onChange={handleChange}
						/>
					</div>
					<div className="grid gap-2">
						{errors.password && (
							<p className="text-red-500">{errors.password}</p>
						)}
					</div>
					<Button
						className="w-full"
						type="submit"
						disabled={loading ? true : false}
					>
						{loading ? <Spinner className="text-white" /> : "Sign in"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
