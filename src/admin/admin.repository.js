// src/api/Admins/controllers/AdminsController.js
const prisma = require('../db');

const findAllAdmins = async () => {

   const admins = await prisma.admin.findMany();
   return admins

};

// const getAdminById = async (req, res) => {
//    try {
//       const { AdminId } = req.params;
//       const Admin = await prisma.Admin.findUnique({
//          where: { id: parseInt(AdminId) },
//       });
//       if (!Admin) {
//          return res.status(404).json({ message: 'Admin not found' });
//       }
//       res.json(Admin);
//    } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//    }
// };

const insertAdmin = async (newAdminData) => {

   const adminData = await prisma.admin.create({
      data: {
         username: newAdminData.username,
         email: newAdminData.email,
         password: newAdminData.password
      },
   });
   return adminData

};

module.exports = {
   findAllAdmins,
   insertAdmin,
};