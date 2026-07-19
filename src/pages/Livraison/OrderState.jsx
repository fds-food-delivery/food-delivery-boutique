import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

import { useStore } from "../../store/useStore";
import { getStatusLabel, getStatusColor } from "../../utils/orderStatus";

const OrderState = () => {
	const { orders, getOrders } = useStore();
	const [loadingOrders, setLoadingOrders] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			setLoadingOrders(true);
			try {
				await getOrders();
			} catch (error) {
				console.error("Error in fetching orders:", error);
			} finally {
				setLoadingOrders(false);
			}
		};
		fetchOrders();
	}, []);

	if (loadingOrders) {
		return (
			<Stack alignItems="center" sx={{ mt: 12 }}>
				<CircularProgress />
			</Stack>
		);
	}

	if (!orders || orders.length === 0) {
		return (
			<Container maxWidth="sm" sx={{ mt: { xs: 10, md: 12 }, mb: 6, textAlign: "center" }}>
				<ReceiptLongOutlinedIcon sx={{ fontSize: 56, color: "text.disabled", mb: 1 }} />
				<Typography variant="h6">Vous n'avez pas encore passé de commande.</Typography>
				<Typography color="text.secondary">
					Vous pouvez passer une commande en visitant notre menu.
				</Typography>
			</Container>
		);
	}

	return (
		<Container maxWidth="md" sx={{ mt: { xs: 10, md: 12 }, mb: 6 }}>
			<Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
				Mes commandes
			</Typography>
			<TableContainer component={Paper} variant="outlined">
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>État</TableCell>
							<TableCell align="right">Montant</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders.map((order, index) => (
							<TableRow key={order._id || index}>
								<TableCell>{new Date(order.date).toLocaleString("fr-FR")}</TableCell>
								<TableCell>
									<Chip label={getStatusLabel(order.status)} color={getStatusColor(order.status)} size="small" />
								</TableCell>
								<TableCell align="right">{order.amount} FCFA</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
				Vous pouvez suivre l'état de votre commande ici, ou nous contacter pour
				plus d'informations.
			</Typography>
		</Container>
	);
};

export default OrderState;
