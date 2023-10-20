const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const signUpHandler = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, roles } = req.body;

    // Bucar los roles del body en la DB
    const defaultRol = "user"; // <=========== A PRUEBA
    const rolesFound = await Role.find({ name: {$in: roles || defaultRol } });

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id)
    });

    //Encriptar la contraseña sin metodo estatico
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Guardo el usuario en la DB y genero una constante con el
    const savedUser = newUser.save();

    // Crar un Token   ("id del usuario(payload)", "nuestro secreto", "objeto con config")
    const token = jwt.sign(
      {id: savedUser._id},
      process.env.SECRET,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    //return res.status(200).json({ token,  });
    res.status(200).json(newUser)

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const signInHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Buscar si el mail/usuario existe
    const userFound = await User.findOne({ email: email }).populate("roles")
    if (!userFound) {res.status(400).end()}
    // Comparar contraseña
    const matchedPassword = await User.comparePassword(password, userFound.password);
    if(!matchedPassword) {res.status(400).end()}
    // Crear y Devolver token
    const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
      expiresIn : 86400, // 24 hours
    });

    //res.status(200).json({ token });
    res.status(200).end();
  } catch (error) {
    //console.log(error);
    res.status(400).end();
  }
};

module.exports = { signInHandler, signUpHandler };
