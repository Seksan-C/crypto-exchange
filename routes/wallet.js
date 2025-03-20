const express = require("express");
const router = express.Router();
const Walletcontroller = require("../controllers/wallet.controller");

router.get("/balance" , Walletcontroller.getBalance);
router.post("/deposit" , Walletcontroller.deposit);
router.post("/withdraw", Walletcontroller.withdraw);

module.exports = router;
