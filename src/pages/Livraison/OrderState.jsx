import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { ClipLoader } from "react-spinners";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaEye } from "react-icons/fa"; // Import Font Awesome



const Orderstate = () => {
    const { orders, getOrders, setLoading, loading, getCurrentUser, StateType } = useContext(StoreContext);

    const [loadingOrders, setLoadingOrders] = useState(true); // Initialize to true

    const fetchOrders = async () => {
        setLoadingOrders(true); // Set loading state to true before fetching
        try {
            const orders = await getOrders();
            console.log("Orders fetched successfully");
            console.log("Orders", orders); // Use the fetched orders here
        } catch (error) {
            console.error("Error in fetching orders:", error);
        } finally {
            setLoadingOrders(false); // Set loading state to false after fetching
        }
    };


    const fetchOrdersEveryTime = async () => {
        setInterval(async () => {
            const orders = await getOrders();
            setLoadingOrders(true); // Set loading state to true before fetching
            setLoading(false); // Set loading state to false after fetching
            console.log("Orders fetched successfully");
            console.log("Orders", orders); // Use the fetched orders here
        } , 2000);
    }
    const getStatusName = (status) => {
        const state = StateType.find(state => state.value === status);
        return state ? state.name : status;
    };

    useEffect(() => {
        fetchOrders();
        setLoading(false);
        setLoadingOrders(false);
    },[], [fetchOrdersEveryTime]);

    console.log("loading", loading);

    // if (loadingOrders) {
    //     return (
    //         <div className="container mt-5 pt-5 custom-container text-center">
    //             <ClipLoader color="#f86c6b" size={150} />
    //         </div>
    //     );
    // }

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
                <table className="table table-hover ">
                    <thead className="thead-dark">
                        <tr>
                            <th>Date</th>
                            <th>État</th>
                            <th>Montant</th>
                            {/*<th>Action</th>*/}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td
                                    style={{
                                        color: "black",
                                        fontSize: "1.2em",
                                        fontWeight: "bold",
                                        textAlign: "left",
                                        whiteSpace: "pre-wrap",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {new Date(order.date).toLocaleString()}
                                </td>
                                {/*//orderStateType: StateType[] = [
// 				{ value: 'PENDING', name: 'En attente' },
// 				{ value: 'IN_PROGRESS', name: 'En cours' },
// 				{ value: 'DELIVERED', name: 'Livré' },
// 				{ value: 'CANCELLED', name: 'Annulée' },
// 			];
*/}
                               <td className={`font-weight-bold ${order.status === "DELIVERED" ? "text-success" : "text-secondary"}`}>
                                    {getStatusName(order.status)}
                                </td>
                                <td>{order.amount} FCFA</td>
                                {/*<td>*/}
                                {/*    <button className="btn btn-primary">*/}
                                {/*        <FaEye />*/}
                                {/*    </button>*/}
                                {/*</td>*/}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="container mt-4 custom-container">
            <div className="row mt-5 "></div>

            {/* Commandes Non Livrées */}
            <OrderTable orders={pendingOrders} title="Commandes en cours" showProgress={true} />

            {/* Historique des Commandes Livrées */}
            {/*<OrderTable orders={deliveredOrders} title="Historique des Commandes Livrées" showProgress={false} />*/}

            {/* Information de suivi */}
            <div className="alert alert-info text-center mt-4">
                <p>Vous pouvez suivre l'état de votre commande ici.</p>
                <p>Vous pouvez également nous contacter pour plus d'informations.</p>
            </div>
        </div>
    );
};

export default Orderstate;