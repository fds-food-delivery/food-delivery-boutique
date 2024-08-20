import React, { useContext, useEffect, useState } from "react";
import "./UserProfile.css";
import { StoreContext } from "../../context/StoreContext";

const UserProfile = () => {
	const [isEditing, setIsEditing] = useState(false);
	const { getCurrentUser, currentUser } = useContext(StoreContext);
	const [userInfo, setUserInfo] = useState({
		name: "Tahir Fall",
		email: "tahirfall@gmail.com",
		phone: "+221 77 777 77 77",
		address: "Grand dakar",
	});
	useEffect(() => {
		const fetchUSerInfo = async () => {
			// Fetch user info from the server
			await getCurrentUser();
			setUserInfo({
				// name: currentUser.name,
				email: currentUser.email,
				phone: currentUser.phone,
				// address: currentUser.address,
			});
		};
		fetchUSerInfo();
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
		<div className="container mt-5 pt-5">
			<div className="row mt-5 mb-4">
				<div className="col-6 col-md-3">
					<button
						className="btn btn-primary"
						onClick={handleEditClick}
						disabled
					>
						Profil Utilisateur
					</button>
				</div>
				<div className="col-6">
					<button className="btn btn-primary" onClick={handleEditClick}>
						{isEditing ? "Save" : "Edit"}
					</button>
				</div>
			</div>

			<table className="table table-bordered table-striped">
				<tbody>
					<tr>
						<th>Name</th>
						<td>
							<input
								type="text"
								name="name"
								value={userInfo.name}
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
						<th>Phone</th>
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
						<th>Address</th>
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
			<div className="row mb-5">
				<div className="col-3 mx-auto">
					{isEditing && (
						<button className="btn btn-primary" onClick={handleEditClick}>
							Save
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
