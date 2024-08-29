import React, {useContext, useState} from "react";
import { Modal } from "react-bootstrap";
import { FaCheckCircle, FaTimes, FaUser, FaPhone, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import "./OrderConfirmationModal.css";
import {StoreContext} from "../../context/StoreContext.jsx";

const OrderConfirmationModal = ({
    openModalValiderHandle,
    setOpenModalValiderHandle,
    currentUser,
    totalPrice,
    handleConfirmedOrder



}) => {

    const [selectedPayment, setSelectedPayment] = useState("");
    const [errors, setErrors] = useState({});
    const TypePaiement = [
        { id: 1, name: "A la livraison" },
        { id: 2, name: "Wave" },
        { id: 3, name: "Orange Money" },
    ];
    const {
        setOpenModalServiceNonDisponibe
    } = useContext(StoreContext);
    const [formData, setFormData] = useState({
        name: currentUser?.name || "",
        phone: currentUser?.phone || "",
        address: currentUser?.address?.street || "",
        city: currentUser?.address?.city || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateForm();
    };
    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
        validateForm();
    }

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Nom complet est requis";
        if (!formData.phone) {
            newErrors.phone = "Numéro de téléphone est requis";
        } else if (!/^\d{9}$/.test(formData.phone)) {
            newErrors.phone = "Le numéro de téléphone doit comporter exactement 9 chiffres";
        }
        if (!formData.address) newErrors.address = "Adresse est requise";
        // si le selectedPayment n'est pas egal a TypePaiement
        if (!selectedPayment in TypePaiement) {
            newErrors.selectedPayment = "Veuillez choisir un mode de paiement";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted", formData);
            // handleConfirmedOrder();
            setOpenModalValiderHandle(false);
            setOpenModalServiceNonDisponibe(true);
        }
    };

    return (

        <Modal
            show={openModalValiderHandle}
            onHide={() => setOpenModalValiderHandle(false)}
            centered
            contentClassName="custom-modal"
        >
            <Modal.Header closeButton closeVariant="white">
                <Modal.Title className="modal-title">
                    <FaMoneyBillWave className="icon me-2" /> Confirmation de commande
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                <form className="mb-3" onSubmit={handleSubmit} id="order-confirmation-form">
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">
                            <FaUser className="icon me-2"/>
                        </span>
                        <input
                            type="text"
                            className="form-control custom-input"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Votre nom complet"
                        />

                    </div>
                    {errors.name && <small className="text-danger d-block ">{errors.name}</small>}
                    <p className="mb-3"></p>
                    <div className="input-group ">
                        <span className="input-group-text" id="basic-addon1">
                            <FaPhone className="icon me-2"/>
                        </span>
                        <input type="text" className="form-control custom-input" name="phone" value={formData.phone}
                               onChange={handleChange} placeholder="Votre numéro de téléphone"/>

                    </div>
                    {errors.phone && <small className="text-danger d-block">{errors.phone}</small>}
                    <p className="mb-3"></p>
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">
                            <FaMapMarkerAlt className="icon me-2"/>
                        </span>
                        <input type="text" className="form-control custom-input" name="address" value={formData.address}
                               onChange={handleChange} placeholder="Votre adresse"/>

                    </div>
                    {errors.address && <small className="text-danger">{errors.address}</small>}
                    <p className="mb-3"></p>
                    <div className="form-group">
                        <select
                            className="form-select custom-input"
                            value={selectedPayment}
                            onChange={handlePaymentChange}
                            required={true}
                        >
                            <option value="">Choisir le mode de paiement</option>
                            {TypePaiement.map((payment) => (
                                <option key={payment.id} value={payment.name}>
                                    {payment.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.selectedPayment && <small className="text-danger">{errors.selectedPayment}</small>}
                    <p className="mb-4"></p>

                    <div className="form-grou">

                        Montant Total a payer  :<span className="text-success">{totalPrice()} FCFA</span>


                    </div>
                    <div className="d-flex  mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary me-2 submit"

                        >
                            <FaCheckCircle className="icon me-1"/> Confirmer
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary ms-2 cancel"
                            onClick={() => setOpenModalValiderHandle(false)}
                        >
                            <FaTimes className="icon me-1"/> Annuler
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default OrderConfirmationModal;