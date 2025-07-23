import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import './Payment.css';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await api.get('/api/payments/history');
      setPayments(res.data);
    };
    fetchPayments();
  }, []);

  return (
    <div className="payment-history-container">
      <h2>Payment History</h2>
      <div className="payment-card-grid">
        {payments.length === 0 ? (
          <div className="no-payments">No payments found.</div>
        ) : (
          payments.map((p) => (
            <div className="payment-card" key={p._id}>
              <div className="payment-card-row">
                <span className="payment-label">Date:</span>
                <span>{new Date(p.createdAt).toLocaleString()}</span>
              </div>
              <div className="payment-card-row">
                <span className="payment-label">Name:</span>
                <span>{p.name}</span>
              </div>
              <div className="payment-card-row">
                <span className="payment-label">Email:</span>
                <span>{p.email}</span>
              </div>
              <div className="payment-card-row">
                <span className="payment-label">Order ID:</span>
                <span className="payment-id">{p.orderId}</span>
              </div>
              <div className="payment-card-row">
                <span className="payment-label">Payment ID:</span>
                <span className="payment-id">{p.paymentId}</span>
              </div>
              <div className="payment-card-row">
                <span className="payment-label">Amount:</span>
                <span>₹{p.amount}</span>
              </div>
              <div className={`payment-card-row payment-status ${p.status === 'success' ? 'success' : 'failed'}`}>
                <span className="payment-label">Status:</span>
                <span>{p.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
