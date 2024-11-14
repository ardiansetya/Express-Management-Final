// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../db'); // Atau database Anda

// Register
const register = async (req, res) => {
   const { username, password, email } = req.body;

   try {
      // Cek jika pengguna sudah ada
      const existingUser = await prisma.admin.findUnique({ where: { email } });
      if (existingUser) {
         return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Simpan pengguna baru
      const user = await prisma.admin.create({
         data: {
            username,
            password: hashedPassword,
            email,
         },
      });

      // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      //    expiresIn: '1h',
      // });

      res.status(201).json({message:'User registered successfully'});
   } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
   }
};

// Login
const login = async (req, res) => {
   const { email, password } = req.body;

   try {
      // Cek apakah user ada
      const user = await prisma.admin.findUnique({ where: { email } });
      if (!user) {
         return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Verifikasi password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
         expiresIn: '1h',
      });

      res.json({ token, user: { id: user.id, username: user.username } });
   } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
   }
};

module.exports = { register, login };
