import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import AppContext from '../context/AppContex'
import '../styles/containers/Payment.css'

const Payment = () => {
    const {state, addNewOrder} = useContext(AppContext);
    const {cart, buyer} = state;
    let history = useNavigate();

    const paypalOptions = {
        clientId: 'ATN4MgsCVKSXinkSTL1YqlANTikW5fXyo5C7TkyVUG7JB0DTr1G2aabkWFF9Uz6kKo61tL48cfWpomc4',
        intent: 'captura',
        currency: 'USD',
    }

    const buttonStyles = {
        layout: 'vertical',
        shape: 'rect',
    }
    

    const handleSumTotal = () => {
        const reducer = (acucumulator, currentValue) => acucumulator + currentValue.price;
        const sum = cart.reduce(reducer, 0);
        return sum;
    }

    const handlePaymentSuccess = (data) => {
        if ( data.status === 'COMPLETED' ) {
            const newOrder = {
                buyer,
                product: cart,
                payment: data
            }
            addNewOrder(newOrder);
            history('/checkout/success');
        }
    }

    return (
        <div className="Payment">
            <div className="Payment-content">
                <h3>Resumen del pedido:</h3>
                {cart.map((item) => (
                    <div key={item.title} className="Payment-item">
                        <div className="Payment-element">
                            <h4>{item.title}</h4>
                            <span>$ {item.price}</span>
                        </div>
                    </div>
                ))}
                <div className="Payment-buttom">
                    <PayPalButton 
                        paypalOptions={paypalOptions}
                        buttonStyles={buttonStyles}
                        amount={handleSumTotal}
                        onPaymentStart={() => console.log('Start Payment')}
                        onPaymentSuccess={data => handlePaymentSuccess(data)}
                        onPaymentError={error => console.log(error)}
                        onPaymentCancel={data => console.log(data)}
                    />
                </div>
            </div>
            <div className="Payment-sidebar">

            </div>
        </div>
    );
}

export default Payment;