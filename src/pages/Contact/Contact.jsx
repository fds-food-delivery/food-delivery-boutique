import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Logique pour gérer la soumission du formulaire, comme l'envoi des données à une API
		console.log("Form Data Submitted:", formData);
		// Réinitialiser le formulaire
		setFormData({
			name: "",
			email: "",
			message: "",
		});
	};

	return (
		<div className="contact-container">
			<h2>Contactez-nous</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Nom</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="form-control"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Telephone</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="form-control"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="message">Message</label>
					<textarea
						id="message"
						name="message"
						value={formData.message}
						onChange={handleChange}
						className="form-control"
						rows="5"
						required></textarea>
				</div>
				<button type="submit" className="btn">
					Envoyer
				</button>
			</form>
		</div>
	);
};

export default Contact;
