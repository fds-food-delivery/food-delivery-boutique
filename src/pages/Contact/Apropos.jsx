import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const CONTACT_INFO = [
	{ icon: LocationOnOutlinedIcon, label: "Adresse", value: "Dakar, Sénégal" },
	{ icon: PhoneOutlinedIcon, label: "Téléphone", value: "+221 33 123 45 67" },
	{ icon: EmailOutlinedIcon, label: "Email", value: "contact@food-delivery.com" },
	{ icon: AccessTimeOutlinedIcon, label: "Horaires", value: "Tous les jours, 10h – 23h" },
];

const APropos = () => {
	return (
		<Container maxWidth="md" sx={{ mt: { xs: 10, md: 12 }, mb: 6 }}>
			<Typography variant="h4" fontWeight={700} textAlign="center" sx={{ mb: 3 }}>
				À propos de Food Delivery
			</Typography>

			<Stack spacing={2} sx={{ mb: 5 }}>
				<Typography color="text.secondary">
					Chez Food Delivery, nous croyons en la puissance d'un bon repas pour
					rapprocher les gens. Notre mission est de proposer des plats
					délicieux, préparés rapidement et à un prix juste.
				</Typography>
				<Typography color="text.secondary">
					Notre menu est conçu pour offrir une variété de plats savoureux, des
					grillades aux salades fraîches, en passant par nos pizzas et nos
					desserts. Nous utilisons des ingrédients de qualité, sourcés auprès de
					fournisseurs locaux de confiance.
				</Typography>
			</Stack>

			<Grid container spacing={2}>
				{CONTACT_INFO.map(({ icon: Icon, label, value }) => (
					<Grid key={label} item xs={12} sm={6}>
						<Paper
							variant="outlined"
							sx={{ p: 2, display: "flex", alignItems: "center", gap: 1.5, borderRadius: 3 }}
						>
							<Icon color="primary" />
							<Box>
								<Typography variant="caption" color="text.secondary">
									{label}
								</Typography>
								<Typography fontWeight={600}>{value}</Typography>
							</Box>
						</Paper>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default APropos;
