import { TableRow, TableCell } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonTable() {
	return (
		<TableRow>
			<TableCell className="flex items-center gap-2">
				<Avatar className="w-8 h-8">
					<Skeleton className="h-16 w-16 rounded-full" />
				</Avatar>
				<span className="font-medium">
					<Skeleton className="h-4 w-[100px]" />
				</span>
			</TableCell>
			<TableCell className="hidden md:table-cell">
				<Skeleton className="h-4 w-[100px]" />
			</TableCell>
			<TableCell className="hidden md:table-cell">
				<Skeleton className="h-4 w-[250px]" />
			</TableCell>
			<TableCell className="hidden md:table-cell">
				<Skeleton className="h-4 w-[100px]" />
			</TableCell>
			<TableCell className="hidden md:table-cell">
				<Skeleton className="h-4 w-[100px]" />
			</TableCell>
			<TableCell className="flex w-full items-center justify-end">
				<Skeleton className="h-4 w-[30px]" />
			</TableCell>
		</TableRow>
	);
}
