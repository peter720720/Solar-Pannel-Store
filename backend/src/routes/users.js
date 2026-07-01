// import express from 'express';
// import User from '../models/User.js';
// import { protect, adminOnly } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // GET ALL USERS (ADMIN DASHBOARD STATS)
// // Maps to: GET http://localhost:5000/api/users
// router.get('/', protect, adminOnly, async (req, res) => {
//   try {
//     // Fetches all registered users, excluding passwords for security
//     const users = await User.find({ role: 'user' }).select('-password');
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;


import express from 'express';
import User from '../models/User.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// ==========================================
// 1. GET ALL USERS (ADMIN DASHBOARD STATS)
// Maps to: GET http://localhost:5000/api/users
// ==========================================
router.get('/', async (req, res) => {
  try {
    // Finds all users in the database and returns their details
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    
    // Explicitly send back a clean JSON array
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// 2. GET CURRENT LOGGED-IN PROFILE DATA
// Maps to: GET http://localhost:5000/api/users/profile
// ==========================================
router.get('/profile', protect, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// 3. GET SINGLE USER PROFILE BY ID 
// Maps to: GET http://localhost:5000/api/users/:id
// ==========================================
router.get('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    if (error.kind === 'ObjectId') return res.status(400).json({ message: 'Invalid User ID format' });
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// 4. UPDATE USER PROFILE BY ID (Fixes your current 404 Error)
// Maps to: PUT http://localhost:5000/api/users/:id
// ==========================================
router.put('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Allow updating name and email fields safely
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Optional: Allow password updates securely if passed in body
    if (req.body.password) {
      const bcrypt = await import('bcryptjs');
      user.password = await bcrypt.default.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();
    res.json({
      success: true,
      message: 'User profile updated successfully!',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// 5. DELETE USER BY ID
// Maps to: DELETE http://localhost:5000/api/users/:id
// ==========================================
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();
    res.json({ success: true, message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
