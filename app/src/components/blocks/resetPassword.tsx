import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { emailSchema } from "@/schemas/userSchema";
import { toast } from "@/lib/hooks/use-toast";

const ResetPassword = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmitReset = (e: React.FormEvent<HTMLFormElement>) => {
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

		console.log(email);
	};

	useEffect(() => {
		console.log(email);
	}, [email]);
	return (
		<Container>
			<h1>Forgot Password</h1>
			<form
				onSubmit={handleSubmitReset}
				noValidate
				className="flex flex-col gap-4"
			>
				<Input
					type="email"
					placeholder="Email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Button type="submit">{loading ? "Loading..." : "Submit"}</Button>
			</form>
		</Container>
	);
};

export default ResetPassword;
