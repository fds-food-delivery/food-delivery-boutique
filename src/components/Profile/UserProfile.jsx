import React, { useState } from 'react';
import './UserProfile.css';

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: '123 Main St, Anytown, USA'
    });

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    return (
        <div className="container mt-5 pt-5">
            <div className="row mt-5 mb-4">
                <div className="col-6 col-md-3">
                    <button className="btn btn-primary" onClick={handleEditClick} disabled>
                        Profil Utilisateur
                    </button>
                </div>
                <div className="col-6">
                    <button className="btn btn-primary" onClick={handleEditClick}>
                        {isEditing ? 'Save' : 'Edit'}
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