import React, { useState, useContext, useEffect, useRef } from "react";
import { Navbar, Container, Nav, NavDropdown, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { StoreContext } from "../../context/StoreContext";
import Panier from "../../pages/Panier/Panier";
import "./NavigationBar.css"; // Assurez-vous de créer ce fichier CSS

function NavigationBar() {
	const [isPanierOpen, setIsPanierOpen] = useState(false);
	const { cartItems, currentUser, logout, isAuthenticated } =
		useContext(StoreContext);

	const navigate = useNavigate();
	const menuRef = useRef(null);

	const [expanded, setExpanded] = useState(false);

	const totalItems = cartItems
		? Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0)
		: 0;

	const togglePanier = () => {
		setIsPanierOpen(!isPanierOpen);
	};

	const handleProfileClick = () => {
		navigate("/profil"); // Naviguer vers la page de profil
	};

	const handleLogout = async () => {
		await logout();
	};

	const handleClickOutside = (event) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setExpanded(false);
		}
	};

	const handleScroll = () => {
		setExpanded(false);
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		window.addEventListener("scroll", handleScroll);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);

			window.removeEventListener("scroll", handleScroll);

		};
	}, []);

	return (
		<Navbar
			ref={menuRef}
			className="custom-navbar pt-3 pb-3 navbar-expand-lg fixed-top navbar-light"
			expand="md"
			expanded={expanded}
			onToggle={() => setExpanded(!expanded)}
		>
			<Container>
				<Navbar.Brand as={Link} to="/">
					<img
						src="/images/logo.png"
						alt="Thurquoise Logo"
						className="d-inline-block align-top"
						width="70"
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav custom-navbar-nav"style={{backgroundColor: "white"}}>
					{expanded ? (
						<FaTimes size={24} style={{ color: "#f86c6b" }} />
					) : (
						<FaBars size={24} style={{ color: "#f86c6b"}} />
					)}
				</Navbar.Toggle>

				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={Link} to="/" className="custom-nav-link">
							Accueil
						</Nav.Link>
						<Nav.Link as={Link} to="#menu" className="custom-nav-link">
							Menu
						</Nav.Link>
						<Nav.Link as={Link} to="/livraison" className="custom-nav-link">
							Livraison
						</Nav.Link>
						<Nav.Link as={Link} to="/contact" className="custom-nav-link">
							Contact
						</Nav.Link>
						<Nav.Link
							as={Link}
							to="#menu-item"
							className="custom-nav-link-cart custom-nav-link"
							onClick={togglePanier}
						>
							<div className="custom-nav-link-cart">
								<FaCartPlus size={30} className="text-dark" />
								<Badge pill bg="success" className="ml-2">
									{totalItems > 0 && totalItems}
								</Badge>
							</div>
						</Nav.Link>

						{currentUser ? (
							<NavDropdown
								title={<FaUser size={28} />}
								id="basic-nav-dropdown"
								className="custom-nav-link"
							>
								<NavDropdown.Item className="text-uppercase text-gray-800">
									{currentUser.firstName + " " + currentUser.lastName}
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item onClick={handleProfileClick}>
									Profil
								</NavDropdown.Item>
								<NavDropdown.Item onClick={handleLogout}>
									Déconnexion
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<Nav.Link
								as={Link}
								to="/login"
								className="custom-nav-link custom-nav-link-btn"
							>
								Login
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
			{isPanierOpen && <Panier onClose={togglePanier} />}
		</Navbar>
	);
}

export default NavigationBar;
