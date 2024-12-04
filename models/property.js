const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Buyer = require('./buyer');

const Property = sequelize.define('Property', {
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('available', 'sold'),
    defaultValue: 'available',
  },
});

Buyer.hasMany(Property, { foreignKey: 'buyerId' });
Property.belongsTo(Buyer, { foreignKey: 'buyerId' });

module.exports = Property;
