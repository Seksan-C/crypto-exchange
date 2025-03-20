const express = require('express');
const app = express();

const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const transactionRoutes = require('./routes/transactions');
const walletRoutes = require("./routes/wallet");

app.use(express.json());
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/transactions', transactionRoutes);
app.use("/wallet", walletRoutes);

module.exports = app;
