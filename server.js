const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { syncDB } = require('./models');
const buyerRoutes = require('./routes/buyerRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/buyer', buyerRoutes);
app.use('/api/buyer/property', propertyRoutes);
app.use('/api/buyer/wishlist', wishlistRoutes);
// Database Sync
syncDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
