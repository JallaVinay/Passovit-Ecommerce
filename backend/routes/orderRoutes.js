const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { placeOrder, getOrderById, getMyOrders } = require('../controllers/orderController');

router.post('/', protect, placeOrder);       // Place an order (uses cart by default)
router.get('/mine', protect, getMyOrders);   // Get all orders for logged-in user
router.get('/:id', protect, getOrderById);   // Get single order (owner or admin)

module.exports = router;
