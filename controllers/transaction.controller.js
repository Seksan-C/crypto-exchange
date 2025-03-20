const Transaction = require("../models").Transaction;

// ✅ Create Transaction
exports.createTransaction = async (req, res) => {
  try {
    const { type, amount, status, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const transaction = await Transaction.create({
      type,
      amount,
      status,
      userId,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTransactionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // รับ userId จาก URL

    const transactions = await Transaction.findAll({
      where: { userId }, // ค้นหาธุรกรรมของ userId
    });

    if (transactions.length === 0) {
      return res.status(404).json({ error: "No transactions found for this user" });
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
