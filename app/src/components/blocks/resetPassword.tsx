import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { emailSchema } from "@/schemas/userSchema";
import { toast } from "@/lib/hooks/use-toast";
import { set } from "zod";
import { Spinner } from "../ui/spinner";
import { Label } from "../ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Link } from "react-router-dom";

const ResetPassword = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmitReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Validate the email
		const result = emailSchema.safeParse({ email });
		if (!result.success) {
			console.log(result);
			toast({
				title: "Error submitting password reset",
				description: result.error.errors[0].message,
			});
			return;
		}
		try {
			setLoading(true);
			const res = await fetch(
				`http://localhost:8080/api/user/forgot-password`,
				{
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email }),
				}
			);
			const data = await res.json();
			if (!data.success) {
				throw new Error(data.message);
			}
			toast({
				title: "Password reset sent",
				description:
					"We've sent you an email with instructions to reset your password",
			});
			formRef.current?.reset();
		} catch (error) {
			console.log(error);
			toast({
				title: "Error submitting password reset",
				description: "An error occurred while resetting your password",
			});
			return;
		} finally {
			setLoading(false);
		}

		console.log(email);
	};

	useEffect(() => {
		console.log(email);
	}, [email]);
	return (
		<Container>
			<Card className="mx-auto max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Forgot Password</CardTitle>
					<CardDescription>
						Enter your email address and we'll send you a link to reset your
						password.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handleSubmitReset}
						noValidate
						className="max-w-md mx-auto space-y-6"
						ref={formRef}
					>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>

								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
									name="email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<Button type="submit" className="w-full">
								{loading ? <Spinner className="text-white" /> : "Request Reset"}
							</Button>
							<Link
								to="/sign-in"
								className="w-full inline-flex h-10 items-center justify-center rounded-md bg-gray-100 px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700 dark:focus-visible:ring-gray-300"
							>
								Sign In
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</Container>
	);
};

export default ResetPassword;
