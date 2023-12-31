const Role = require("../models/role");
const User = require("../models/user");
const bcrypt = require('bcrypt');

require("dotenv").config(); /*HABILITAMOS A USAR VARIABLES DE ENTORNO EN NUESTRO DOCUMENTO*/
const { ADMIN_FIRST_NAME, ADMIN_LAST_NAME, ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

const createRoles = async () => {
  try {
    //ya hay roles creados? ok-paro la ejecucion  :   logica para crear roles
    //Cuento documentos
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return "Roles sincronizados"; //puede ir el return solo
    //Creamos los valores por defecto
    const values = await Promise.all([
      new Role({ name: "admin" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "user" }).save(),
    ]);

    //const values = await Role.create([{name:"admin"},{ name: "moderator" },{ name: "user" }])

    console.log("Roles creados correctamente");
  } catch (error) {
    console.error(error);
  }
};

const createAdmin = async () => {
  //Verificar que no haya un admin existente en la db
  const userFound = await User.findOne({ email: ADMIN_EMAIL });
  //console.log("userFound", userFound);
  if (userFound) return;

  //busco los roles---
  const rolesFound = await Role.find({ name: { $in: ["admin", "moderator"] } }); // me va a devolver un array de roles [{_id:4sd7a896, name:admin, createdAt:},{name:moderator}]

  //creo el usuario
  const newUser = await User.create({
    firstName: ADMIN_FIRST_NAME,
    lastName: ADMIN_LAST_NAME,
    username: ADMIN_USERNAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    roles: rolesFound.map((role) => role._id), //[123123156as4d0,a4s15d5as6d4as]
  });

  // const salt = await bcrypt.genSalt(10);
  // newUser.password = await bcrypt.hash(ADMIN_PASSWORD, salt);

  console.log("new Admin created:", newUser.email);
};

module.exports = { createAdmin, createRoles };
