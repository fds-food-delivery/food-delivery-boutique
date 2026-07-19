import React from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import { useStore } from "../../store/useStore";

const InfoRow = ({ icon: Icon, label, value }) => (
	<Stack direction="row" spacing={1.5} alignItems="center">
		<Icon color="primary" />
		<Stack>
			<Typography variant="caption" color="text.secondary">
				{label}
			</Typography>
			<Typography fontWeight={500}>{value}</Typography>
		</Stack>
	</Stack>
);

const UserProfile = () => {
	const { currentUser } = useStore();

	return (
		<Container maxWidth="sm" sx={{ mt: { xs: 10, md: 12 }, mb: 6 }}>
			<Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
				<Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
					<Avatar sx={{ width: 72, height: 72, bgcolor: "primary.main" }}>
						<PersonOutlineIcon sx={{ fontSize: 40 }} />
					</Avatar>
					<Typography variant="h5" fontWeight={700}>
						{currentUser?.fullName || "Profil"}
					</Typography>
				</Stack>

				{currentUser ? (
					<Stack spacing={2}>
						<InfoRow icon={PersonOutlineIcon} label="Nom complet" value={currentUser.fullName} />
						<Divider />
						<InfoRow icon={PhoneOutlinedIcon} label="Téléphone" value={currentUser.phone} />
						<Divider />
						<InfoRow icon={HomeOutlinedIcon} label="Adresse de livraison" value={currentUser.address} />
					</Stack>
				) : (
					<Stack spacing={2} alignItems="center" sx={{ py: 2 }}>
						<Typography color="text.secondary" textAlign="center">
							Vous n'avez pas encore de profil. Vos coordonnées sont enregistrées
							automatiquement lors de votre première commande.
						</Typography>
						<Button component={Link} to="/home" variant="contained">
							Voir le menu
						</Button>
					</Stack>
				)}

				{currentUser && (
					<Stack sx={{ mt: 3 }}>
						<Button component={Link} to="/livraison" variant="outlined">
							Voir mes commandes
						</Button>
					</Stack>
				)}
			</Paper>
		</Container>
	);
};

export default UserProfile;
