const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    res.json(cart || { user: req.user.id, items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, size, qty } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [{ product: productId, size, qty }]
      });
    } else {
      const existing = cart.items.find(
        item => item.product.toString() === productId && item.size === size
      );

      if (existing) {
        existing.qty += qty;
      } else {
        cart.items.push({ product: productId, size, qty });
      }

      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { productId, size, qty } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.json({ message: "Cart empty" });

    const item = cart.items.find(
      item => item.product.toString() === productId && item.size === size
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.qty = qty;
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { productId, size } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.json({ message: "Cart empty" });

    cart.items = cart.items.filter(
      item => !(item.product.toString() === productId && item.size === size)
    );

    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
};
