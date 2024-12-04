const express = require('express');
const {
  getBuyerProperties,
  addProperty,
  getProperty,
  deleteProperty,
} = require('../controllers/propertyController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authenticate);

router.get('/', getBuyerProperties);
router.post('/add', addProperty);
router.get('/:propertyId', getProperty);
router.delete('/:propertyId', deleteProperty);

module.exports = router;
