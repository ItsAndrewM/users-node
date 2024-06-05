import TextEditor from "@/components/blocks/textEditor";
import { useAuth } from "../lib/hooks/useAuth";
import CreatePost from "@/components/blocks/createPost";

const HomePage = () => {
	const { isAuthenticated } = useAuth();
	console.log(isAuthenticated);
	return (
		<div className="p-10 ">
			<h1>Hello World</h1>
			<div className="w-full h-full flex flex-col items-center justify-center">
				<CreatePost />
			</div>
		</div>
	);
};

export default HomePage;
