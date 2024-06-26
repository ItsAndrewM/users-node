export const objectToFormData = (data: unknown) => {
	const formData = new FormData();
	for (const key in data) {
		formData.append(key, data[key]);
	}
	return formData;
};

export const createAuthor = async (data: unknown) => {
	if (!data) {
		return {
			success: false,
			error: "Invalid request",
		};
	}

	try {
		const formData = objectToFormData(data);
		const response = await fetch(
			"http://localhost:8080/api/authors/author/new",
			{
				method: "POST",
				credentials: "include",
				body: formData,
			}
		);
		const result = await response.json();
		console.log(result);
		if (!result.success) {
			throw new Error(result.error);
		}
		return result;
	} catch (error) {
		console.error("Error creating author:", error);
		return error;
	}
};

export const updateAuthor = async (data: unknown) => {
	if (!data) {
		return {
			success: false,
			error: "Invalid request",
		};
	}

	try {
		const formData = objectToFormData(data);
		const response = await fetch(
			`http://localhost:8080/api/authors/author/${data.id}`,
			{
				method: "PUT",
				credentials: "include",
				body: formData,
			}
		);
		const result = await response.json();
		console.log(result);
		if (!result.success) {
			throw new Error(result.error);
		}
		return result;
	} catch (error) {
		console.error("Error updating author:", error);
		return error;
	}
};

export const deleteSelectedAuthor = async (id: number) => {
	try {
		const response = await fetch(
			`http://localhost:8080/api/authors/author/${id}`,
			{
				method: "DELETE",
				credentials: "include",
			}
		);
		const result = await response.json();
		console.log(result);
		if (!result.success) {
			throw new Error(result.error);
		}
		return result;
	} catch (error) {
		console.error("Error deleting author:", error);
		return error;
	}
};
