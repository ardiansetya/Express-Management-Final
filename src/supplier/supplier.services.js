const prisma = require('../db');
const { findAllSupplier, insertSupplier } = require('./supplier.repository');

// get Supplier
const getAllSuplliers = async () => {
   return await findAllSupplier();
};

// post Supplier
const createSupplier = async (newSupplierData) => {
   const createSupplier = await insertSupplier(newSupplierData);
   return createSupplier
};




module.exports = {
   createSupplier,
   getAllSuplliers,
   // getSupplierById,
};
