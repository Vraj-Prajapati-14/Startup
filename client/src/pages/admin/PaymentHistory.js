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
    <div>
      <h2>Payment History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Order ID</th>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td>{new Date(p.createdAt).toLocaleString()}</td>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{p.orderId}</td>
              <td>{p.paymentId}</td>
              <td>{p.amount}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
