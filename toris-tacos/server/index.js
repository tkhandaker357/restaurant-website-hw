require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const MenuItem = require('./models/MenuItem');
const Order = require('./models/Order');
const Cart = require('./models/Cart');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/toris_tacos';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Mongo connection error', err));

// API: get menu
app.get('/api/menu', async (req, res) => {
  try {
    const items = await MenuItem.find({}).sort({ name: 1 }).lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Could not load menu' });
  }
});

// Cart endpoints: identify client by clientId query or body
app.get('/api/cart', async (req, res) => {
  const clientId = req.query.clientId;
  if (!clientId) return res.status(400).json({ error: 'clientId required' });
  try {
    const cart = await Cart.findOne({ clientId }).lean();
    res.json(cart || { clientId, items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Could not load cart' });
  }
});

app.put('/api/cart', async (req, res) => {
  const { clientId, items } = req.body;
  if (!clientId) return res.status(400).json({ error: 'clientId required' });
  try {
    const updated = await Cart.findOneAndUpdate(
      { clientId },
      { clientId, items },
      { upsert: true, new: true }
    ).lean();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Could not save cart' });
  }
});

// Create an order (save to DB)
app.post('/api/orders', async (req, res) => {
  const { clientId, items, totalPrice } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must include items' });
  }
  try {
    const order = new Order({ clientId, items, totalPrice });
    await order.save();
    // clear cart after order
    await Cart.findOneAndDelete({ clientId });
    res.status(201).json({ success: true, orderId: order._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not create order' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Serve React build in production from parent folder's build
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  const buildPath = path.join(__dirname, '..', 'build');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}
