import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";

const Orderstate = () => {
	const { Orders, getOrders } = useContext(StoreContext);

	useEffect(() => {
		getOrders(); // Fetch Orders when the component mounts
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

	return (
		<div className="container mx-auto p-4">
			<div className="bg-white shadow-md rounded-lg p-6">
				<table className="w-full text-left table-auto">
					<thead>
					<tr>
						<th className="px-4 py-2">Commande #</th>
						<th className="px-4 py-2">État</th>
						<th className="px-4 py-2">Progression</th>
						<th className="px-4 py-2">Montant</th>
					{/*	action*/}
						<th className="px-4 py-2">Action</th>
					</tr>
					</thead>
					<tbody>
					{Orders.map((order, index) => (
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
								<div
									className={`c100 p${order.status === "Delivered" ? 100 : order.status === "Out for delivery" ? 85 : 50} big green mt-4 mx-auto`}>
									<span>{order.status === "Delivered" ? 100 : order.status === "Out for delivery" ? 85 : 50}%</span>
									<div className="slice">
										<div className="bar"></div>
										<div className="fill"></div>
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
