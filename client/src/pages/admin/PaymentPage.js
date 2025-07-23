import React, { useState } from 'react';
import api from '../../utils/api';
import './Payment.css';

const PaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Create order on backend
      const res = await api.post('/api/payments/create-order', { amount, name, email });
      const { orderId, amount: orderAmount, currency, key } = res.data;

      // 2. Open Razorpay checkout
      const options = {
        key,
        amount: orderAmount,
        currency,
        name: 'Your Company',
        description: 'Admin Payment',
        order_id: orderId,
        handler: async function (response) {
          // Send all details to backend for verification
          const verifyRes = await api.post('/api/payments/verify', {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount / 100,
            currency,
            email,
            name
          });
          if (verifyRes.data.success) {
            alert('Payment successful!');
          } else {
            alert('Payment verification failed!');
          }
        },
        prefill: { name, email },
        modal: {
          ondismiss: function () {
            alert('Payment cancelled by user.');
            // Optionally, you can log or handle cancellation here
          }
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Payment failed: ' + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  return (
    <div className="payment-container">
      <h2>Make a Payment</h2>
      <form className="payment-form" onSubmit={handlePayment}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="number" placeholder="Amount (INR)" value={amount} onChange={e => setAmount(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Pay Now'}</button>
      </form>
    </div>
  );
};

export default PaymentPage;
