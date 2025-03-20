const { Order, Wallet, Transaction, sequelize } = require("../models");

const OrderMatchingService = {
    async matchOrders() {
        const t = await sequelize.transaction();
        try {
            const buyOrders = await Order.findAll({ where: { type: 'buy', status: 'pending' }, order: [['price', 'DESC']] });
            const sellOrders = await Order.findAll({ where: { type: 'sell', status: 'pending' }, order: [['price', 'ASC']] });

            for (let buy of buyOrders) {
                for (let sell of sellOrders) {
                    if (buy.cryptocurrency === sell.cryptocurrency && buy.price >= sell.price) {
                        const tradeAmount = Math.min(buy.amount, sell.amount);
                        const tradePrice = sell.price;

                        // 🏦 หักเงินจาก Wallet ผู้ซื้อ
                        const buyerWallet = await Wallet.findOne({ where: { userId: buy.userId, currency: 'USD' } });
                        if (!buyerWallet || buyerWallet.balance < tradeAmount * tradePrice) continue;

                        buyerWallet.balance -= tradeAmount * tradePrice;
                        await buyerWallet.save({ transaction: t });

                        // 💰 เพิ่มเหรียญให้ Wallet ผู้ซื้อ
                        const buyerCryptoWallet = await Wallet.findOrCreate({
                            where: { userId: buy.userId, currency: buy.cryptocurrency },
                            defaults: { balance: 0 },
                            transaction: t
                        });

                        buyerCryptoWallet[0].balance += tradeAmount;
                        await buyerCryptoWallet[0].save({ transaction: t });

                        // 💵 เพิ่มเงินให้ Wallet ผู้ขาย
                        const sellerFiatWallet = await Wallet.findOrCreate({
                            where: { userId: sell.userId, currency: 'USD' },
                            defaults: { balance: 0 },
                            transaction: t
                        });

                        sellerFiatWallet[0].balance += tradeAmount * tradePrice;
                        await sellerFiatWallet[0].save({ transaction: t });

                        // 📝 บันทึก Transaction Log
                        await Transaction.create({
                            senderId: sell.userId,
                            receiverId: buy.userId,
                            amount: tradeAmount,
                            transactionType: "trade",
                            cryptocurrency: buy.cryptocurrency,
                            price: tradePrice
                        }, { transaction: t });

                        // ✅ อัปเดตสถานะ Order
                        buy.amount -= tradeAmount;
                        sell.amount -= tradeAmount;
                        if (buy.amount <= 0) buy.status = 'completed';
                        if (sell.amount <= 0) sell.status = 'completed';

                        await buy.save({ transaction: t });
                        await sell.save({ transaction: t });

                        // ❌ ถ้า Order ขายหมดแล้วให้หยุด
                        if (sell.amount <= 0) break;
                    }
                }
            }

            await t.commit();
            console.log("✅ Order Matching Completed!");
        } catch (error) {
            await t.rollback();
            console.error("❌ Order Matching Failed:", error);
        }
    }
};

module.exports = OrderMatchingService;
