import express from 'express';
import Message from '../models/Message.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { product, name, phone, address, message } = req.body;
  const newMessage = await Message.create({
    user: req.user._id,
    product,
    name,
    phone,
    address,
    message
  });
  res.status(201).json(newMessage);
});

router.get('/', protect, adminOnly, async (req, res) => {
  const messages = await Message.find({}).populate('user', 'name email').populate('product', 'name');
  res.json(messages);
});

router.put('/:id/reply', protect, adminOnly, async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (message) {
    message.reply = req.body.reply;
    message.status = 'replied';
    await message.save();
    res.json(message);
  } else {
    res.status(404).json({ message: 'Message not found' });
  }
});

router.get('/my', protect, async (req, res) => {
  const messages = await Message.find({ user: req.user._id }).populate('product', 'name');
  res.json(messages);
});

router.get('/stats', protect, adminOnly, async (req, res) => {
  const totalUsers = await Message.distinct('user').countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalMessages = await Message.countDocuments();
  res.json({ totalUsers, totalProducts, totalMessages });
});

export default router;