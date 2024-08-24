import {useContext, useEffect, useState} from "react";
import { StoreContext } from "../../context/StoreContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { ClipLoader } from "react-spinners";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome

const Orderstate = () => {
	const { orders, getOrders,setLoading, loading, getCurrentUser } = useContext(StoreContext);
	const { loadingOrders, setLoadingOrders } = useState(false);
	useEffect(() => {

		const fetchOrders = async () => {
			getOrders()
				.then(orders => {
					console.log("Orders fetched successfully");
					console.log("Orders", orders); // Utiliser les commandes ici
				})
				.then(() => {
					setLoadingOrders(false);
				})
				.catch(error => {
					console.error("Error in fetching orders:", error);
					setLoadingOrders(false);
				});
		};
		fetchOrders();
	}, [getOrders]);
	// [getOrders, getCurrentUser]);
	console.log("loading", loading);

	if (loadingOrders || orders === null) {
		return (
			<div className="container mt-5 pt-5 custom-container text-center">
				<ClipLoader color="#f86c6b" size={150} />
			</div>
		);
	}
	if (orders === null || orders === undefined || orders.length === 0) {
		return (
			<div className="container mt-5 pt-2 custom-container text-center">
				<h2>Vous n'avez pas encore passé de commande.</h2>
				<p>Vous pouvez passer une commande en visitant notre menu.</p>
			</div>
		);
	}
	const deliveredOrders = orders.filter(order => order.status === "Delivered");
	const pendingOrders = orders.filter(order => order.status !== "Delivered");

	const getProgressPercentage = status => {
		switch (status) {
			case "Delivered":
				return 100;
			case "Out for delivery":
				return 50;
			default:
				return 25;
		}
	};

	const OrderTable = ({ orders, title, showProgress }) => (
		<div className="card mb-4">
			<div className="card-header">
				<h2 className="mb-0">{title}</h2>
			</div>
			<div className="card-body table-responsive">
				<table className="table table-hover scroll fa-database">
					<thead className="thead-dark">
					<tr>
						{/*heure de commande*/}
						<th>Date de commande</th>
						<th>État</th>
						{showProgress && <th>Progression</th>}
						<th>Montant</th>
						<th>Action</th>
					</tr>
					</thead>
					<tbody>
					{orders.map((order, index) => (
						<tr key={index}>
							<td>{new Date(order.date).toLocaleString()}</td>
							<td className={`font-weight-bold ${order.status === "Delivered" ? "text-success" : "text-secondary"}`}>
								{order.status === "Delivered"
									? "Livré"
									: order.status === "Out for delivery"
										? "En cours de livraison"
										: "En cours de préparation"}
							</td>
							{showProgress && (
								<td>
									<div className="progress">
										<div
											className={`progress-bar ${
												getProgressPercentage(order.status) === 100 ? "bg-success" : "bg-info"
											}`}
											role="progressbar"
											style={{ width: `${getProgressPercentage(order.status)}%` }}
											aria-valuenow={getProgressPercentage(order.status)}
											aria-valuemin="0"
											aria-valuemax="100"
										>
											{getProgressPercentage(order.status)}%
										</div>
									</div>
								</td>
							)}
							<td>{order.amount} FCFA</td>
							<td>
								<button className="btn btn-primary">Voir</button>
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</div>
	);

	return (
		<div className="container mt-5 pt-2 custom-container">
			<div className="row mt-5 pt-5"></div>

			{/* Commandes Non Livrées */}
			<OrderTable orders={pendingOrders} title="Commandes Non Livrées" showProgress={true} />

			{/* Historique des Commandes Livrées */}
			<OrderTable orders={deliveredOrders} title="Historique des Commandes Livrées" showProgress={false} />

			{/* Information de suivi */}
			<div className="alert alert-info text-center mt-4">
				<p>Vous pouvez suivre l'état de votre commande ici.</p>
				<p>Vous pouvez également nous contacter pour plus d'informations.</p>
			</div>
		</div>
	);
};

export default Orderstate;
