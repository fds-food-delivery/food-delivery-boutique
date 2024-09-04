import React, { useState, useContext, useEffect, useRef } from "react";
import {
	Navbar,
	Container,
	Nav,
	NavDropdown,
	Badge,
	Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {FaCartPlus, FaUser, FaBars, FaTimes, FaBell} from "react-icons/fa";
import { StoreContext } from "../../context/StoreContext";
import Panier from "../../pages/Panier/Panier";
import "./NavigationBar.css";
import NotificationList from "../NotificationList/NotificationList.jsx"; // Assurez-vous de créer ce fichier CSS

function NavigationBar() {

		const [isPanierOpen, setIsPanierOpen] = useState(false);
		const [showNotifications, setShowNotifications] = useState(false); // État pour afficher les notifications
		const { cartItems, userID, logout,
			notifications, setNotifications
			, totalNotifications, setTotalNotifications } = useContext(StoreContext);


		const [notifications1, setNotifications1] = useState([
			{ message: "New order received!", date: "2024-08-24" },
			{ message: "Delivery on the way", date: "2024-08-23" },
		]);// Liste fictive de notifications


		const navigate = useNavigate();
		const menuRef = useRef(null);

		const [expanded, setExpanded] = useState(false);


		const totalItems = cartItems
			? Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0)
			: 0;

		const togglePanier = () => {
			setIsPanierOpen(!isPanierOpen);
		};

		const toggleNotifications = () => {
			setShowNotifications(!showNotifications);
		};

		const handleProfileClick = () => {
			navigate("/profil");
		};

		const handleLogout = async () => {
			await logout();
		};

		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setExpanded(false);
				setShowNotifications(false); // Fermez les notifications si vous cliquez en dehors
				setIsPanierOpen(false); // Fermez le panier si vous cliquez en dehors
			}
		};

		useEffect(() => {
			console.log("Current User: ", userID);
			if (userID) {
				setTotalNotifications(notifications.length);
			}else{
				setTotalNotifications(0);
			}
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [userID, notifications]);

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
							className="d-inline-block align-top logo"
						/>
					</Navbar.Brand>

					{!expanded ? (
						<div className="d-flex align-items-left" style={{ marginLeft: "auto" }}>
							<Nav.Link
								as={Link}
								to="#notifications"
								className="custom-nav-link-cart-2 custom-nav-link"
								onClick={toggleNotifications}
							>
								<div className="custom-nav-link-notifications">
									<FaBell size={30} className="text-dark" />
									{totalNotifications > 0 && (
										<Badge
											pill bg="danger" className="ml-2"
											style={{ position: "relative", top: "-10px", left: "-10px" }}
										>
											{totalNotifications}
										</Badge>
									)}
								</div>
							</Nav.Link>

							<Nav.Link
								as={Link}
								to="#menu-item"
								className="custom-nav-link-cart-2 custom-nav-link"
								onClick={togglePanier}
								style={{ marginLeft: "auto" }}
							>
								<div className="custom-nav-link-notifications">
									<FaCartPlus size={30} className="text-dark" />
									<Badge
										style={{ position: "relative", top: "-10px", left: "-10px" }}
										pill bg="success" className="ml-2">
										{totalItems > 0 && totalItems}
									</Badge>
								</div>
							</Nav.Link>
						</div>
					) : (
						<div></div>
					)}

					<Navbar.Toggle aria-controls="basic-navbar-nav custom-navbar-nav" style={{ backgroundColor: "white" }}>
						{expanded ? (
							<FaTimes size={24} style={{ color: "#f86c6b" }} />
						) : (
							<FaBars size={24} style={{ color: "#f86c6b" }} />
						)}
					</Navbar.Toggle>

					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Link as={Link} to="/home" className="custom-nav-link">
								Accueil
							</Nav.Link>
							<Nav.Link as={Link} to="#menu" className="custom-nav-link">
								Menu
							</Nav.Link>
							<Nav.Link as={Link} to="/livraison" className="custom-nav-link">
								Livraison
							</Nav.Link>
							<Nav.Link
								as={Link}
								to="#notifications"
								className="custom-nav-link-cart custom-nav-link"
								onClick={toggleNotifications}
							>
								<div className="custom-nav-link-notifications">
									<FaBell size={30} className="text-dark" />
									{totalNotifications > 0 && (
										<Badge
											pill bg="danger" className="ml-2"
											style={{ position: "relative", top: "-10px", left: "-10px" }}
										>
											{totalNotifications}
										</Badge>
									)}
								</div>
							</Nav.Link>
							<Nav.Link as={Link} to="#menu-item" className="custom-nav-link-cart custom-nav-link" onClick={togglePanier}>
								<div className="custom-nav-link-cart">
									<FaCartPlus size={30} className="text-dark" />
									<Badge pill bg="success" className="ml-2">
										{totalItems > 0 && totalItems}
									</Badge>
								</div>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
				{isPanierOpen && <Panier onClose={togglePanier} />}
				{showNotifications && <NotificationList notifications={notifications} onClose={() => setShowNotifications(false)} />} {/* Afficher la liste des notifications */}
			</Navbar>
		);
	}
export default NavigationBar;
