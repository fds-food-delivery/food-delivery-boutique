// Statuts de commande (valeurs « backend » en anglais) traduits pour l'affichage,
// sans toucher à la valeur stockée. « Food Processing » = alias de « Preparing ».

const STATUS_LABELS = {
	Pending: "En attente",
	Confirmed: "Confirmée",
	Preparing: "En préparation",
	"Food Processing": "En préparation",
	Ready: "Prête",
	"Out for delivery": "En livraison",
	Delivered: "Livrée",
	Cancelled: "Annulée",
	Canceled: "Annulée",
};

const STATUS_COLORS = {
	Pending: "warning",
	Confirmed: "info",
	Preparing: "info",
	"Food Processing": "info",
	Ready: "primary",
	"Out for delivery": "primary",
	Delivered: "success",
	Cancelled: "error",
	Canceled: "error",
};

// Progression normale d'une commande (hors annulation).
export const STATUS_STEPS = [
	"Pending",
	"Confirmed",
	"Preparing",
	"Ready",
	"Out for delivery",
	"Delivered",
];

// Ramène les alias sur la valeur canonique utilisée dans STATUS_STEPS.
const normalizeStatus = (status) =>
	status === "Food Processing" ? "Preparing" : status === "Canceled" ? "Cancelled" : status;

export const getStatusLabel = (status) => STATUS_LABELS[status] || status;

export const getStatusColor = (status) => STATUS_COLORS[status] || "default";

// Index de l'étape courante dans STATUS_STEPS (-1 si inconnu/annulée).
export const getStatusStepIndex = (status) =>
	STATUS_STEPS.indexOf(normalizeStatus(status));

export const isCancelled = (status) => normalizeStatus(status) === "Cancelled";

// Regroupement pour les filtres : "encours" | "terminees" | "annulees".
export const getStatusGroup = (status) => {
	const s = normalizeStatus(status);
	if (s === "Cancelled") return "annulees";
	if (s === "Delivered") return "terminees";
	return "encours";
};
