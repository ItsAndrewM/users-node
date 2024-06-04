import { useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const useReactForm = <T extends z.ZodType>(
	schema: T,
	options?: UseFormProps<z.infer<T>>
): UseFormReturn<z.infer<T>> => {
	return useForm<z.infer<T>>({
		resolver: zodResolver(schema),
		...options,
	});
};
