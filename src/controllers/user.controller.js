const User = require("../models/user");
const Role = require("../models/role");

const createUser = async (req, res) => {
  try {
      // Logica para crear un usuario
      const { firstName, lastName, username, email, password, roles } = req.body;

      // Bucar los roles del body en la DB
      const defaultRol = "user"; // <=========== A PRUEBA
      const rolesFound = await Role.find({ name: {$in: roles || defaultRol } }); // || "user"

      // Crear la instancia de el usuario
      const user = new User({ 
        firstName: firstName,
        lastName: lastName,
        username: username, 
        email: email, 
        password: password, 
        roles: rolesFound.map((role) => role._id)
      });

      // Encriptar la contraseña sin metodo estatico
      //const salt = await bcrypt.genSalt(10);
      //user.password = await bcrypt.hash(password, salt);

      // Encriptar la contraseña con metodo estatico
      user.password = await User.encryptPassword(password);

      // Guardar usuario en la DB
      const newUser = await user.save();

      res.status(200).json({
        // _id: newUser._id,
        username: newUser.username,
        mail: newUser.email,
        roles: newUser.roles,
      });
  } catch (error) {
      console.error(error);
      res.status(400).end();
  }
};

module.exports = { createUser };
