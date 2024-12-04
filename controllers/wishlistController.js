const { Wishlist, Property } = require('../models');

// Save a property to wishlist
const saveProperty = async (req, res) => {
    try {
      const { propertyId } = req.params;
  
      // Validate property exists
      const property = await Property.findByPk(propertyId);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      // Prevent duplicates in wishlist
      const existingWishlistItem = await Wishlist.findOne({
        where: { buyerId: req.user.id, propertyId },
      });
      if (existingWishlistItem) {
        return res.status(400).json({ message: 'Property already in wishlist' });
      }
  
      // Add property to wishlist
      const wishlistItem = await Wishlist.create({ buyerId: req.user.id, propertyId });
      res.status(201).json({ message: 'Property added to wishlist', wishlistItem });
    } catch (error) {
      res.status(500).json({ message: 'Error adding to wishlist', error });
    }
  };
  

// Get wishlist properties
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({
      where: { buyerId: req.user.id },
      include: { model: Property },
    });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
};

module.exports = { saveProperty, getWishlist };
