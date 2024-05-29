export const checkAuth = async () => {
	try {
		const response = await fetch("http://localhost:8080/api/user/me", {
			method: "GET",
			credentials: "include",
		});
		const data = await response.json();
		console.log(data);
		if (data.success) {
			return data;
		}
		return null;
	} catch (error) {
		console.error("Error checking auth:", error);
		return null;
	}
};
