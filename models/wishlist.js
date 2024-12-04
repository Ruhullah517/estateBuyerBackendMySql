const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Buyer = require('./buyer');
const Property = require('./property');

const Wishlist = sequelize.define('Wishlist', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Buyer,
        key: 'id',
      },
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Property,
        key: 'id',
      },
    },
  });
  
  // Define Associations
  Buyer.belongsToMany(Property, { through: Wishlist, foreignKey: 'buyerId' });
  Property.belongsToMany(Buyer, { through: Wishlist, foreignKey: 'propertyId' });
  
  module.exports = Wishlist;
  