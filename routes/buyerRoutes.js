const express = require('express');
const { signupBuyer, loginBuyer,getBuyerProfile } = require('../controllers/buyerController');
const router = express.Router();

router.post('/signup', signupBuyer);
router.post('/login', loginBuyer);
router.get('/profile', getBuyerProfile);


module.exports = router;
