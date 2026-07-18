import react from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../../store/useStore";

const PrivateRoute = ({ children }) => {
	const { currentUser } = useStore();

	return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
