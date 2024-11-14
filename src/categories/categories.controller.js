const express = require('express');
const prisma = require('../db');
const { createCategories, getAllCategories, getCategoriesById } = require('../categories/categories.services');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()


router.use(express.json())

router.post('/categories', authMiddleware ,  async (req, res) => {
   try {

      const newCategoriesData = req.body
      console.log(req.body)
      const Categories = await createCategories(newCategoriesData);

      res.status(201).send({

         data: Categories,
         message: 'Categories created successfully'

      });
   } catch (error) {
      res.status(400).send({ error });
   }
});

router.get('/categories', authMiddleware, async (req, res) => {
   try {
      const categories = await getAllCategories();
      res.status(200).send(categories);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

router.get('/category/:id', authMiddleware, async (req, res) => {
   const { id } = req.params;
   console.log(id)
   try {
      const categories = await getCategoriesById(id);
      res.status(200).send(categories);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});



module.exports = router