import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});
		return () => unsubscribe();
	}, []);

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error("Erreur lors de la déconnexion", error);
		}
	};

	return (
		<AuthContext.Provider value={{ currentUser, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
