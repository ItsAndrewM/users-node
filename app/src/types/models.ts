export interface Category {
	id: number;
	name: string;
	slug: string;
	description?: string;
}

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	role: "admin" | "editor" | "user";
}
