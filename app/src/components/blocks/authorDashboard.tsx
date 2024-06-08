import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

import AuthorHeader from "./authorHeader";
import DashboardLayout from "./dashboardLayout";
import { toast } from "@/lib/hooks/use-toast";
import { Spinner } from "../ui/spinner";
import {
	Form,
	FormControl,
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
import AuthorTable from "./authorTable";
import { Author } from "@/types/api";
import { useReactForm } from "@/lib/hooks/useReactForm";
import { AuthorForm } from "./authorForm";

export default function AuthorDashboard() {
	const [showAuthorModal, setShowAuthorModal] = useState(false);
	const [selectedAuthor, setSelectedAuthor] = useState<Author>(null);
	const [showAddAuthorModal, setShowAddAuthorModal] = useState(false);
	const [editAuthorModal, setEditAuthorModal] = useState(false);
	const [editAuthor, setEditAuthor] = useState<Author>(null);
	const [deleteAuthorModal, setDeleteAuthorModal] = useState(false);
	const [deleteAuthor, setDeleteAuthor] = useState<Author>(null);
	const [loading, setLoading] = useState(false);
	const form = useReactForm();

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

	async function onSubmit(data: z.infer<typeof addAuthorFormSchema>) {
		setLoading(true);
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
					<AuthorTable
						setDeleteAuthor={setDeleteAuthor}
						setEditAuthor={setEditAuthor}
						setSelectedAuthor={setSelectedAuthor}
						setShowAuthorModal={setShowAuthorModal}
						setEditAuthorModal={setEditAuthorModal}
						setDeleteAuthorModal={setDeleteAuthorModal}
					/>
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
								<img
									src={
										!selectedAuthor.avatar_url
											? "/placeholder.svg"
											: selectedAuthor.avatar_url
									}
									alt={selectedAuthor.first_name}
								/>
								<AvatarFallback>
									{selectedAuthor.first_name.charAt(0)}
								</AvatarFallback>
							</Avatar>
							<div className="grid gap-1">
								<h3 className="text-lg font-semibold">{`${selectedAuthor.first_name} ${selectedAuthor.last_name}`}</h3>
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
						<AuthorForm
							onSubmit={onSubmit}
							formHook={form}
							setCloseModal={setShowAddAuthorModal}
							loading={loading}
						/>
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
					<AuthorForm
						onSubmit={onSubmit}
						formHook={form}
						setCloseModal={setEditAuthorModal}
						loading={loading}
						selectedAuthor={selectedAuthor}
					/>
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
