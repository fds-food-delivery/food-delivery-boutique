import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";

import { useStore } from "../../store/useStore";
import Panier from "../../pages/Panier/Panier";

const NAV_LINKS = [
	{ label: "Accueil", to: "/home" },
	{ label: "Menu", to: "/home#menu" },
	{ label: "Mes commandes", to: "/livraison" },
	{ label: "Contact", to: "/contact" },
];

function NavigationBar() {
	const { cartItems, userID, notifications, totalNotifications, setTotalNotifications } =
		useStore();
	const navigate = useNavigate();

	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [notifAnchor, setNotifAnchor] = useState(null);

	const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 4 });

	const totalItems = cartItems
		? Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0)
		: 0;

	useEffect(() => {
		setTotalNotifications(userID ? notifications.length : 0);
	}, [userID, notifications]);

	return (
		<>
			<AppBar
				position="fixed"
				color="inherit"
				elevation={scrolled ? 4 : 0}
				sx={{ borderBottom: scrolled ? "none" : "1px solid rgba(0,0,0,0.08)" }}
			>
				<Container maxWidth="lg" disableGutters={false}>
					<Toolbar sx={{ py: 1.5, gap: 2 }} disableGutters>
						<Box
							component={Link}
							to="/"
							sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
						>
							<Box
								component="img"
								src="/images/logo-2.png"
								alt="Food Delivery"
								sx={{ height: { xs: 44, sm: 52 }, display: "block" }}
							/>
						</Box>

						<Stack
							direction="row"
							spacing={3}
							sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1, ml: 2 }}
						>
							{NAV_LINKS.map((link) => (
								<Button
									key={link.label}
									component={Link}
									to={link.to}
									color="inherit"
									sx={{
										fontWeight: 500,
										px: 1,
										"&:hover": { color: "primary.main", bgcolor: "transparent" },
									}}
								>
									{link.label}
								</Button>
							))}
						</Stack>

						<Box sx={{ flexGrow: { xs: 1, md: 0 } }} />

						<Stack direction="row" spacing={{ xs: 0.5, sm: 1 }} alignItems="center">
							<IconButton
								aria-label="Notifications"
								onClick={(e) => setNotifAnchor(e.currentTarget)}
							>
								<Badge badgeContent={totalNotifications} color="error">
									<NotificationsIcon />
								</Badge>
							</IconButton>

							<IconButton aria-label="Panier" onClick={() => setIsCartOpen(true)}>
								<Badge badgeContent={totalItems} color="success">
									<ShoppingCartIcon />
								</Badge>
							</IconButton>

							<IconButton aria-label="Mon profil" onClick={() => navigate("/profil")}>
								<PersonIcon />
							</IconButton>

							<IconButton
								aria-label="Menu"
								onClick={() => setIsDrawerOpen(true)}
								sx={{ display: { xs: "flex", md: "none" } }}
							>
								<MenuIcon />
							</IconButton>
						</Stack>
					</Toolbar>
				</Container>
			</AppBar>
			{/* Compense la hauteur de l'AppBar en position fixed */}
			<Toolbar sx={{ py: 1.5 }} />

			{/* Menu mobile (liens de navigation) */}
			<Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
				<Box sx={{ width: 260 }} role="presentation">
					<Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
						<IconButton onClick={() => setIsDrawerOpen(false)} aria-label="Fermer le menu">
							<CloseIcon />
						</IconButton>
					</Box>
					<List>
						{NAV_LINKS.map((link) => (
							<ListItem key={link.label} disablePadding>
								<ListItemButton
									component={Link}
									to={link.to}
									onClick={() => setIsDrawerOpen(false)}
								>
									<ListItemText primary={link.label} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>

			{/* Panier (drawer) */}
			<Drawer anchor="right" open={isCartOpen} onClose={() => setIsCartOpen(false)}>
				<Box sx={{ width: { xs: 320, sm: 380 } }} role="presentation">
					<Panier onClose={() => setIsCartOpen(false)} />
				</Box>
			</Drawer>

			{/* Notifications (menu) */}
			<Menu
				anchorEl={notifAnchor}
				open={Boolean(notifAnchor)}
				onClose={() => setNotifAnchor(null)}
				PaperProps={{ sx: { width: 320, maxHeight: 400 } }}
			>
				{notifications.length === 0 ? (
					<Box sx={{ p: 2 }}>
						<Typography variant="body2" color="text.secondary">
							Aucune notification pour le moment.
						</Typography>
					</Box>
				) : (
					notifications.map((notif, index) => (
						<Box key={notif._id || index}>
							<Box sx={{ px: 2, py: 1.5 }}>
								<Typography variant="body2">{notif.message}</Typography>
								{notif.date && (
									<Typography variant="caption" color="text.secondary">
										{new Date(notif.date).toLocaleString()}
									</Typography>
								)}
							</Box>
							{index < notifications.length - 1 && <Divider />}
						</Box>
					))
				)}
			</Menu>
		</>
	);
}

export default NavigationBar;
