const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");

router.post("/", transactionController.createTransaction);  // ✅ Create Transaction
router.get("/", transactionController.getTransactions);  // ✅ Get All Transactions
router.get("/:id", transactionController.getTransactionById);  // ✅ Get Transaction by ID
router.get("/user/:userId", transactionController.getTransactionsByUserId);

module.exports = router;
