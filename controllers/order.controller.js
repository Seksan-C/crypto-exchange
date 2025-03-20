const { Order, Wallet, sequelize } = require('../models');

// 🔹 สร้าง Order (Buy หรือ Sell)
exports.createOrder = async (req, res) => {
  const { userId, type, cryptocurrency, price, amount } = req.body;
  try {
    const order = await Order.create({ userId, type, cryptocurrency, price, amount });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 🔹 ดึง Order ทั้งหมด
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 ลบ Order 
exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findByPk(orderId);
    if (!order || order.status !== 'pending') {
      return res.status(400).json({ error: 'Cannot delete completed or non-existing order' });
    }
    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
