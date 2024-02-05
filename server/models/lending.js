"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Lending extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lending.belongsTo(models.Customer, {
        through: "Customer",
        foreignKey: "idCustomer",
        as: "Customers",
      });
      Lending.belongsTo(models.Book, {
        through: "Book",
        foreignKey: "idBook",
        as: "Books",
      });
    }
  }
  Lending.init(
    {
      idCustomer: DataTypes.INTEGER,
      idBook: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Lending",
      paranoid: true,
    }
  );
  return Lending;
};
