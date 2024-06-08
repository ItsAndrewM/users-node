export interface Author {
	first_name: string;
	last_name: string;
	bio: string;
	avatar_url: string;
	created_at: string;
	updated_at: string;
}

export interface Post {
	id: number;
	title: string;
	content: string;
	authorId: number;
	coverPhotoUrl: string;
	createdAt: string;
	updatedAt: string;
}
