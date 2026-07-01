// import express from 'express';
// import multer from 'multer';
// import cloudinary from '../config/cloudinary.js';
// import Product from '../models/Product.js';
// import { protect, adminOnly } from '../middleware/authMiddleware.js';

// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

// // Get all products
// router.get('/', async (req, res) => {
//   const products = await Product.find({});
//   res.json(products);
// });

// // Create product with image upload
// router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
//   try {
//     let imageUrl = '';
//     if (req.file) {
//       const result = await cloudinary.uploader.upload_stream(
//         { folder: 'solar_products' },
//         (error, result) => {
//           if (error) return res.status(500).json({ message: error.message });
//           imageUrl = result.secure_url;
//         }
//       );
//       result.end(req.file.buffer);
//     }

//     const { name, description, price, stock } = req.body;
//     const product = await Product.create({ 
//       name, description, price, stock, image: imageUrl 
//     });
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Delete product
// router.delete('/:id', protect, adminOnly, async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product) {
//     await product.deleteOne();
//     res.json({ message: 'Product removed' });
//   } else {
//     res.status(404).json({ message: 'Product not found' });
//   }
// });

// export default router;

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Product from '../models/Product.js'; // Ensure this model exists in your backend

const router = express.Router();

// 1. Configure Local Storage Engine for Uploaded Files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    // Automatically create the folder if it does not exist yet
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generates a unique name: timestamp-randomnumber.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File validation filter to restrict uploads to images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit per image
});


// 2. GET ALL PRODUCTS (Used by your Collections catalog page)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 3. MULTI-IMAGE UPLOAD & AUTOMATIC PRODUCT LISTING CREATION
// Handles the 'images' field sent from your AdminDashboard.jsx
router.post('/upload-multiple', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images were uploaded.' });
    }

    const uploadedProducts = [];
    
    // Normalize incoming single fields or arrays into true javascript arrays safely
    const names = Array.isArray(req.body.names) ? req.body.names : [req.body.names];
    const prices = Array.isArray(req.body.prices) ? req.body.prices : [req.body.prices];
    const descriptions = Array.isArray(req.body.descriptions) ? req.body.descriptions : [req.body.descriptions];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const imageUrl = `http://localhost:5000/uploads/${file.filename}`;

      const newProduct = await Product.create({
        name: names[i] || `Solar System ${Math.floor(100 + Math.random() * 900)}`,
        description: descriptions[i] || 'Premium monocrystalline cell transformation hardware system layout.',
        price: Number(prices[i]) || 750000, 
        image: imageUrl,
        images: [imageUrl]
      });

      uploadedProducts.push(newProduct);
    }

    res.status(201).json({
      success: true,
      message: `${req.files.length} product configurations published successfully!`,
      products: uploadedProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// 4. DELETE A PRODUCT (Used by the quick trashcan buttons in your catalog)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.id || req.params.id);
    if (!product) return res.status(404).json({ message: 'Product item not found.' });

    // Optional: Delete the physical file from the backend disk storage folder
    if (product.image) {
      const filename = product.image.split('/uploads/')[1];
      const filePath = path.join('uploads', filename || '');
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await product.deleteOne();
    res.json({ message: 'Listing destroyed completely.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
