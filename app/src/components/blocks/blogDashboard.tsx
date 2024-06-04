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
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoveHorizontalIcon } from "@/components/ui/icons/moveHorizontalIcon";
import { SearchIcon } from "@/components/ui/icons/searchIcon";
import { DeleteIcon } from "@/components/ui/icons/deleteIcon";
import { Link } from "react-router-dom";
import { Textarea } from "../ui/textarea";
import DashboardLayout from "./dashboardLayout";
import DashboardHeader from "./dashboardHeader";

const BlogDashboard = () => {
	return (
		<DashboardLayout>
			<div className="border shadow-sm rounded-lg p-2">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead className="hidden md:table-cell">Author</TableHead>
							<TableHead className="hidden md:table-cell">Published</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">
								The Future of Web Development
							</TableCell>
							<TableCell className="hidden md:table-cell">John Doe</TableCell>
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
							<TableCell className="hidden md:table-cell">Jane Smith</TableCell>
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
							<TableCell className="hidden md:table-cell">Sarah Lee</TableCell>
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
					</CardContent>
					<CardFooter>
						<Button>Create Post</Button>
					</CardFooter>
				</Card>
			</div>
		</DashboardLayout>
	);
};

export default BlogDashboard;
