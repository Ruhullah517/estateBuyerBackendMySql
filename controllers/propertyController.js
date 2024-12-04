const { Property } = require('../models');

// Get all properties added by a buyer
const getBuyerProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({ where: { buyerId: req.user.id } });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error });
  }
};

// Add a new property
const addProperty = async (req, res) => {
  try {
    const { title, description, price, location } = req.body;
    const property = await Property.create({
      buyerId: req.user.id,
      title,
      description,
      price,
      location,
    });
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: 'Error adding property', error });
  }
};

// Get a single property
const getProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const property = await Property.findOne({ where: { id: propertyId, buyerId: req.user.id } });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error });
  }
};

// Delete a property
const deleteProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const rowsDeleted = await Property.destroy({ where: { id: propertyId, buyerId: req.user.id } });
    if (rowsDeleted === 0) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error });
  }
};

module.exports = { getBuyerProperties, addProperty, getProperty, deleteProperty };
