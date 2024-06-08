import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addAuthorFormSchema } from "@/schemas/userSchema";

export const useReactForm = () => {
	return useForm<z.infer<typeof addAuthorFormSchema>>({
		resolver: zodResolver(addAuthorFormSchema),
	});
};
