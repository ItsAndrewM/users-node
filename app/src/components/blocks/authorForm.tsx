import { Spinner } from "../ui/spinner";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "../ui/dialog";
import { AuthorFormValues, FormHook } from "@/types/api";

interface AuthorFormProps {
	onSubmit: (data: AuthorFormValues) => Promise<void>;
	formHook: FormHook;
	setCloseModal: (value: boolean) => void;
	loading: boolean;
	buttonText: string;
}

export function AuthorForm({
	onSubmit,
	formHook,
	setCloseModal,
	loading,
	buttonText,
}: AuthorFormProps) {
	return (
		<div className="grid gap-4 py-4">
			<Form {...formHook}>
				<form
					className="grid gap-4 py-4"
					onSubmit={formHook.handleSubmit(onSubmit)}
				>
					<FormField
						control={formHook.control}
						name="firstName"
						render={({ field }) => (
							<FormItem className="flex flex-col items-center gap-1 w-full">
								<div className="grid items-center grid-cols-4 gap-4 w-full">
									<FormLabel htmlFor="first-name" className="text-right">
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
						control={formHook.control}
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
						control={formHook.control}
						name="bio"
						render={({ field }) => (
							<FormItem className="flex flex-col items-center gap-1 w-full">
								<div className="grid items-center grid-cols-4 gap-4 w-full">
									<FormLabel htmlFor="bio" className="text-right">
										Bio
									</FormLabel>
									<FormControl>
										<Textarea id="bio" {...field} className="col-span-3" />
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={formHook.control}
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
							{loading ? <Spinner className="text-white" /> : buttonText}
						</Button>
						<Button variant="outline" onClick={() => setCloseModal(false)}>
							Cancel
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</div>
	);
}
