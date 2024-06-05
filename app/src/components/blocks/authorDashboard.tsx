import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MoveHorizontalIcon } from "../ui/icons/moveHorizontalIcon";

import AuthorHeader from "./authorHeader";
import DashboardLayout from "./dashboardLayout";
import { toast } from "@/lib/hooks/use-toast";
import { Spinner } from "../ui/spinner";

interface Author {
	name: string;
	bio: string;
	avatar: string;
}

export default function AuthorDashboard() {
	const [showAuthorModal, setShowAuthorModal] = useState(false);
	const [selectedAuthor, setSelectedAuthor] = useState(null);
	const [showAddAuthorModal, setShowAddAuthorModal] = useState(false);
	const [editAuthorModal, setEditAuthorModal] = useState(false);
	const [editAuthor, setEditAuthor] = useState(null);
	const [deleteAuthorModal, setDeleteAuthorModal] = useState(false);
	const [deleteAuthor, setDeleteAuthor] = useState(null);
	const [loading, setLoading] = useState(false);

	const authors = [
		{
			name: "John Doe",
			bio: "John is a seasoned web developer with over 10 years of experience. He specializes in JavaScript and React.",
			avatar: "/placeholder-user.jpg",
		},
		{
			name: "Jane Smith",
			bio: "Jane is a self-taught developer with a passion for React and React Native. She enjoys sharing her knowledge through writing.",
			avatar: "/placeholder-user.jpg",
		},
		{
			name: "Michael Johnson",
			bio: "Michael is a cloud architect and serverless enthusiast. He loves exploring new technologies and sharing his insights.",
			avatar: "/placeholder-user.jpg",
		},
		{
			name: "Sarah Lee",
			bio: "Sarah is a full-stack developer with expertise in GraphQL and API development. She is a strong advocate for clean code and best practices.",
			avatar: "/placeholder-user.jpg",
		},
		{
			name: "David Wilson",
			bio: "David is a performance optimization specialist. He enjoys diving deep into the intricacies of web performance and sharing his knowledge.",
			avatar: "/placeholder-user.jpg",
		},
		{
			name: "Emily Davis",
			bio: "Emily is a web accessibility expert and advocate. She is passionate about creating inclusive digital experiences for everyone.",
			avatar: "/placeholder-user.jpg",
		},
		{
			name: "Michael Thompson",
			bio: "Michael is a TypeScript enthusiast and a strong believer in the power of static typing. He enjoys sharing his knowledge through writing and speaking.",
			avatar: "/placeholder-user.jpg",
		},
		{
			name: "Jessica Wilson",
			bio: "Jessica is a security expert with a deep understanding of web application security. She enjoys sharing her knowledge and helping others secure their applications.",
			avatar: "/placeholder-user.jpg",
		},
		{
			name: "Andrew Johnson",
			bio: "Andrew is a web components evangelist. He is passionate about exploring the future of web development and sharing his insights.",
			avatar: "/placeholder-user.jpg",
		},
		{
			name: "Emily Thompson",
			bio: "Emily is a React Native developer with a passion for creating beautiful and performant mobile applications.",
			avatar: "/placeholder-user.jpg",
		},
	];
	const handleViewAuthor = (author: Author) => {
		setSelectedAuthor(author);
		setShowAuthorModal(true);
	};

	const handleEditAuthor = (author: Author) => {
		setEditAuthor(author);
		setEditAuthorModal(true);
	};

	const handleDeleteAuthor = (author: Author) => {
		setDeleteAuthor(author);
		setDeleteAuthorModal(true);
	};

	const confirmDeleteAuthor = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			await new Promise((r) => setTimeout(r, 2000));
			setDeleteAuthorModal(false);
			toast({
				title: "Success!",
				description: "Author deleted successfully.",
			});
			setLoading(false);
		} catch (error) {
			console.log(error);
			toast({
				title: "Error!",
				description: "An error occurred while deleting the author.",
			});
		}
	};
	return (
		<>
			{" "}
			<DashboardLayout>
				<AuthorHeader setShowAddAuthorModal={setShowAddAuthorModal} />
				<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
					<div className="border shadow-sm rounded-lg p-2">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead className="hidden md:table-cell">Bio</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{authors.map((author, index) => (
									<TableRow key={index}>
										<TableCell className="flex items-center gap-2">
											<Avatar className="w-8 h-8">
												<img src="/placeholder.svg" alt={author.name} />
												<AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
											</Avatar>
											<span className="font-medium">{author.name}</span>
										</TableCell>
										<TableCell className="hidden md:table-cell">
											{author.bio}
										</TableCell>
										<TableCell className="text-right">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon">
														<MoveHorizontalIcon className="w-4 h-4" />
														<span className="sr-only">Actions</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem
														onClick={() => handleViewAuthor(author)}
													>
														View Author
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => handleEditAuthor(author)}
													>
														Edit Author
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => handleDeleteAuthor(author)}
													>
														Remove Author
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</main>
			</DashboardLayout>
			// Author Modal
			<Dialog open={showAuthorModal} onOpenChange={setShowAuthorModal}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Author Details</DialogTitle>
						<DialogDescription>
							View details about the selected author.
						</DialogDescription>
					</DialogHeader>
					{selectedAuthor && (
						<div className="flex flex-col items-center gap-4">
							<Avatar className="h-24 w-24">
								<img src="/placeholder.svg" alt={selectedAuthor.name} />
								<AvatarFallback>{selectedAuthor.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<div className="grid gap-1">
								<h3 className="text-lg font-semibold">{selectedAuthor.name}</h3>
								<p className="text-gray-500 dark:text-gray-400">
									{selectedAuthor.bio}
								</p>
							</div>
						</div>
					)}
					<DialogFooter>
						<Button variant="outline" onClick={() => setShowAuthorModal(false)}>
							Close
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			// Add Author Modal
			<Dialog open={showAddAuthorModal} onOpenChange={setShowAddAuthorModal}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add Author</DialogTitle>
						<DialogDescription>
							Fill in the details to add a new author.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid items-center grid-cols-4 gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input id="name" className="col-span-3" />
						</div>
						<div className="grid items-center grid-cols-4 gap-4">
							<Label htmlFor="bio" className="text-right">
								Bio
							</Label>
							<Textarea id="bio" className="col-span-3" />
						</div>
						<div className="grid items-center grid-cols-4 gap-4">
							<Label htmlFor="avatar" className="text-right">
								Avatar
							</Label>
							<Input id="avatar" type="file" className="col-span-3" />
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Add Author</Button>
						<Button
							variant="outline"
							onClick={() => setShowAddAuthorModal(false)}
						>
							Cancel
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			// Edit Author Modal
			<Dialog open={editAuthorModal} onOpenChange={setEditAuthorModal}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit Author</DialogTitle>
						<DialogDescription>
							Fill in the details to add a new author.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid items-center grid-cols-4 gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input
								id="name"
								className="col-span-3"
								value={editAuthor?.name}
							/>
						</div>
						<div className="grid items-center grid-cols-4 gap-4">
							<Label htmlFor="bio" className="text-right">
								Bio
							</Label>
							<Textarea
								id="bio"
								className="col-span-3"
								value={editAuthor?.bio}
							/>
						</div>
						<div className="grid items-center grid-cols-4 gap-4">
							<Label htmlFor="avatar" className="text-right">
								Avatar
							</Label>
							<Input id="avatar" type="file" className="col-span-3" />
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Edit Author</Button>
						<Button variant="outline" onClick={() => setEditAuthorModal(false)}>
							Cancel
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			// Delete Author Modal
			<Dialog open={deleteAuthorModal} onOpenChange={setDeleteAuthorModal}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Delete Confirmation</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this item? This action cannot be
							undone. All associated data will be permanently removed.
						</DialogDescription>
					</DialogHeader>
					{deleteAuthor && (
						<div className="flex flex-col items-center gap-4">
							<Avatar className="h-24 w-24">
								<img src="/placeholder.svg" alt={deleteAuthor.name} />
								<AvatarFallback>{deleteAuthor.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<div className="grid gap-1">
								<h3 className="text-lg font-semibold">{deleteAuthor.name}</h3>
								<p className="text-gray-500 dark:text-gray-400">
									{deleteAuthor.bio}
								</p>
							</div>
						</div>
					)}
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setDeleteAuthorModal(false)}
						>
							Close
						</Button>
						<Button variant="destructive" onClick={confirmDeleteAuthor}>
							{loading ? <Spinner className="text-white" /> : "Delete"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
