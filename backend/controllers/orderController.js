const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');
const sendOrderEmail = require('../utils/sendEmail');

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { useCart = true, shippingAddress, items: bodyItems } = req.body;

    // Resolve items: prefer bodyItems, otherwise load from cart
    let items = [];
    if (bodyItems && Array.isArray(bodyItems) && bodyItems.length > 0) {
      items = bodyItems;
    } else if (useCart) {
      const cart = await Cart.findOne({ user: userId }).populate('items.product');
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      items = cart.items.map(i => ({
        product: i.product._id,
        name: i.product.name,
        size: i.size,
        qty: i.qty,
        price: i.product.price
      }));
    } else {
      return res.status(400).json({ message: "No items provided" });
    }

    // Validate stock for all items
    for (const it of items) {
      const product = await Product.findById(it.product);
      if (!product) return res.status(404).json({ message: `Product not found: ${it.name}` });
      if (product.stock < it.qty) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
    }

    // Calculate total price
    const totalPrice = items.reduce((sum, it) => sum + (it.qty * it.price), 0);

    // Create order document
    const order = await Order.create({
      user: userId,
      items,
      totalPrice,
      shippingAddress
    });

    // Send confirmation email (non-blocking). Log any error but do not fail the order.
    (async () => {
      try {
        const user = await User.findById(userId);
        if (user && user.email) {
          sendOrderEmail(order, user).catch(err => console.error("Email send error:", err));
        } else {
          console.warn("Email not sent: user or user.email missing for id", userId);
        }
      } catch (err) {
        console.error("Email preparation error:", err);
      }
    })();

    // Reduce stock (best-effort)
    for (const it of items) {
      await Product.findByIdAndUpdate(it.product, { $inc: { stock: -it.qty } });
    }

    // Clear cart
    await Cart.findOneAndDelete({ user: userId });

    // Respond with created order
    return res.status(201).json(order);
  } catch (err) {
    console.error("Order error:", err);
    return res.status(500).json({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Only owner or admin can view
    if (order.user._id.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    return res.json(order);
  } catch (err) {
    console.error("Get order error:", err);
    return res.status(500).json({ message: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    console.error("Get my orders error:", err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { placeOrder, getOrderById, getMyOrders };
