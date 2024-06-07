import { useAuth } from "../lib/hooks/useAuth";
import TagAdder from "@/components/blocks/tagAdder";

const HomePage = () => {
	const { isAuthenticated } = useAuth();
	console.log(isAuthenticated);
	return (
		<div className="p-10 ">
			<h1>Hello World</h1>
			<div className="w-full h-full flex flex-col items-center justify-center">
				<TagAdder />
			</div>
		</div>
	);
};

export default HomePage;
