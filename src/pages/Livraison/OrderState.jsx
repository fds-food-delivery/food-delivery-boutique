import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Clipboard} from "flowbite-react";
import {ClipLoader} from "react-spinners";

const Orderstate = () => {
	const { Orders, getOrders, loading } = useContext(StoreContext);


	useEffect(() => {
		getOrders();
	}, [getOrders]);


	// if (Orders.length === 0 ) {
	// 	return (
	// 		<div className="container mt-5">
	// 			<div className="alert alert-danger text-center">
	// 				<p>La livraison n'est pas disponible pour cette commande.</p>
	// 			</div>
	// 		</div>
	// 	);
	// }


	// Filtrer les commandes non livrées et livrées
	const deliveredOrders = Orders.filter(order => order.status === "Delivered");
	const pendingOrders = Orders.filter(order => order.status !== "Delivered");

	const getProgressPercentage = (status) => {
		switch (status) {
			case "Delivered":
				return 100;
			case "Out for delivery":
				return 50;
			default:
				return 25;
		}
	};

	return (
		loading ? (
				<div className="container mt-5 pt-2 custom-container">
					<div className="row mt-5 pt-5 "></div>
					<div className="row">
						<div className="col-6 text-center justify-content-center align-items-center mx-auto">
							<ClipLoader color="#f86c6b" size={150}/>
						</div>
					</div>
				</div>

			) :
			<div className="container mt-5 pt-2 custom-container">
				<div className="row mt-5 pt-5 "></div>
			{/* Tableau pour les commandes non livrées */}
			<div className="card mb-4">
				<div className="card-header">
					<h2 className="mb-0">Commandes Non Livrées</h2>
				</div>
				<div className="card-body table-responsive">
					<table className="table table-hover">
						<thead className="thead-dark">
						<tr>
							<th>Commande #</th>
							<th>État</th>
							<th>Progression</th>
							<th>Montant</th>
							<th>Action</th>
						</tr>
						</thead>
						<tbody>
						{pendingOrders.map((order, index) => (
							<tr key={index}>
								<td>{order._id}</td>
								<td className={order.status === "Delivered" ? "text-success font-weight-bold" : order.status === "Out for delivery" ? "text-warning font-weight-bold" : "text-secondary font-weight-bold"}>
									{order.status === "Delivered"
										? "Livré"
										: order.status === "Out for delivery"
											? "En cours de livraison"
											: "En cours de préparation"}
								</td>
								<td>
									<div className="progress">
										<div
											className={`progress-bar ${getProgressPercentage(order.status) === 100 ? "bg-success" : "bg-info"}`}
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
								<td>{order.amount} FCFA</td>
								<td>
									<button className="btn btn-primary">
										Voir
									</button>
								</td>
							</tr>
						))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Tableau pour les commandes livrées (Historique) */}
			<div className="card mb-4">
				<div className="card-header">
					<h2 className="mb-0">Historique des Commandes Livrées</h2>
				</div>
				<div className="card-body table-responsive">
					<table className="table table-hover">
						<thead className="thead-dark">
						<tr>
							<th>Commande #</th>
							<th>État</th>
							<th>Montant</th>
							<th>Action</th>
						</tr>
						</thead>
						<tbody>
						{deliveredOrders.map((order, index) => (
							<tr key={index}>
								<td>{order._id}</td>
								<td className="text-success font-weight-bold">Livré</td>
								<td>{order.amount} FCFA</td>
								<td>
									<button className="btn btn-primary">
										Voir
									</button>
								</td>
							</tr>
						))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Information de suivi */}
			<div className="alert alert-info text-center mt-4">
				<p>Vous pouvez suivre l'état de votre commande ici.</p>
				<p>Vous pouvez également nous contacter pour plus d'informations.</p>
			</div>
		</div>

	);
};

export default Orderstate;
