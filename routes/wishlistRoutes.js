const express = require('express');
const { saveProperty, getWishlist } = require('../controllers/wishlistController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authenticate);

router.post('/:propertyId/save', saveProperty);
router.get('/', getWishlist);

module.exports = router;
