// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL, // TODO: google decimal syntax
      allowNull: false,
      //TODO: VALIDATION - DECIMAL = TRUE
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //TODO: DEFAULT VALUE = 10
      //TODO: VALIDATION - VALUE = NUMERIC
    },
    category_id: {
      type: DataTypes.INTEGER,
      //TODO: reference category model's id
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
