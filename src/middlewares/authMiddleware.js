// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
      return res.status(401).json({ message: 'Access Denied' });
   }

   try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified; // Menyimpan informasi user yang telah diverifikasi
      next();
   } catch (error) {
      return res.status(400).json({ message: 'Invalid Token' });
   }
};

module.exports = authMiddleware;
