import { useState, useEffect } from "react";

const useFetchAuthors = () => {
	const [authors, setAuthors] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAuthors = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					"http://localhost:8080/api/authors/authors",
					{
						method: "GET",
						cache: "no-cache",
						credentials: "include",
					}
				);

				const data = await response.json();
				if (!data.success) {
					throw new Error(data.error);
				}
				setAuthors(data.authors);
			} catch (e: unknown) {
				setError(e.message);
			} finally {
				setLoading(false);
			}
		};

		fetchAuthors();
	}, []);

	return { authors, loading, error };
};

export default useFetchAuthors;
