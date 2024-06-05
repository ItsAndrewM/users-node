import { Link, NavLink } from "react-router-dom";
import { DeleteIcon } from "../ui/icons/deleteIcon";
import { HomeIcon } from "../ui/icons/homeIcon";
import { UsersIcon } from "../ui/icons/usersIcon";
import { SettingsIcon } from "../ui/icons/settingsIcon";

const DashboardAside = () => {
	return (
		<div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
			<div className="flex flex-col gap-2">
				<div className="flex h-[60px] items-center px-6">
					<Link to="#" className="flex items-center gap-2 font-semibold">
						<DeleteIcon className="h-6 w-6" />
						<span className="">Blog Dashboard</span>
					</Link>
				</div>
				<div className="flex-1">
					<nav className="grid items-start px-4 text-sm font-medium">
						<NavLink
							to="/dashboard"
							className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
							end
						>
							<HomeIcon className="h-4 w-4" />
							Dashboard
						</NavLink>
						<NavLink
							to="/dashboard/posts"
							className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
						>
							<DeleteIcon className="h-4 w-4" />
							Posts
						</NavLink>
						<NavLink
							to="/dashboard/authors"
							className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
						>
							<UsersIcon className="h-4 w-4" />
							Authors
						</NavLink>

						<NavLink
							to="/dashboard/settings"
							className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
						>
							<SettingsIcon className="h-4 w-4" />
							Settings
						</NavLink>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default DashboardAside;
