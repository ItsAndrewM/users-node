import { useState } from "react";
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
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { addAuthorFormSchema } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createAuthor } from "@/lib/utils/index";

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
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		avatar: "",
		bio: "",
	});
	const [errors, setErrors] = useState({
		firstName: "",
		lastName: "",
		avatar: "",
		bio: "",
	});

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

	const handleAddAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
	};

	// const handleAddAuthor = async (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	const result = await createAuthor({
	// 		firstName: formData.firstName,
	// 		lastName: formData.lastName,
	// 		avatarPhoto: formData.avatar,
	// 		bio: formData.bio,
	// 	});
	// 	console.log(result);
	// 	if (result.success) {
	// 		toast({
	// 			title: "Success!",
	// 			description: "Author added successfully.",
	// 		});
	// 		setShowAddAuthorModal(false);
	// 		setFormData({
	// 			firstName: "",
	// 			lastName: "",
	// 			avatar: "",
	// 			bio: "",
	// 		});
	// 	} else {
	// 		toast({
	// 			title: "Error!",
	// 			description: "An error occurred while adding the author.",
	// 		});
	// 	}
	// };

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

	const form = useForm<z.infer<typeof addAuthorFormSchema>>({
		resolver: zodResolver(addAuthorFormSchema),
	});

	async function onSubmit(data: z.infer<typeof addAuthorFormSchema>) {
		// console.log(data);
		setLoading(true);
		// await new Promise((r) => setTimeout(r, 2000));
		// toast({
		// 	title: "You submitted the following values:",
		// 	description: (
		// 		<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
		// 			<code className="text-white">{JSON.stringify(data, null, 2)}</code>
		// 		</pre>
		// 	),
		// });
		// form.reset({
		// 	firstName: "",
		// 	lastName: "",
		// 	avatarPhoto: "",
		// 	bio: "",
		// });
		const result = await createAuthor({
			firstName: data.firstName,
			lastName: data.lastName,
			avatarPhoto: data.avatarPhoto,
			bio: data.bio,
		});
		console.log(result);
		if (result.success) {
			toast({
				title: "Success!",
				description: "Author added successfully.",
			});
			setShowAddAuthorModal(false);
			form.reset({
				firstName: "",
				lastName: "",
				avatarPhoto: "",
				bio: "",
			});
		} else {
			toast({
				title: "Error!",
				description: "An error occurred while adding the author.",
			});
		}
		setLoading(false);
	}

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
					<div className="flex flex-col gap-4">
						<DialogHeader>
							<DialogTitle>Add Author</DialogTitle>
							<DialogDescription>
								Fill in the details to add a new author.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<Form {...form}>
								<form
									className="grid gap-4 py-4"
									onSubmit={form.handleSubmit(onSubmit)}
								>
									<FormField
										control={form.control}
										name="firstName"
										render={({ field }) => (
											<FormItem className="flex flex-col items-center gap-1 w-full">
												<div className="grid items-center grid-cols-4 gap-4 w-full">
													<FormLabel
														htmlFor="first-name"
														className="text-right"
													>
														First name
													</FormLabel>
													<FormControl>
														<Input
															id="first-name"
															placeholder="Max"
															{...field}
															className="col-span-3"
														/>
													</FormControl>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="lastName"
										render={({ field }) => (
											<FormItem className="flex flex-col items-center gap-1 w-full">
												<div className="grid items-center grid-cols-4 gap-4 w-full">
													<FormLabel htmlFor="last-name" className="text-right">
														Last name
													</FormLabel>
													<FormControl>
														<Input
															id="last-name"
															placeholder="Powers"
															{...field}
															className="col-span-3"
														/>
													</FormControl>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="bio"
										render={({ field }) => (
											<FormItem className="flex flex-col items-center gap-1 w-full">
												<div className="grid items-center grid-cols-4 gap-4 w-full">
													<FormLabel htmlFor="bio" className="text-right">
														Bio
													</FormLabel>
													<FormControl>
														<Textarea
															id="bio"
															{...field}
															className="col-span-3"
														/>
													</FormControl>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="avatarPhoto"
										render={({ field }) => (
											<FormItem className="flex flex-col items-center gap-1 w-full">
												<div className="grid items-center grid-cols-4 gap-4 w-full">
													<FormLabel htmlFor="avatar" className="text-right">
														Avatar
													</FormLabel>
													<FormControl>
														<Input
															id="avatar"
															onChange={(e) => {
																field.onChange(e.target.files?.[0]);
															}}
															type="file"
															className="col-span-3"
															accept="image/*"
														/>
													</FormControl>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
									{/* <Label htmlFor="name" className="text-right">
									Name
								</Label>
								<Input
									id="name"
									className="col-span-3"
									onChange={handleAddAuthorChange}
								/> */}
									<DialogFooter>
										<Button type="submit">
											{loading ? (
												<Spinner className="text-white" />
											) : (
												"Add Author"
											)}
										</Button>
										<Button
											variant="outline"
											onClick={() => setShowAddAuthorModal(false)}
										>
											Cancel
										</Button>
									</DialogFooter>
								</form>
							</Form>
						</div>
					</div>
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
