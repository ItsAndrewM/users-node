// src/context/AuthContext.tsx
import { createContext, useState, ReactNode, useEffect } from "react";
import { checkAuth } from "../utils/checkAuth";

interface AuthContextType {
	isAuthenticated: boolean;
	login: () => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	const login = () => setIsAuthenticated(true);
	const logout = () => setIsAuthenticated(false);

	useEffect(() => {
		const verifyAuth = async () => {
			const user = await checkAuth();
			if (user) {
				// User is already authenticated, redirect to dashboard
				setIsAuthenticated(true);
			}
		};
		verifyAuth();
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
