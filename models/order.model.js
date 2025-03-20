module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("buy", "sell"),
      allowNull: false,
    },
    cryptocurrency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {  
      type: DataTypes.ENUM("pending", "completed", "canceled"),
      allowNull: false,
      defaultValue: "pending",
    },
  });

  return Order;
};
