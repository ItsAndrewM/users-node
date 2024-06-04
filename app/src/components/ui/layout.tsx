import { Link } from "react-router-dom";
import { useAuth } from "../../lib/hooks/useAuth";

const Navbar = () => {
	const { isAuthenticated } = useAuth();
	return (
		<nav className="bg-blue-500 text-white p-4 w-full flex justify-center items-center">
			<ul className="w-full flex justify-between items-center">
				<li>
					<Link to="/">Home</Link>
				</li>
				{isAuthenticated ? null : (
					<li>
						<Link to="/sign-up">Sign-up</Link>
					</li>
				)}

				<li>
					{isAuthenticated ? (
						<Link to="/dashboard">Profile</Link>
					) : (
						<Link to="/sign-in">Sign-in</Link>
					)}
				</li>
			</ul>
		</nav>
	);
};

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar />
			<main className="w-full mx-auto flex flex-col max-w-screen ">
				{children}
			</main>
		</>
	);
};

export default Layout;
