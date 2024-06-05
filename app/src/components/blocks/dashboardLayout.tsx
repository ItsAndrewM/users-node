import DashboardAside from "./dashboardAside";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
			<DashboardAside />
			<div className="flex flex-col">{children}</div>
		</div>
	);
};

export default DashboardLayout;
