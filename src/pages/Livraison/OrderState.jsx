import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CircularProgress from "@mui/material/CircularProgress";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";

import { useStore } from "../../store/useStore";
import {
	getStatusLabel,
	getStatusColor,
	getStatusGroup,
	getStatusStepIndex,
	isCancelled,
	STATUS_STEPS,
} from "../../utils/orderStatus";

const FILTERS = [
	{ key: "toutes", label: "Toutes" },
	{ key: "encours", label: "En cours" },
	{ key: "terminees", label: "Terminées" },
	{ key: "annulees", label: "Annulées" },
];

const formatCFA = (n) => Number(n || 0).toLocaleString("fr-FR");

const formatDateTime = (value) => {
	if (!value) return "";
	const d = new Date(value);
	if (Number.isNaN(d.getTime())) return value;
	return d.toLocaleString("fr-FR", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

const InfoLine = ({ label, value }) => (
	<Stack direction="row" justifyContent="space-between" spacing={2}>
		<Typography variant="body2" color="text.secondary">
			{label}
		</Typography>
		<Typography variant="body2" fontWeight={600} sx={{ textAlign: "right" }}>
			{value}
		</Typography>
	</Stack>
);

const OrderCard = ({ order }) => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const items = order.items || [];
	const subtotal = items.reduce((t, i) => t + i.price * i.quantity, 0);
	const deliveryFee = order.deliveryFee || 0;
	const total = items.length ? subtotal + deliveryFee : order.amount || 0;

	const group = getStatusGroup(order.status);
	const cancelled = isCancelled(order.status);
	const activeStep = getStatusStepIndex(order.status);

	return (
		<Card variant="outlined" sx={{ borderRadius: 3 }}>
			<CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
				{/* En-tête : numéro + statut */}
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="flex-start"
					spacing={1}
				>
					<Box sx={{ minWidth: 0 }}>
						<Typography fontWeight={700} sx={{ wordBreak: "break-word" }}>
							Commande #{order.orderNumber || order._id}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Commandée le {formatDateTime(order.date)}
						</Typography>
					</Box>
					<Chip
						label={getStatusLabel(order.status).toUpperCase()}
						color={getStatusColor(order.status)}
						size="small"
						sx={{ fontWeight: 700, flexShrink: 0 }}
					/>
				</Stack>

				{/* Restaurant */}
				{order.restaurant && (
					<Typography variant="h6" sx={{ mt: 2 }}>
						{order.restaurant.emoji} {order.restaurant.name}
					</Typography>
				)}

				{/* Détail des plats */}
				{items.length > 0 && (
					<Stack spacing={0.75} sx={{ mt: 2 }}>
						{items.map((it, idx) => (
							<Stack
								key={idx}
								direction="row"
								justifyContent="space-between"
								spacing={2}
							>
								<Typography variant="body2">
									{it.quantity}x {it.name}
								</Typography>
								<Typography variant="body2" fontWeight={600} sx={{ whiteSpace: "nowrap" }}>
									{formatCFA(it.price * it.quantity)} FCFA
								</Typography>
							</Stack>
						))}
					</Stack>
				)}

				{/* Totaux */}
				<Divider sx={{ my: 2 }} />
				{items.length > 0 && (
					<Stack spacing={0.5}>
						<InfoLine label="Sous-total" value={`${formatCFA(subtotal)} FCFA`} />
						{deliveryFee > 0 && (
							<InfoLine label="Livraison" value={`${formatCFA(deliveryFee)} FCFA`} />
						)}
					</Stack>
				)}
				<Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
					<Typography fontWeight={700}>Total</Typography>
					<Typography fontWeight={700} color="primary">
						{formatCFA(total)} FCFA
					</Typography>
				</Stack>

				{/* Infos de temps selon le statut */}
				<Stack sx={{ mt: 2 }} spacing={0.25}>
					{group === "encours" && order.estimatedDelivery && (
						<Typography variant="body2" color="text.secondary">
							Livraison estimée : {order.estimatedDelivery}
						</Typography>
					)}
					{group === "terminees" && order.deliveredAt && (
						<Typography variant="body2" color="success.main">
							Livrée le {formatDateTime(order.deliveredAt)}
						</Typography>
					)}
					{cancelled && (
						<Typography variant="body2" color="error.main">
							Commande annulée
						</Typography>
					)}
				</Stack>

				{/* Actions */}
				<Stack
					direction={{ xs: "column", sm: "row" }}
					spacing={1.5}
					sx={{ mt: 2.5 }}
				>
					{group === "encours" ? (
						<>
							<Button
								variant="contained"
								startIcon={<LocalShippingOutlinedIcon />}
								onClick={() => setOpen((o) => !o)}
							>
								Suivre la commande
							</Button>
							<Button
								variant="outlined"
								startIcon={<VisibilityOutlinedIcon />}
								onClick={() => setOpen((o) => !o)}
							>
								Voir les détails
							</Button>
						</>
					) : (
						<>
							<Button
								variant="outlined"
								startIcon={<VisibilityOutlinedIcon />}
								onClick={() => setOpen((o) => !o)}
							>
								Voir les détails
							</Button>
							<Button
								variant="contained"
								startIcon={<ReplayOutlinedIcon />}
								onClick={() => navigate("/")}
							>
								Commander à nouveau
							</Button>
						</>
					)}
				</Stack>

				{/* Suivi + détails (repliable) */}
				<Collapse in={open} timeout="auto" unmountOnExit>
					<Divider sx={{ my: 2 }} />
					{!cancelled ? (
						<Box sx={{ overflowX: "auto", pb: 1 }}>
							<Stepper activeStep={activeStep} alternativeLabel sx={{ minWidth: 520 }}>
								{STATUS_STEPS.map((s) => (
									<Step key={s}>
										<StepLabel>{getStatusLabel(s)}</StepLabel>
									</Step>
								))}
							</Stepper>
						</Box>
					) : (
						<Typography variant="body2" color="error.main" sx={{ mb: 1 }}>
							Cette commande a été annulée.
						</Typography>
					)}

					<Stack spacing={0.5} sx={{ mt: cancelled ? 0 : 2 }}>
						{order.restaurant && (
							<InfoLine
								label="Restaurant"
								value={`${order.restaurant.emoji} ${order.restaurant.name}`}
							/>
						)}
						{order.address && (
							<InfoLine label="Adresse de livraison" value={order.address} />
						)}
						{order.paymentMethod && (
							<InfoLine label="Mode de paiement" value={order.paymentMethod} />
						)}
					</Stack>
				</Collapse>
			</CardContent>
		</Card>
	);
};

const OrderState = () => {
	const { orders, getOrders } = useStore();
	const [loadingOrders, setLoadingOrders] = useState(true);
	const [filter, setFilter] = useState("toutes");

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

	const counts = useMemo(() => {
		const list = orders || [];
		return {
			toutes: list.length,
			encours: list.filter((o) => getStatusGroup(o.status) === "encours").length,
			terminees: list.filter((o) => getStatusGroup(o.status) === "terminees").length,
			annulees: list.filter((o) => getStatusGroup(o.status) === "annulees").length,
		};
	}, [orders]);

	const filtered = useMemo(() => {
		const list = orders || [];
		if (filter === "toutes") return list;
		return list.filter((o) => getStatusGroup(o.status) === filter);
	}, [orders, filter]);

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
			<Typography variant="h4" fontWeight={700} sx={{ mb: 2.5 }}>
				Mes commandes
			</Typography>

			{/* Filtres */}
			<Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
				{FILTERS.map((f) => {
					const selected = filter === f.key;
					return (
						<Chip
							key={f.key}
							label={`${f.label} (${counts[f.key]})`}
							onClick={() => setFilter(f.key)}
							color={selected ? "primary" : "default"}
							variant={selected ? "filled" : "outlined"}
							sx={{ fontWeight: 600 }}
						/>
					);
				})}
			</Stack>

			{/* Liste des commandes */}
			{filtered.length === 0 ? (
				<Typography color="text.secondary" sx={{ mt: 4, textAlign: "center" }}>
					Aucune commande dans cette catégorie.
				</Typography>
			) : (
				<Stack spacing={2.5}>
					{filtered.map((order, index) => (
						<OrderCard key={order._id || index} order={order} />
					))}
				</Stack>
			)}
		</Container>
	);
};

export default OrderState;
