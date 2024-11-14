// Import dependencies
const express = require('express');
const { createAdmin, getAdmin } = require('../admin/admin.services');
const authMiddleware = require('../middlewares/authMiddleware');

// Initialize router
const router = express.Router();
router.use(express.json()); // Middleware for JSON parsing



// POST /admin route to create a new admin
router.post('/admin', authMiddleware,  async (req, res) => {
   try {
      // Validate input data here (pseudo-code)
      // if (!isValid(req.body)) throw new Error('Invalid input data');

      const newAdminData = req.body;
      const admin = await createAdmin(newAdminData);

      res.status(201).send({
         data: admin,
         message: 'Admin created successfully',
      });
   } catch (error) {
      // Enhanced error handling with a clear message
      res.status(400).send({ error: error.message });
   }
});

// GET /admin route to fetch admin information
router.get('/admin', async (req, res) => {
   try {
      const admin = await getAdmin();
      if (!admin) {
         return res.status(404).json({ message: 'Admin not found' });
      }
      res.status(200).send({ data: admin });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

// Export the router for use in the main app
module.exports = router;
