import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import compnaylogo from "../public/compnaylogo.svg"

const RazorpayPayment = () => {
    const [amount, setAmount] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/');
        }
    }, [navigate]);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const displayRazorpay = async () => {
        const res = await loadRazorpay();

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }
        const formData = new URLSearchParams();
        formData.append('api_key', 'rzp_test_NXzv1Lax34llQA');
        formData.append('userid', '12345');
        formData.append('membership_id', '6');
        formData.append('order_amount', amount); 
        formData.append('order_remark', 'LifeTime Pro Plan');
        formData.append('payment_mode', 'razorpay');
        const createOrderResponse = await fetch('https://www.gr8masters.com/SaathStudioAPI/api/V2/placeUserOrderAndroid.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData,
        });
        
      
        const { order_id } = await createOrderResponse.json();

        const options = {
            key: "rzp_test_akPojIRzoH7wjG",
            amount: parseFloat(amount) * 100, // Convert to paise
            currency: 'INR',
            name: 'amit vaghela',
            description: 'Test Transaction',
            image: "compnaylogo",
            order_id: order_id,
            handler: function(response) {
                alert(`Payment ID: ${response.razorpay_payment_id}`);
                alert(`Order ID: ${response.razorpay_order_id}`);
                alert(`Signature: ${response.razorpay_signature}`);
                setPaymentStatus('Payment successful');
            },
            prefill: {
                name: 'amit',
                email: 'vaghelaamit973797@gmail.com',
                contact: ''
            },
            notes: {
                address: 'Razorpay Corporate Office'
            },
            theme: {
                color: '#3399cc'
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <div>
             <header className="App-header">
                    <h1>Welcome to RogerPay Integration</h1>
                </header>
            <h2>Make a Payment</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
            />
            <button onClick={displayRazorpay}>Pay</button>
            {paymentStatus && <p>{paymentStatus}</p>}
        </div>
    );
};

export default RazorpayPayment;
