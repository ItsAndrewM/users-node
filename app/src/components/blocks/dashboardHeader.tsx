import { Link } from "react-router-dom";
import { DeleteIcon } from "../ui/icons/deleteIcon";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SearchIcon } from "../ui/icons/searchIcon";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const DashboardHeader = () => {
	return (
		<header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
			<Link to="#" className="lg:hidden">
				<DeleteIcon className="h-6 w-6" />
				<span className="sr-only">Blog Dashboard</span>
			</Link>
			<div className="flex-1">
				<h1 className="font-semibold text-lg">Blog Dashboard</h1>
			</div>
			<div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<form className="ml-auto flex-1 sm:flex-initial">
					<div className="relative">
						<SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
						<Input
							type="search"
							placeholder="Search posts..."
							className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
						/>
					</div>
				</form>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="rounded-full">
							<img
								src="/placeholder.svg"
								width="32"
								height="32"
								className="rounded-full"
								alt="Avatar"
							/>
							<span className="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Support</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};

export default DashboardHeader;
