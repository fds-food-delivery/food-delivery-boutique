import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserProfile.css";
import { useStore } from "../../store/useStore";

const UserProfile = () => {
	const [isEditing, setIsEditing] = useState(false);
	// NOTE: getCurrentUser n'existait pas dans l'ancien StoreContext — cette
	// page plantait déjà à l'usage (pré-existant, hors périmètre).
	const { getCurrentUser, loading, setLoading, currentUser } = useStore();
	const [userInfo, setUserInfo] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
	});

	useEffect(() => {
		const fetchUserData = async () => {
			setLoading(true);
			try {
				const user = await getCurrentUser();
				if (user) {
					setUserInfo({
						firstName: user.firstName || "",
						lastName: user.lastName || "",
						email: user.email || "",
						phone: user.phone || "",
						address: user.address.street || "",
					});
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, []);

	const handleEditClick = () => {
		setIsEditing(!isEditing);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserInfo({
			...userInfo,
			[name]: value,
		});
	};

	return (
		<div className="profile-container">
			<h2 className="profile-title">Profil Utilisateur</h2>
			<div className="profile-actions">
				<button
					className="btn profile-btn profile-btn-primary"
					onClick={handleEditClick}
				>
					{isEditing ? "Enregistrer" : "Modifier"}
				</button>
			</div>

			<table className="table profile-table">
				<tbody>
				<tr>
					<th>Prenom</th>
					<td>
						<input
							type="text"
							name="name"
							value={userInfo.firstName}
							onChange={handleChange}
							className="form-control"
							disabled={!isEditing}
						/>
					</td>
				</tr>
				<tr>
					<th>Nom</th>
					<td>
						<input
							type="text"
							name="name"
							value={userInfo.lastName}
							onChange={handleChange}
							className="form-control"
							disabled={!isEditing}
						/>
					</td>
				</tr>
				<tr>
					<th>Email</th>
					<td>
						<input
							type="email"
							name="email"
							value={userInfo.email}
							onChange={handleChange}
							className="form-control"
							disabled={!isEditing}
						/>
					</td>
				</tr>
				<tr>
					<th>Téléphone</th>
					<td>
						<input
							type="text"
							name="phone"
							value={userInfo.phone}
							onChange={handleChange}
							className="form-control"
							disabled={!isEditing}
						/>
					</td>
				</tr>
				<tr>
					<th>Adresse</th>
					<td>
						<input
							type="text"
							name="address"
							value={userInfo.address}
							onChange={handleChange}
							className="form-control"
							disabled={!isEditing}
						/>
					</td>
				</tr>
				</tbody>
			</table>

			{isEditing && (
				<div className="profile-save">
					<button className="btn profile-btn profile-btn-save" onClick={handleEditClick}>
						Enregistrer
					</button>
				</div>
			)}
		</div>
	);
};

export default UserProfile;
