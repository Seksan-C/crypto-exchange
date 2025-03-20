const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order.controller');
const OrderMatchingService = require('../services/orderMatching');

// 🔹 API สร้าง, ดึงข้อมูล, และลบ Order
router.post('/', OrderController.createOrder);
router.get('/', OrderController.getOrders);
router.delete('/:orderId', OrderController.deleteOrder);

// 🔹 API จับคู่ Order (Matching System)
router.post('/match', async (req, res) => {
  await OrderMatchingService.matchOrders();
  res.json({ message: 'Order Matching Processed' });
});

module.exports = router;
