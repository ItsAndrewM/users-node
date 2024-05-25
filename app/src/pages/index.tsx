import { useAuth } from "../lib/hooks/useAuth";

const HomePage = () => {
	const { isAuthenticated } = useAuth();
	console.log(isAuthenticated);
	return (
		<div className="p-10 ">
			<h1>Hello World</h1>
		</div>
	);
};

export default HomePage;
