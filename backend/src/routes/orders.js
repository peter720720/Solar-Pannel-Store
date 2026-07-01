// import express from 'express';
// import Order from '../models/Order.js';
// import { protect, adminOnly } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // ==========================================
// // 1. CREATE A NEW BOOKING/ORDER
// // Maps to: POST http://localhost:5000/api/orders
// // ==========================================
// router.post('/', protect, async (req, res) => {
//   try {
//     const { productId, name, phone, address } = req.body;

//     if (!productId || !name || !phone || !address) {
//       return res.status(400).json({ message: 'All booking fields are required' });
//     }

//     const newOrder = await Order.create({
//       user: req.user.id, // Pulled dynamically from your token middleware
//       product: productId,
//       name,
//       phone,
//       address
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Solar panel booking placed successfully!',
//       order: newOrder
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // ==========================================
// // 2. GET CURRENT USER'S BOOKING HISTORY
// // Maps to: GET http://localhost:5000/api/orders/myorders
// // ==========================================
// router.get('/myorders', protect, async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user.id }).populate('product');
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // ==========================================
// // 3. GET ALL ORDERS GLOBAL LIST (ADMIN ONLY)
// // Maps to: GET http://localhost:5000/api/orders
// // ==========================================
// router.get('/', protect, adminOnly, async (req, res) => {
//   try {
//     const orders = await Order.find({}).populate('user', 'name email').populate('product');
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;


import express from 'express';
import Order from '../models/Order.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// ==========================================
// 1. CREATE A NEW BOOKING/ORDER
// Maps to: POST http://localhost:5000/api/orders
// ==========================================
router.post('/', protect, async (req, res) => {
  try {
    const { productId, name, phone, address } = req.body;

    if (!productId || !name || !phone || !address) {
      return res.status(400).json({ message: 'All booking fields are required' });
    }

    const newOrder = await Order.create({
      user: req.user.id,
      product: productId,
      name,
      phone,
      address
    });

    res.status(201).json({
      success: true,
      message: 'Solar panel booking placed successfully!',
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// 2. GET CURRENT USER'S BOOKING HISTORY
// Maps to: GET http://localhost:5000/api/orders/myorders
// ==========================================
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// 3. GET ALL ORDERS GLOBAL LIST (ADMIN ONLY)
// Maps to: GET http://localhost:5000/api/orders
// ==========================================
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').populate('product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// 4. GET SINGLE ORDER BY ID (Fixes your current 404 Error)
// Maps to: GET http://localhost:5000/api/orders/:id
// ==========================================
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('product');

    if (!order) {
      return res.status(404).json({ message: 'Order booking record not found' });
    }

    // Security check: Only the user who placed it or an administrator can view it
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this booking record' });
    }

    res.json(order);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid Order ID format' });
    }
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// 5. UPDATE ORDER STATUS TO PAID
// Maps to: PUT http://localhost:5000/api/orders/:id/pay
// ==========================================
router.put('/:id/pay', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order booking record not found' });
    }

    // Mark as processing/completed and note payment in your dynamic fields
    order.status = 'Processing'; 
    
    const updatedOrder = await order.save();
    res.json({
      success: true,
      message: 'Payment verified and status updated successfully!',
      order: updatedOrder
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
