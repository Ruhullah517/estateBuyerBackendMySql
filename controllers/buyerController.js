const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Buyer } = require('../models');
const { JWT_SECRET } = process.env;

// Register Buyer
const signupBuyer = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const buyer = await Buyer.create({ name, email, password: hashedPassword, phone });
        res.status(201).json({ message: 'Buyer registered successfully', buyer });
    } catch (error) {
        res.status(400).json({ message: 'Error registering buyer', error });
    }
};

// Login Buyer
const loginBuyer = async (req, res) => {
    try {
        const { email, password } = req.body;
        const buyer = await Buyer.findOne({ where: { email } });

        if (!buyer || !(await bcrypt.compare(password, buyer.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: buyer.id }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ message: 'Error logging in', error });
    }
};

// Get Buyer Profile
const getBuyerProfile = async (req, res) => {
    try {
        // Get the token from headers
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token missing or invalid' });
        }

        const token = authHeader.split(' ')[1];

        // Verify and decode the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Fetch buyer details using the decoded ID
        const buyer = await Buyer.findOne({ where: { id: decoded.id }, attributes: ['id', 'name', 'email', 'phone'] });

        if (!buyer) {
            return res.status(404).json({ message: 'Buyer not found' });
        }

        res.json(buyer);
        console.log("Decoded Token:", decoded);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
};


module.exports = { signupBuyer, loginBuyer, getBuyerProfile };
