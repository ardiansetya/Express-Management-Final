// src/api/items/controllers/itemsController.js
const prisma = require('../db');

const findAllItems = async () => {

      const items = await prisma.item.findMany();
      return items
   
};

const insertItem = async (newItemData) => {

      const itemData = await prisma.item.create({
         data: {
            name: newItemData.name,
            description: newItemData.description,
            price: newItemData.price,
            quantity: newItemData.quantity,
            categoryId : newItemData.categoryId,
            supplierId: newItemData.supplierId,
            createdBy: newItemData.createdBy
         },
      });
      return itemData
};

// repositories/itemRepository.js

// Mendapatkan semua item dengan stok rendah
const getLowStockItems = async () => {
   return prisma.item.findMany({
      where: { quantity: { lt: 5 } },
   });
};

// Mendapatkan semua item berdasarkan kategori
const getItemsByCategory = async (categoryId) => {
   return prisma.item.findMany({
      where: { categoryId: parseInt(categoryId) },
   });
};

// Mendapatkan ringkasan per kategori
const getCategorySummary = async () => {
   return prisma.item.groupBy({
      by: ['categoryId'],
      _sum: { price: true, quantity: true },
      _avg: { price: true },
      _count: { id: true },
   });
};

// Mendapatkan ringkasan per pemasok
const getSupplierSummary = async () => {
   return prisma.item.groupBy({
      by: ['supplierId'],
      _sum: { price: true, quantity: true },
      _avg: { price: true },
      _count: { id: true },
   });
};

// Mendapatkan ringkasan keseluruhan sistem
const getSystemSummary = async () => {
   const totalItems = await prisma.item.count();
   const totalCategories = await prisma.category.count();
   const totalSuppliers = await prisma.supplier.count();
   const totalStockValue = await prisma.item.aggregate({
      _sum: { price: true },
   });

   return {
      totalItems,
      totalCategories,
      totalSuppliers,
      totalStockValue: totalStockValue._sum.price,
   };
};


module.exports = {
   findAllItems,
   insertItem,
   getLowStockItems,
   getItemsByCategory,
   getCategorySummary,
   getSupplierSummary,
   getSystemSummary,
};