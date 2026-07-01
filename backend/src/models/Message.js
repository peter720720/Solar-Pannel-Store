import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  phone: String,
  address: String,
  message: String,
  reply: String,
  status: { type: String, default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);