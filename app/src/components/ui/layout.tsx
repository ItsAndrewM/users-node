import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [signedIn, setSignedIn] = useState(false);
	return (
		<nav className="bg-blue-500 text-white p-4 w-full flex justify-center items-center">
			<ul className="w-full flex justify-between items-center">
				<li>
					<Link to="/sign-out">Sign-out</Link>
				</li>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					{signedIn ? (
						<Link to="/sign-in">Sign-in</Link>
					) : (
						<Link to="/sign-up">Sign-up</Link>
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
			<main className="w-full mx-auto flex flex-col max-w-3xl ">
				{children}
			</main>
		</>
	);
};

export default Layout;
