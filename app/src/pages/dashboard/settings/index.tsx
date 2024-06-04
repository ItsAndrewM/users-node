const Page = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full">
			<h1 className="text-4xl font-bold">Dashboard</h1>
			<div className="w-full h-full flex flex-col items-center justify-center">
				<p className="text-2xl">
					Welcome to your dashboard. You can use this area to manage your data.
				</p>
				<h2 className="text-2xl font-bold">
					Sign out to go back to the homepage
				</h2>
			</div>
		</div>
	);
};

export default Page;
