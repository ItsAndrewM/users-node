import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../lib/hooks/useAuth";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to="/sign-in" state={{ from: location }} replace />;
	}

	return children;
};

export default PrivateRoute;
