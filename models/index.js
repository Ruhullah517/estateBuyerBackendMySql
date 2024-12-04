const Buyer = require('./buyer');
const Property = require('./property');
const Wishlist = require('./wishlist');
const { sequelize } = require('../config/database');

const syncDB = async () => {
    try {
        await sequelize.sync({ alter: true }); // Auto-create tables
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
};

module.exports = { Buyer, Property, Wishlist, syncDB };
