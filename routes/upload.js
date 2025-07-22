const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    // Example: use req.body.type to determine folder
    let folder = 'Startup/others';
    if (req.body.type === 'blog') folder = 'Startup/blogs';
    if (req.body.type === 'project') folder = 'Startup/projects';
    if (req.body.type === 'team') folder = 'Startup/team';
    if (req.body.type === 'services') folder = 'Startup/services';
    if (req.body.type === 'testimonials') folder = 'Startup/testimonials';
    return {
      folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
      transformation: [{ width: 800, height: 800, crop: 'limit' }],
    };
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res) => {
  // req.file.path is the Cloudinary URL
  res.json({ url: req.file.path });
});

module.exports = router;