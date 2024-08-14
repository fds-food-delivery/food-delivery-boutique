import  react, { useContext } from "react";
import { Navigate } from "react-router-dom";
import {StoreContext} from "../../context/StoreContext.jsx";

const PrivateRoute = ({ children }) => {
	const { currentUser } = useContext(StoreContext);

	return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
