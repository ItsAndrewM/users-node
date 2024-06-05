import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const PostModal = ({
	showNewPostModal,
	setShowNewPostModal,
}: {
	setShowNewPostModal: (showNewPostModal: boolean) => void;
	showNewPostModal: boolean;
}) => {
	return (
		<Dialog open={showNewPostModal} onOpenChange={setShowNewPostModal}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Create New Post</DialogTitle>
					<DialogDescription>
						Fill out the form to create a new blog post.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="title">Title</Label>
						<Input id="title" placeholder="Enter post title" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="cover-photo">Cover Photo</Label>
						<Input id="cover-photo" type="file" accept="image/*" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="content">Content</Label>
						<Textarea id="content" placeholder="Enter post content" rows={5} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="author">Author</Label>
						<Input id="author" placeholder="Enter author name" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="publish-date">Publish Date</Label>
						<Input
							id="publish-date"
							type="date"
							placeholder="Select publish date"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Create Post</Button>
					<Button variant="outline" onClick={() => setShowNewPostModal(false)}>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default PostModal;
