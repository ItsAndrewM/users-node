const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full max-w-3xl flex flex-col justify-center items-center py-16">
			{children}
		</div>
	);
};

export default Container;
