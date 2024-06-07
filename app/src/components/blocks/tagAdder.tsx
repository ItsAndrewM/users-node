import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import XIcon from "../ui/icons/xIcon";

export default function TagAdder() {
	const [tags, setTags] = useState<string[]>([]);
	const [tag, setTag] = useState<string>("");
	const inputRef = useRef<HTMLInputElement>(null);
	const addTag = (tag: string) => {
		if (tag.trim() !== "") {
			setTags([...tags, tag.trim()]);
		}
	};
	const removeTag = (index: number) => {
		const newTags = [...tags];
		newTags.splice(index, 1);
		setTags(newTags);
	};
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center space-x-2">
				<Input
					type="text"
					placeholder="Add a tag"
					onKeyDown={(e) => {
						if (
							e.key === "Enter" ||
							e.key === "," ||
							e.key === " " ||
							e.key === "Tab"
						) {
							addTag((e.target as HTMLInputElement).value);
							(e.target as HTMLInputElement).value = "";
						}
					}}
					className="flex-1"
					onChange={(e) => setTag(e.target.value)}
					ref={inputRef}
				/>
				<Button
					type="button"
					onClick={() => {
						if (tag.trim() !== "") {
							addTag(tag);
							(inputRef.current as HTMLInputElement).value = "";
						}
					}}
				>
					Add
				</Button>
			</div>
			<div className="flex flex-wrap gap-2">
				{tags.map((tag, index) => (
					<div
						key={index}
						className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full flex items-center space-x-2"
					>
						<span className="text-sm font-medium">{tag}</span>
						<button
							type="button"
							className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
							onClick={() => removeTag(index)}
						>
							<XIcon className="w-4 h-4" />
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
