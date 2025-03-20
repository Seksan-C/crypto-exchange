module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define("Wallet", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  });

  return Wallet;
};
