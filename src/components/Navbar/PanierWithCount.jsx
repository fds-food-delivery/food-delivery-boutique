import {FaCartShopping} from "react-icons/fa6";
import React from "react";

const PanierWithCount = ({ itemCount, size }) => {
    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <a className=" text-3xl ml-3">
                Panier
            </a>
            {itemCount > 0 && (
                <span className='cart-item-count'>
                    {itemCount}
                </span>
            )}
        </div>
    );
};

export default PanierWithCount;
