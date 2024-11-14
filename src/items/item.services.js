const prisma = require('../db');
const { findAllItems, insertItem, getItemsByCategory } = require('./item.repository');

// get item
const getItems = async () => {
   return await findAllItems();
};

// post item
const createItem = async (newItemData) => {
   const createItem = await insertItem(newItemData);
   return createItem
};

const getSummary = async () => {

   const products = await findAllItems();
   if (!products || products.length === 0) {
      console.error("Data produk kosong atau tidak ditemukan");
      return null;
   }

   const totalStock = products.reduce((sum, product) => sum + product.quantity, 0);
   const totalValue = products.reduce((sum, product) => sum + (parseFloat(product.price) * product.quantity), 0);
   const averagePrice = totalStock ? totalValue / totalStock : 0;

   return {
      totalStock,
      totalValue,
      averagePrice,
   };
};

// Mendapatkan item dengan stok rendah
const getLowStockItems = async () => {
   return itemRepository.getLowStockItems();
};

// Menampilkan item berdasarkan kategori
const getItemsCategory = async (categoryId) => {
   const items = await getItemsByCategory(categoryId);
   return items
};

// Menampilkan ringkasan per kategori
const getCategorySummary = async () => {
   return itemRepository.getCategorySummary();
};

// Menampilkan ringkasan per pemasok
const getSupplierSummary = async () => {
   return itemRepository.getSupplierSummary();
};

// Menampilkan ringkasan keseluruhan sistem
const getSystemSummary = async () => {
   return itemRepository.getSystemSummary();
};


module.exports = {
   createItem,
   getItems,
   getSummary,
   getLowStockItems,
   getItemsCategory,
   getCategorySummary,
   getSupplierSummary,
   getSystemSummary,
};
