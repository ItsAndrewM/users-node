import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { set } from "react-hook-form";

const AddTag = () => {
	const [tags, setTags] = useState<string[]>([]);
	const [tag, setTag] = useState<string>("");
	const inputRef = useRef<HTMLInputElement>(null);

	const handleAddTag = (tag: string) => {
		setTags([...tags, tag]);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Submitted");
	};

	const handleRemoveTag = (tag: string) => {
		setTags(tags.filter((t) => t !== tag));
	};

	const handleRemoveAllTags = () => {
		setTags([]);
	};

	const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTag(e.target.value);
	};

	const handleKeyDown = (event) => {
		if (
			event.key === " " ||
			event.key === "Enter" ||
			event.key === "Tab" ||
			event.key === ","
		) {
			event.preventDefault(); // Prevent adding a space in the input
			setTags([...tags, tag]);
			inputRef.current.value = "";
		}
	};

	return (
		<div className="flex flex-col items-center gap-2">
			<div className="flex gap-1">
				{tags.map((tag) => (
					<div key={tag} className="flex items-center gap-1">
						<span className="text-sm font-medium">{tag}</span>
						<Button
							className="text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							onClick={() => handleRemoveTag(tag)}
						>
							<svg
								className="h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</Button>
					</div>
				))}
			</div>
			<form
				className="flex-1 sm:flex-initial flex flex-col gap-2"
				onSubmit={handleSubmit}
			>
				<Label htmlFor="tag">Tag</Label>
				<Input
					id="tag"
					type="text"
					placeholder="Add tag"
					className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					onKeyDown={handleKeyDown}
					onChange={handleTagChange}
					ref={inputRef}
				/>
				<Button
					className="rounded-md bg-primary px-3 py-2 text-sm"
					type="submit"
				>
					Add
				</Button>
			</form>
		</div>
	);
};

export default AddTag;
