const { findAllAdmins, insertAdmin } = require('./admin.repository');

// get Admin
const getAdmin = async () => {
   return await findAllAdmins();
};

// post Admin
const createAdmin = async (newAdminData) => {
   const createAdmin = await insertAdmin(newAdminData);
   return createAdmin
};


module.exports = {
   createAdmin,
   getAdmin,
   // getAdminById,
};
