import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";

const Orderstate = () => {
	const { Orders, getOrders } = useContext(StoreContext);

	// useEffect(() => {
	// 	getOrders(); // Fetch Orders when the component mounts
	// }, [getOrders]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			getOrders(); // Fetch Orders every 30 seconds
		}, 15000); // 30000 milliseconds = 30 seconds

		// Cleanup interval on component unmount
		return () => clearInterval(intervalId);
	}, [getOrders]);

	if (!Orders || Orders.length === 0) {
		return (
			<div className="container mx-auto p-4">
				<div className="bg-white shadow-md rounded-lg p-6">
					<div className="text-center text-red-600 font-semibold">
						<p>La livraison n'est pas disponible pour cette commande.</p>
					</div>
				</div>
			</div>
		);
	}

	// Filtrer les commandes non livrées et livrées
	const deliveredOrders = Orders.filter(order => order.status === "Delivered");
	const pendingOrders = Orders.filter(order => order.status !== "Delivered");

	return (
		<div className="container mx-auto p-4">
			{/* Tableau pour les commandes non livrées */}
			<div className="bg-white shadow-md rounded-lg p-6">
				<h2 className="text-xl font-semibold mb-4">Commandes Non Livrées</h2>
				<table className="w-full text-left table-auto">
					<thead>
					<tr>
						<th className="px-4 py-2">Commande #</th>
						<th className="px-4 py-2">État</th>
						<th className="px-4 py-2">Progression</th>
						<th className="px-4 py-2">Montant</th>
						<th className="px-4 py-2">Action</th>
					</tr>
					</thead>
					<tbody>
					{pendingOrders.map((order, index) => (
						<tr key={index} className="border-b border-gray-200">
							<td className="px-4 py-2">{order._id}</td>
							<td className={`px-4 py-2 text-${order.status === "Delivered" ? "green" : order.status === "Out for delivery" ? "yellow" : "gray"}-600 font-bold`}>
								{order.status === "Delivered"
									? "Livré"
									: order.status === "Out for delivery"
										? "En cours de livraison"
										: "En cours de préparation"}
							</td>
							<td className="px-4 py-2">
								<div className="relative pt-1">
									<div className="flex mb-2 items-center justify-between">
										<div>
											<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
												{order.status === "Delivered"
													? "100%"
													: order.status === "Out for delivery"
														? "50%"
														: "25%"}
											</span>
										</div>
									</div>
									<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
										<div
											style={{ width: order.status === "Delivered" ? "100%" : order.status === "Out for delivery" ? "50%" : "25%" }}
											className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500`}>
										</div>
									</div>
								</div>
							</td>
							<td className="px-4 py-2">{order.amount} FCFA</td>
							<td className="px-4 py-2">
								<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
									Voir
								</button>
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>

			{/* Tableau pour les commandes livrées (Historique) */}
			<div className="bg-white shadow-md rounded-lg p-6 mt-4">
				<h2 className="text-xl font-semibold mb-4">Historique des Commandes Livrées</h2>
				<table className="w-full text-left table-auto">
					<thead>
					<tr>
						<th className="px-4 py-2">Commande #</th>
						<th className="px-4 py-2">État</th>
						<th className="px-4 py-2">Montant</th>
						<th className="px-4 py-2">Action</th>
					</tr>
					</thead>
					<tbody>
					{deliveredOrders.map((order, index) => (
						<tr key={index} className="border-b border-gray-200">
							<td className="px-4 py-2">{order._id}</td>
							<td className="px-4 py-2 text-green-600 font-bold">Livré</td>
							<td className="px-4 py-2">{order.amount} FCFA</td>
							<td className="px-4 py-2">
								<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
									Voir
								</button>
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>

			<div className="bg-white shadow-md rounded-lg p-6 mt-4">
				<div className="text-center text-gray-600 font-semibold">
					<p>Vous pouvez suivre l'état de votre commande ici.</p>
					<p>Vous pouvez également nous contacter pour plus d'informations.</p>
				</div>
			</div>
		</div>
	);
};

export default Orderstate;
