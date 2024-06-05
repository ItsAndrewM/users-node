import { SetStateAction, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationNext,
} from "@/components/ui/pagination";
import DashboardLayout from "./dashboardLayout";
import { MoveHorizontalIcon } from "../ui/icons/moveHorizontalIcon";
import DashboardHeader from "./dashboardHeader";
import PostModal from "./postModal";

export default function PostsDashboard() {
	const [showNewPostModal, setShowNewPostModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = [
		{
			title: "The Future of Web Development",
			author: "John Doe",
			published: "May 1, 2023",
		},
		{
			title: "Mastering React Hooks",
			author: "Jane Smith",
			published: "April 15, 2023",
		},
		{
			title: "Exploring Serverless Architecture",
			author: "Michael Johnson",
			published: "March 25, 2023",
		},
		{
			title: "Building a Scalable API with GraphQL",
			author: "Sarah Lee",
			published: "February 10, 2023",
		},
		{
			title: "Optimizing Website Performance",
			author: "David Wilson",
			published: "January 20, 2023",
		},
		{
			title: "Designing Accessible Web Applications",
			author: "Emily Davis",
			published: "December 15, 2022",
		},
		{
			title: "Embracing the Power of TypeScript",
			author: "Michael Thompson",
			published: "November 10, 2022",
		},
		{
			title: "Securing Your Web Applications",
			author: "Jessica Wilson",
			published: "October 5, 2022",
		},
		{
			title: "Introduction to Web Components",
			author: "Andrew Johnson",
			published: "September 20, 2022",
		},
		{
			title: "Unleashing the Power of React Native",
			author: "Emily Thompson",
			published: "August 15, 2022",
		},
	].slice(indexOfFirstPost, indexOfLastPost);
	const paginate = (pageNumber: SetStateAction<number>) =>
		setCurrentPage(pageNumber);
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
								{currentPosts.map((post, index) => (
									<TableRow key={index}>
										<TableCell className="font-medium">{post.title}</TableCell>
										<TableCell className="hidden md:table-cell">
											{post.author}
										</TableCell>
										<TableCell className="hidden md:table-cell">
											{post.published}
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
								))}
							</TableBody>
						</Table>
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
										href="#"
										onClick={() =>
											paginate(currentPage > 1 ? currentPage - 1 : currentPage)
										}
									/>
								</PaginationItem>
								{[
									...Array(Math.ceil([...currentPosts].length / postsPerPage)),
								].map((_, index) => (
									<PaginationItem key={index}>
										<PaginationLink
											href="#"
											isActive={currentPage === index + 1}
											onClick={() => paginate(index + 1)}
										>
											{index + 1}
										</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem>
									<PaginationNext
										href="#"
										onClick={() =>
											paginate(
												currentPage <
													Math.ceil([...currentPosts].length / postsPerPage)
													? currentPage + 1
													: currentPage
											)
										}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				</main>
			</DashboardLayout>
			<PostModal
				showNewPostModal={showNewPostModal}
				setShowNewPostModal={setShowNewPostModal}
			/>
		</>
	);
}
