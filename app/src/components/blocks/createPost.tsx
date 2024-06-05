import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [coverPhoto, setCoverPhoto] = useState(null);
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("title", title);
		formData.append("content", content);
		formData.append("coverPhoto", coverPhoto);
		formData.append("authorId", "1"); // Example author ID
		formData.append("published", "true");
		formData.append("tags", "example, tags"); // Example tags

		try {
			console.log(formData);
			const response = await fetch("http://localhost:8080/api/posts/posts", {
				method: "POST",
				body: formData,
			});
			console.log(response);
			const data = await response.json();
			console.log(data);
			setMessage("Post created successfully!");
		} catch (error) {
			console.error("Error:", error);
			setMessage("Failed to create post.");
		}
	};

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Create Post</CardTitle>
				<CardDescription>
					Fill out the form to create a new post.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<Input
						type="text"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
					<Textarea
						placeholder="Content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						required
					/>
					<Input
						type="file"
						accept="image/png, image/jpeg"
						onChange={(e) => setCoverPhoto(e.target.files[0])}
						required
					/>
					<Button type="submit">Create Post</Button>
					{message && <p>{message}</p>}
				</form>
			</CardContent>
		</Card>
	);
};
// 		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
// 			<Input
// 				type="text"
// 				placeholder="Title"
// 				value={title}
// 				onChange={(e) => setTitle(e.target.value)}
// 				required
// 			/>
// 			<Textarea
// 				placeholder="Content"
// 				value={content}
// 				onChange={(e) => setContent(e.target.value)}
// 				required
// 			/>
// 			<Input
// 				type="file"
// 				onChange={(e) => setCoverPhoto(e.target.files[0])}
// 				required
// 			/>
// 			<Button type="submit">Create Post</Button>
// 			{message && <p>{message}</p>}
// 		</form>
// 	);
// };

export default CreatePost;
