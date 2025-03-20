const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// ✅ โหลดโมเดลทั้งหมด
const User = require("./user.model")(sequelize, DataTypes);
const Wallet = require("./wallet.model")(sequelize, DataTypes);
const Order = require("./order.model")(sequelize, DataTypes);
const Transaction = require("./transaction.model")(sequelize, DataTypes);

// ✅ กำหนดความสัมพันธ์
User.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Wallet, { foreignKey: "userId" });
Wallet.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Transaction, { foreignKey: "userId", onDelete: "CASCADE" });
Transaction.belongsTo(User, { foreignKey: "userId" });
const db = { sequelize, Sequelize, User, Wallet, Order, Transaction };

module.exports = db;
