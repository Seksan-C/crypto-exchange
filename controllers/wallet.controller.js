const { Wallet } = require("../models");

// ✅ ดึงยอดคงเหลือ
exports.getBalance = async (req, res) => {
    try {
        const { userId } = req.body; // ✅ ดึง userId จาก req.body
        if (!userId) return res.status(400).json({ message: "userId is required" });

        const wallet = await Wallet.findOne({ where: { userId } });
        if (!wallet) return res.status(404).json({ message: "Wallet not found" });

        res.json({ balance: wallet.balance, currency: wallet.currency });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving balance" });
    }
};

// ✅ ฝากเงิน
exports.deposit = async (req, res) => {
    try {
        const { userId, amount, currency } = req.body;
        if (!userId) return res.status(400).json({ message: "userId is required" });

        const wallet = await Wallet.findOne({ where: { userId, currency } });
        if (!wallet) return res.status(404).json({ message: "Wallet not found" });

        wallet.balance += amount;
        await wallet.save();

        res.json({ message: "Deposit successful", balance: wallet.balance });
    } catch (error) {
        res.status(500).json({ message: "Deposit failed" });
    }
};

// ✅ ถอนเงิน
exports.withdraw = async (req, res) => {
    try {
        const { userId, amount, currency } = req.body;
        if (!userId) return res.status(400).json({ message: "userId is required" });

        const wallet = await Wallet.findOne({ where: { userId, currency } });
        if (!wallet || wallet.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        wallet.balance -= amount;
        await wallet.save();

        res.json({ message: "Withdraw successful", balance: wallet.balance });
    } catch (error) {
        res.status(500).json({ message: "Withdraw failed" });
    }
};
