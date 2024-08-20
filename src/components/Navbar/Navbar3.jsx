import React, { useEffect, useState, useContext } from "react";
import { Navbar, Container, Nav, NavDropdown, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus, FaUser } from "react-icons/fa";
import { StoreContext } from "../../context/StoreContext";
import Panier from "../../pages/Panier/Panier";
import CartIconWithCount from "./CartIconWithCount.jsx";
import { FaBars } from "react-icons/fa";

function NavigationBar() {
	const [isPanierOpen, setIsPanierOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const { cartItems, currentUser, logout, isAuthenticated } =
		useContext(StoreContext);

	const navigate = useNavigate();

	const totalItems = cartItems
		? Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0)
		: 0;

	const togglePanier = () => {
		setIsPanierOpen(!isPanierOpen);
	};

	const handleProfileClick = () => {
		navigate("/profil"); // Naviguer vers la page de profil
		setIsUserMenuOpen(false); // Fermer le menu après avoir cliqué sur le profil
	};

	const handleLogout = async () => {
		await logout();
	};

	useEffect(
		() => {
			const handleScroll = () => {
				const navbar = document.querySelector(".navbar");
				if (window.scrollY > 50) {
					navbar.classList.add(
						"",
						"navbar-sticky",
						"shadow-sm",
						"navbar-transparent"
					);
				} else {
					navbar.classList.remove(
						"",
						"navbar-sticky",
						"shadow-sm",
						"navbar-transparent"
					);
				}
			};

			window.addEventListener("scroll", handleScroll);

			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
		},
		[navigate],
		currentUser,
		isAuthenticated
	);

	return (
		<Navbar
			className="custom-navbar pt-3 pb-3 navbar-expand-lg fixed-top navbar-light"
			expand="md"
		>
			<Container>
				<Navbar.Brand as={Link} to="/">
					<img
						src="/images/logo.png"
						alt="Thurquoise Logo"
						className="d-inline-block align-top"
						width="70"
					/>
					{/*<span className="brand-name">Thurquoise</span>*/}
				</Navbar.Brand>
				{/* <Navbar.Toggle aria-controls="custom-basic-navbar-nav basic-navbar-nav"  /> */}
				<Navbar.Toggle aria-controls="basic-navbar-nav">
					<FaBars size={24} className="text-primary" />
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
						{/*<Nav.Link as={Link} to="/cart" className="custom-nav-link custom-nav-link-cart" onClick={togglePanier}>*/}
						{/*    <div className="flex items-center">*/}
						{/*    /!*    <CartIconWithCount size={28} itemCount={totalItems}/>*!/*/}
						{/*    <Badge pill bg="danger">*/}
						{/*    <FaCartPlus size={20} />*/}
						{/*    {totalItems}*/}
						{/*    </Badge>*/}
						{/*    </div>*/}
						{/*</Nav.Link>*/}

						<Nav.Link
							as={Link}
							to="#menu-item"
							className="custom-nav-link-cart custom-nav-link "
							onClick={togglePanier}
						>
							<div className="custom-nav-link-cart">
								{/* Icône du panier avec le nombre d'articles */}
								<div>
									<FaCartPlus size={30} className="text-dark" />
								</div>
								<div>
									<Badge pill bg="success" className="ml-2">
										{totalItems > 0 && totalItems}
									</Badge>
								</div>
							</div>
						</Nav.Link>

						{currentUser ? (
							<NavDropdown
								title={<FaUser size={28} />}
								id="basic-nav-dropdown"
								className="custom-nav-link "
							>
								{/*show username*/}
								<NavDropdown.Item
									className="text-uppercase
                                text-gray-800
                                "
								>
									{currentUser.firstName + " " + currentUser.lastName}
								</NavDropdown.Item>
								{/*bar */}
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
