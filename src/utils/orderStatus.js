// Les statuts viennent du backend en anglais (orderModel.js) — on les traduit
// ici pour l'affichage, sans toucher à la valeur stockée/envoyée à l'API.
const STATUS_LABELS = {
	"Food Processing": "En préparation",
	Pending: "En attente",
	Delivered: "Livrée",
};

const STATUS_COLORS = {
	"Food Processing": "info",
	Pending: "warning",
	Delivered: "success",
};

export const getStatusLabel = (status) => STATUS_LABELS[status] || status;

export const getStatusColor = (status) => STATUS_COLORS[status] || "default";
