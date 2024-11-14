// src/api/categories/controllers/categoriesController.js
const prisma = require('../db');

const findAllCategories = async () => {

      const categories = await prisma.category.findMany();
      return categories
   
};

// const getCategoriesById = async (req, res) => {
//    try {
//       const { CategoriesId } = req.params;
//       const Categories = await prisma.Categories.findUnique({
//          where: { id: parseInt(CategoriesId) },
//       });
//       if (!Categories) {
//          return res.status(404).json({ message: 'Categories not found' });
//       }
//       res.json(Categories);
//    } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//    }
// };

const insertCategories = async (newCategoriesData) => {

      const categoriesData = await prisma.category.create({
         data: {
            name: newCategoriesData.name,
            description: newCategoriesData.description,
            createdBy: newCategoriesData.createdBy
         },
      });
      return categoriesData
   
};

const findCategoriesById = async (id) => {

      const categories = await prisma.category.findUnique({
         where: { id: parseInt(id) },
      });
     
      return categories;
  
};

module.exports = {
   findAllCategories,
   insertCategories,
   findCategoriesById
};