import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

import { useStore } from "../../store/useStore";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import { mockProcessPayment } from "../../mocks/payment";
import { getStatusLabel } from "../../utils/orderStatus";

const PAYMENT_METHODS = [
	{ id: "delivery", label: "À la livraison", mock: false, color: "#f86c6b", icon: LocalShippingOutlinedIcon },
	{ id: "wave", label: "Wave", mock: true, color: "#1DC8E5", icon: PhoneIphoneIcon },
	{ id: "orange_money", label: "Orange Money", mock: true, color: "#FF6600", icon: PhoneIphoneIcon },
];

const ensureImageExtension = (imageName) => {
	if (imageName.endsWith(".png") || imageName.endsWith(".jpg")) {
		return imageName;
	}
	return `${imageName}.png`;
};

const Panier = ({ onClose }) => {
	const {
		cartItems,
		foodList,
		addToCart,
		removeFromCart,
		deleteFromCart,
		url,
		placeOrder,
	} = useStore();
	const navigate = useNavigate();

	const [step, setStep] = useState("cart"); // cart | form | paying | success | error
	const [submitting, setSubmitting] = useState(false);
	const [formData, setFormData] = useState({ fullName: "", phone: "", address: "" });
	const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].id);
	const [errors, setErrors] = useState({});
	const [confirmedOrder, setConfirmedOrder] = useState(null);

	const cartEntries = Object.keys(cartItems)
		.map((id) => {
			const item = foodList.find((food) => food._id === id);
			return item ? { ...item, quantity: cartItems[id] } : null;
		})
		.filter(Boolean);

	const total = cartEntries.reduce((sum, item) => sum + item.price * item.quantity, 0);

	const handleClose = () => {
		setStep("cart");
		setConfirmedOrder(null);
		onClose?.();
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const validateForm = () => {
		const newErrors = {};
		if (!formData.fullName.trim()) newErrors.fullName = "Nom complet requis";
		if (!/^\d{9}$/.test(formData.phone)) {
			newErrors.phone = "Numéro à 9 chiffres requis";
		}
		if (!formData.address.trim()) newErrors.address = "Adresse requise";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const selectedMethod = PAYMENT_METHODS.find((m) => m.id === paymentMethod);

	const finalizeOrder = async (paid) => {
		const result = await placeOrder({
			fullName: formData.fullName,
			phone: formData.phone,
			address: formData.address,
			paymentMethod,
			paid,
		});
		setConfirmedOrder(result.success ? result.order : null);
		setStep(result.success ? "success" : "error");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		if (selectedMethod?.mock) {
			setStep("paying");
			const payment = await mockProcessPayment({ method: paymentMethod, phone: formData.phone });
			await finalizeOrder(payment.success);
			return;
		}

		setSubmitting(true);
		await finalizeOrder(false);
		setSubmitting(false);
	};

	const renderCartStep = () => (
		<>
			<Stack sx={{ flexGrow: 1, overflowY: "auto", px: 2 }}>
				{cartEntries.length === 0 ? (
					<Stack alignItems="center" spacing={1} sx={{ py: 6 }}>
						<ShoppingCartOutlinedIcon sx={{ fontSize: 48, color: "text.disabled" }} />
						<Typography color="text.secondary">Votre panier est vide</Typography>
					</Stack>
				) : (
					cartEntries.map((item) => {
						const image = item.image
							? resolveImageUrl(ensureImageExtension(item.image), `${url}/api/v1/foods/image`)
							: null;
						return (
							<Stack key={item._id} direction="row" spacing={1.5} alignItems="center" sx={{ py: 1.5 }}>
								<Box
									component="img"
									src={image || "https://placehold.co/80"}
									onError={(e) => {
										e.target.src = "https://placehold.co/80";
									}}
									alt={item.name}
									sx={{ width: 56, height: 56, borderRadius: 2, objectFit: "cover" }}
								/>
								<Box sx={{ flexGrow: 1, minWidth: 0 }}>
									<Typography noWrap fontWeight={500}>
										{item.name}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{item.price} FCFA
									</Typography>
								</Box>
								<Stack direction="row" alignItems="center" spacing={0.5}>
									<IconButton size="small" onClick={() => removeFromCart(item._id)} aria-label="Retirer un article">
										<RemoveIcon fontSize="small" />
									</IconButton>
									<Typography sx={{ minWidth: 16, textAlign: "center" }}>{item.quantity}</Typography>
									<IconButton size="small" onClick={() => addToCart(item._id)} aria-label="Ajouter un article">
										<AddIcon fontSize="small" />
									</IconButton>
								</Stack>
								<IconButton
									size="small"
									color="error"
									onClick={() => deleteFromCart(item._id)}
									aria-label="Supprimer du panier"
								>
									<DeleteOutlineIcon fontSize="small" />
								</IconButton>
							</Stack>
						);
					})
				)}
			</Stack>

			{cartEntries.length > 0 && (
				<Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
					<Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
						<Typography fontWeight={600}>Total</Typography>
						<Typography fontWeight={600} color="primary">
							{total} FCFA
						</Typography>
					</Stack>
					<Button fullWidth variant="contained" size="large" onClick={() => setStep("form")}>
						Commander
					</Button>
				</Box>
			)}
		</>
	);

	const renderFormStep = () => (
		<Box component="form" onSubmit={handleSubmit} sx={{ px: 2, py: 1, flexGrow: 1, overflowY: "auto" }}>
			<Stack spacing={2} sx={{ mt: 1 }}>
				<TextField
					label="Nom complet"
					name="fullName"
					value={formData.fullName}
					onChange={handleChange}
					error={Boolean(errors.fullName)}
					helperText={errors.fullName}
					InputProps={{ startAdornment: <PersonOutlineIcon sx={{ mr: 1, color: "text.disabled" }} /> }}
					fullWidth
				/>
				<TextField
					label="Téléphone"
					name="phone"
					value={formData.phone}
					onChange={handleChange}
					error={Boolean(errors.phone)}
					helperText={errors.phone}
					InputProps={{ startAdornment: <PhoneOutlinedIcon sx={{ mr: 1, color: "text.disabled" }} /> }}
					fullWidth
				/>
				<TextField
					label="Adresse de livraison"
					name="address"
					value={formData.address}
					onChange={handleChange}
					error={Boolean(errors.address)}
					helperText={errors.address}
					InputProps={{ startAdornment: <HomeOutlinedIcon sx={{ mr: 1, color: "text.disabled" }} /> }}
					fullWidth
					multiline
					minRows={2}
				/>

				<Box>
					<Typography variant="subtitle2" sx={{ mb: 0.5 }}>
						Mode de paiement
					</Typography>
					<RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
						{PAYMENT_METHODS.map((method) => (
							<FormControlLabel
								key={method.id}
								value={method.id}
								control={<Radio sx={{ color: method.color, "&.Mui-checked": { color: method.color } }} />}
								label={
									<Stack direction="row" spacing={1} alignItems="center">
										<method.icon sx={{ color: method.color, fontSize: 20 }} />
										<Typography>{method.label}</Typography>
									</Stack>
								}
							/>
						))}
					</RadioGroup>
				</Box>
			</Stack>

			<Box sx={{ mt: 3, pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
				<Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
					<Typography fontWeight={600}>Total à payer</Typography>
					<Typography fontWeight={600} color="primary">
						{total} FCFA
					</Typography>
				</Stack>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					size="large"
					disabled={submitting}
					sx={selectedMethod?.mock ? { bgcolor: selectedMethod.color, "&:hover": { bgcolor: selectedMethod.color } } : undefined}
				>
					{submitting ? (
						<CircularProgress size={22} color="inherit" />
					) : selectedMethod?.mock ? (
						`Payer avec ${selectedMethod.label}`
					) : (
						"Confirmer la commande"
					)}
				</Button>
			</Box>
		</Box>
	);

	const renderPayingStep = () => (
		<Stack alignItems="center" spacing={2} sx={{ flexGrow: 1, justifyContent: "center", p: 3, textAlign: "center" }}>
			<Box
				sx={{
					width: 64,
					height: 64,
					borderRadius: "50%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					bgcolor: selectedMethod ? `${selectedMethod.color}22` : "action.hover",
				}}
			>
				{selectedMethod && <selectedMethod.icon sx={{ fontSize: 32, color: selectedMethod.color }} />}
			</Box>
			<CircularProgress size={28} sx={{ color: selectedMethod?.color }} />
			<Typography variant="h6">Paiement {selectedMethod?.label} en cours</Typography>
			<Typography color="text.secondary">
				Confirmez la transaction sur votre téléphone ({formData.phone}).
			</Typography>
		</Stack>
	);

	const renderStatusStep = (isSuccess) => (
		<Stack alignItems="center" spacing={2} sx={{ flexGrow: 1, justifyContent: "center", p: 3, textAlign: "center" }}>
			{isSuccess ? (
				<CheckCircleOutlineIcon color="success" sx={{ fontSize: 64 }} />
			) : (
				<ErrorOutlineIcon color="error" sx={{ fontSize: 64 }} />
			)}
			<Typography variant="h6">
				{isSuccess ? "Commande validée !" : "La commande n'a pas pu être validée"}
			</Typography>
			<Typography color="text.secondary">
				{isSuccess
					? "Nous préparons votre commande, vous pouvez suivre son statut dans Mes commandes."
					: "Vérifiez votre connexion et réessayez."}
			</Typography>
			{isSuccess && confirmedOrder && (
				<Stack spacing={0.5} sx={{ bgcolor: "action.hover", borderRadius: 2, p: 1.5, minWidth: 220 }}>
					<Typography variant="body2" color="text.secondary">
						Commande n° {confirmedOrder._id?.slice(-6).toUpperCase()}
					</Typography>
					<Typography variant="body2" fontWeight={600}>
						{confirmedOrder.amount} FCFA — {getStatusLabel(confirmedOrder.status)}
					</Typography>
				</Stack>
			)}
			<Stack direction="row" spacing={1.5} sx={{ mt: 1 }}>
				{isSuccess ? (
					<Button
						variant="contained"
						onClick={() => {
							handleClose();
							navigate("/livraison");
						}}
					>
						Voir mes commandes
					</Button>
				) : (
					<Button variant="contained" onClick={() => setStep("form")}>
						Réessayer
					</Button>
				)}
				<Button variant="outlined" onClick={handleClose}>
					Fermer
				</Button>
			</Stack>
		</Stack>
	);

	const showBack = step === "form";
	const title = { cart: "Mon panier", form: "Livraison", paying: "Paiement", success: "", error: "" }[step];

	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 400 }}>
			{(step === "cart" || step === "form" || step === "paying") && (
				<Stack direction="row" alignItems="center" sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
					{showBack && (
						<IconButton onClick={() => setStep("cart")} aria-label="Retour" sx={{ mr: 1 }}>
							<ArrowBackIcon />
						</IconButton>
					)}
					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						{title}
					</Typography>
					{step !== "paying" && (
						<IconButton onClick={handleClose} aria-label="Fermer">
							<CloseIcon />
						</IconButton>
					)}
				</Stack>
			)}

			{step === "cart" && renderCartStep()}
			{step === "form" && renderFormStep()}
			{step === "paying" && renderPayingStep()}
			{step === "success" && renderStatusStep(true)}
			{step === "error" && renderStatusStep(false)}
		</Box>
	);
};

export default Panier;
