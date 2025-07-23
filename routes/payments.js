const express = require('express');
const Razorpay = require('razorpay');
const axios = require('axios');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, name, email } = req.body;
    const options = {
      amount: amount * 100, 
      currency: currency || 'INR',
      receipt: `receipt_order_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
});

// Save payment info after success
router.post('/verify', async (req, res) => {
  try {
    const { orderId, paymentId, signature, amount, currency, email, name } = req.body;

    // 1. Verify signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(orderId + "|" + paymentId)
      .digest('hex');

    if (generated_signature !== signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // 2. Fetch payment status from Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    const payment = await razorpay.payments.fetch(paymentId);

    if (payment.status !== 'captured') {
      return res.status(400).json({ success: false, message: 'Payment not successful' });
    }

    // 3. Save payment as successful
    const paymentRecord = new Payment({ orderId, paymentId, amount, currency, status: 'success', email, name });
    await paymentRecord.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error verifying payment', error: err.message });
  }
});

// Get all payments (admin)
router.get('/history', async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching payments', error: err.message });
  }
});

// Set up a webhook endpoint
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers['x-razorpay-signature'];
  const body = req.body;

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(req.body)
    .digest('hex');

  if (signature === expectedSignature) {
    // Process the event (e.g., payment.captured, payment.failed)
    // Save/update payment status in your DB
    res.status(200).json({ status: 'ok' });
  } else {
    res.status(400).json({ status: 'invalid signature' });
  }
});

module.exports = router;
