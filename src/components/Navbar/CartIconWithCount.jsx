import {FaShoppingCart} from "react-icons/fa";
import {FaCartShopping} from "react-icons/fa6";
import React from "react";

const CartIconWithCount = ({ itemCount }) => {
    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <FaCartShopping
                size={50}
                color={"#f86c6b"}
                textAnchor={"center"}
                className="text-red-500 text-5xl hover:text-red-700 hover:shadow-lg transition duration-300 ease-in-out"
            />
            {itemCount > 0 && (
                <span className='cart-item-count'>
                    {itemCount}
                </span>
            )}
        </div>
    );
};

export default CartIconWithCount;
