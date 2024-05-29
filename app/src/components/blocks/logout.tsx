import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import Container from "../../components/ui/container";
import { useAuth } from "../../lib/hooks/useAuth";
import { toast } from "../../lib/hooks/use-toast";

const Logout = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const handleLogout = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		try {
			const res = await fetch("http://localhost:8080/api/user/logout", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (data.success) {
				toast({
					title: "Success!",
					description: "You have been logged out.",
				});
				navigate("/");
			}
			console.log(data);
		} catch (e) {
			console.log(e);
		} finally {
			logout();
		}
	};

	return (
		<Container>
			<h1>Signout</h1>
			<Button onClick={handleLogout}>Logout</Button>
		</Container>
	);
};

export default Logout;
