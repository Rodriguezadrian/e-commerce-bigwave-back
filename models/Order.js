const { customAlphabet } = require("nanoid");
const { Model, DataTypes } = require("sequelize");

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8);

class Order extends Model {
  static initModel(sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          defaultValue: () => nanoid(8),
        },
        status: {
          type: DataTypes.ENUM,
          values: ["pending", "shipped", "confirmed", "completed", "cancelled"],
          defaultValue: "pending",
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        products: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        totalAmount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Order",
      }
    );
    return Order;
  }
}

module.exports = Order;
