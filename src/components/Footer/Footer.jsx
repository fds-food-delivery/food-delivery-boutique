import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
	return (
		<footer className="bg-dark text-light py-4">
			<Container>
				<Row>
					<Col md={4}>
						<h5>À propos de nous</h5>
						<p>
							Nous sommes une entreprise dédiée à offrir le meilleur service
							possible à nos clients. Contactez-nous pour plus d'informations.
						</p>
					</Col>
					<Col md={4}>
						<h5>Liens Utiles</h5>
						<ul className="list-unstyled">
							<li><a href="#" className="text-light">Accueil</a></li>
							<li><a href="#" className="text-light">Services</a></li>
							<li><a href="#" className="text-light">Contact</a></li>
						</ul>
					</Col>
					<Col md={4}>
						<h5>Contactez-nous</h5>
						<p>
							Email: contact@exemple.com <br />
							Téléphone: +221 33 123 45 67 <br />
							Adresse: Dakar, Sénégal
						</p>
					</Col>
				</Row>
				<Row className="mt-3">
					<Col className="text-center">
						<p>© 2024 Tous droits réservés.</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
