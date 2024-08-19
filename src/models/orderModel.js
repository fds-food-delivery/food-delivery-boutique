const orderModel = {
    userId: "",
    items: [
        {
            itemId: "",
            name: "",
            quantity: 0,
            price: 0
        }
    ],
    amount: 0,
    address: {
        street: "",
        city: "",
        postalCode: ""
    },
    status: "",
    payment: false
};

export default orderModel;