import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/ui/layout";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./lib/context/authContext";
import PrivateRoute from "./components/privateRoute";

const pages = import.meta.glob<{
	default: React.ComponentType;
	loader?: () => Promise<unknown>;
	action?: () => Promise<unknown>;
	ErrorBoundary?: React.ComponentType;
}>("./pages/**/*.tsx", { eager: true });

interface RouteConfig {
	path: string;
	Element: React.ComponentType;
	loader?: () => Promise<unknown>;
	action?: () => Promise<unknown>;
	ErrorBoundary?: React.ComponentType;
}

const routes: RouteConfig[] = [];

for (const path of Object.keys(pages)) {
	const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
	if (!fileName) {
		continue;
	}

	const normalizedPathName = fileName.includes("$")
		? fileName.replace("$", ":")
		: fileName.replace(/\[(.*?)\]/g, ":$1").replace(/\/index$/, "");

	const page = pages[path];

	if (!page || !page.default) {
		console.error(`Page not found or does not have a default export: ${path}`);
		continue;
	}

	routes.push({
		path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
		Element: page.default,
		loader: page.loader,
		action: page.action,
		ErrorBoundary: page.ErrorBoundary,
	});
}

console.log("Routes:", routes);
console.log("Pages:", pages);

const router = createBrowserRouter(
	routes.map(({ Element, ErrorBoundary, ...rest }) => ({
		...rest,
		element: (
			<Layout>
				{rest.path === "/dashboard" ? (
					<PrivateRoute>
						<Element />
					</PrivateRoute>
				) : (
					<Element />
				)}
			</Layout>
		),
		...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
	}))
);

function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
			<Toaster />
		</AuthProvider>
	);
}

export default App;
