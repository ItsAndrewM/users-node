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
import { MoveHorizontalIcon } from "../ui/icons/moveHorizontalIcon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import SkeletonTable from "./skeletonTable";
import useFetchAuthors from "@/lib/hooks/useFetchAllAuthors";
import { Author } from "@/types/api";

export default function AuthorTable({
	setDeleteAuthor,
	setEditAuthor,
	setSelectedAuthor,
	setShowAuthorModal,
	setEditAuthorModal,
	setDeleteAuthorModal,
}: {
	setDeleteAuthor: (deleteAuthor: Author) => void;
	setEditAuthor: (editAuthor: Author) => void;
	setSelectedAuthor: (selectedAuthor: Author) => void;
	setShowAuthorModal: (showAuthorModal: boolean) => void;
	setEditAuthorModal: (editAuthorModal: boolean) => void;
	setDeleteAuthorModal: (deleteAuthorModal: boolean) => void;
}) {
	// const [authors, setAuthors] = useState<AuthorTableProps[]>([]);
	const { authors, loading, error } = useFetchAuthors();
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

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="border shadow-sm rounded-lg p-2">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>First Name</TableHead>
						<TableHead>Last Name</TableHead>
						<TableHead className="hidden md:table-cell">Bio</TableHead>
						<TableHead>Created At</TableHead>
						<TableHead>Updated At</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{loading ? (
						<SkeletonTable />
					) : (
						authors.map((author: Author) => (
							<TableRow key={author.id}>
								<TableCell className="flex items-center gap-2">
									<Avatar className="w-8 h-8">
										<img
											src={
												!author.avatar_url
													? "/placeholder.svg"
													: author.avatar_url
											}
											alt={author.first_name}
										/>
										<AvatarFallback>
											{author.first_name.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<span className="font-medium">{author.first_name}</span>
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{author.last_name}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{author.bio}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{new Date(author.created_at).toLocaleDateString()}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{new Date(author.updated_at).toLocaleDateString()}
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
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
