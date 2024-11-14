const prisma = require('../db');
const { findAllCategories, insertCategories, findCategoriesById } = require('./categories.repository');

// get Categories
const getAllCategories = async () => {
   return await findAllCategories();
};

// post Categories
const createCategories = async (newCategoriesData) => {
   const createCategories = await insertCategories(newCategoriesData);
   return createCategories
};

const getCategoriesById = async (id) => {
   const categoryId = await findCategoriesById(id);
   if (!categoryId) {
      return res.status(404).json({ message: 'Categories not found' });
   }
   return categoryId
}




module.exports = {
   createCategories,
   getAllCategories,
   getCategoriesById,
};
