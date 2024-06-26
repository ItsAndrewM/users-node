import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoveHorizontalIcon } from "@/components/ui/icons/moveHorizontalIcon";
import { Textarea } from "../ui/textarea";
import DashboardLayout from "./dashboardLayout";
import DashboardHeader from "./dashboardHeader";
import { useState } from "react";
import PostModal from "./postModal";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { useReactForm } from "@/lib/hooks/useReactForm";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Link } from "react-router-dom";
import useFetchAuthors from "@/lib/hooks/useFetchAllAuthors";
import { Skeleton } from "../ui/skeleton";
import { Author } from "@/types";

const BlogDashboard = () => {
	const [showNewPostModal, setShowNewPostModal] = useState<boolean>(false);
	const form = useReactForm();
	const { authors, loading, error } = useFetchAuthors();
	return (
		<>
			<DashboardLayout>
				<DashboardHeader setShowNewPostModal={setShowNewPostModal} />
				<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
					<div className="border shadow-sm rounded-lg p-2">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Title</TableHead>
									<TableHead className="hidden md:table-cell">Author</TableHead>
									<TableHead className="hidden md:table-cell">
										Published
									</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell className="font-medium">
										The Future of Web Development
									</TableCell>
									<TableCell className="hidden md:table-cell">
										John Doe
									</TableCell>
									<TableCell className="hidden md:table-cell">
										May 1, 2023
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
												<DropdownMenuItem>View Post</DropdownMenuItem>
												<DropdownMenuItem>Edit Post</DropdownMenuItem>
												<DropdownMenuItem>Delete Post</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										Mastering React Hooks
									</TableCell>
									<TableCell className="hidden md:table-cell">
										Jane Smith
									</TableCell>
									<TableCell className="hidden md:table-cell">
										April 15, 2023
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
												<DropdownMenuItem>View Post</DropdownMenuItem>
												<DropdownMenuItem>Edit Post</DropdownMenuItem>
												<DropdownMenuItem>Delete Post</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										Exploring Serverless Architecture
									</TableCell>
									<TableCell className="hidden md:table-cell">
										Michael Johnson
									</TableCell>
									<TableCell className="hidden md:table-cell">
										March 25, 2023
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
												<DropdownMenuItem>View Post</DropdownMenuItem>
												<DropdownMenuItem>Edit Post</DropdownMenuItem>
												<DropdownMenuItem>Delete Post</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										Building a Scalable API with GraphQL
									</TableCell>
									<TableCell className="hidden md:table-cell">
										Sarah Lee
									</TableCell>
									<TableCell className="hidden md:table-cell">
										February 10, 2023
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
												<DropdownMenuItem>View Post</DropdownMenuItem>
												<DropdownMenuItem>Edit Post</DropdownMenuItem>
												<DropdownMenuItem>Delete Post</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
					<div className="border shadow-sm rounded-lg p-2">
						<Card>
							<CardHeader>
								<CardTitle>Create New Post</CardTitle>
								<CardDescription>
									Fill out the form to create a new blog post.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<Form {...form}>
									<form>
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
											<Textarea
												id="content"
												placeholder="Enter post content"
												rows={5}
											/>
										</div>
										<div className="space-y-2">
											<FormField
												control={form.control}
												name="author"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Author</FormLabel>
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="Select an author to display" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{loading ? (
																	<SelectItem value="loading">
																		<Skeleton className="h-4 w-[100px]" />
																	</SelectItem>
																) : (
																	authors.map((author: Author) => (
																		<SelectItem
																			key={author.id}
																			value={author.id.toString()}
																			className="capitalize"
																		>
																			{`${author.first_name} ${author.last_name}`}
																		</SelectItem>
																	))
																)}
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="publish-date">Publish Date</Label>
											<Input
												id="publish-date"
												type="date"
												placeholder="Select publish date"
											/>
										</div>
									</form>
								</Form>
							</CardContent>
							<CardFooter>
								<Button>Create Post</Button>
							</CardFooter>
						</Card>
					</div>
				</main>
			</DashboardLayout>
			<PostModal
				showNewPostModal={showNewPostModal}
				setShowNewPostModal={setShowNewPostModal}
			/>
		</>
	);
};

export default BlogDashboard;
