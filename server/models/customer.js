"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsToMany(models.Book, {
        through: "Lending",
        foreignKey: "idCustomer",
        as: "Customers",
      });
    }
  }
  Customer.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      role: DataTypes.ENUM("Super", "Admin", "Customer"),
      image: DataTypes.STRING,
      credential: DataTypes.STRING,
      credentialExpAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Customer",
      paranoid: true,
    }
  );
  return Customer;
};
