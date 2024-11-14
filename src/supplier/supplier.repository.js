// src/api/suppliers/controllers/suppliersController.js
const prisma = require('../db');

const findAllSupplier = async () => {

   const suppliers = await prisma.supplier.findMany();
   return suppliers

};

// const getsupplierById = async (req, res) => {
//    try {
//       const { supplierId } = req.params;
//       const supplier = await prisma.supplier.findUnique({
//          where: { id: parseInt(supplierId) },
//       });
//       if (!supplier) {
//          return res.status(404).json({ message: 'supplier not found' });
//       }
//       res.json(supplier);
//    } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//    }
// };

const insertSupplier = async (newSupplierData) => {

   const supplierData = await prisma.supplier.create({
      data: {
         name: newSupplierData.name,
         contactInfo: newSupplierData.contactInfo,
         createdBy: newSupplierData.createdBy,
      },
   });
   return supplierData

};

module.exports = {
   findAllSupplier,
   insertSupplier,
};