import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import AppContext from '../context/AppContex'
import "../styles/containers/Checkout.css"

const Checkout = () => {
    const {state, removeFromCart} = useContext(AppContext);
    const {cart} = state;

    const handleRemoveFromCart = (product, idex_item) => () => {
        removeFromCart(product, idex_item);
    }

    const handleSumTotal = () => {
        const reducer = (acucumulator, currentValue) => acucumulator + currentValue.price;
        const sum = cart.reduce(reducer, 0);
        return sum;
    }

    return (
        <div className="Checkout">
            <div className="Checkout-content">
                {cart.length > 0 ? <h3>Lista de Pedidos:</h3> : <h3>Sin pedidos...</h3>}
                {cart.map((item, idex_item) => (
                    <div className="Checkout-item">
                        <div className="Checkout-element">
                            <h4>{item.title}</h4>
                            <img src={item.image} alt={item.title} />
                            <span>${item.price}</span>
                        </div>
                        <button type='button'
                                onClick={handleRemoveFromCart(item, idex_item)}
                        >
                            <i className='fas fa-trash-alt' />
                        </button>
                    </div>
                ))}
            </div>
            {cart.length > 0 && (
                <div className="Checkout-sidebar">
                    <h3>{`Precio total: $${handleSumTotal()}`}</h3>
                    <Link to='/checkout/information'>
                        <button type='button'>Continuar pedido</button>
                    </Link>
                </div>
            )}

        </div>
    );
}

export default Checkout;