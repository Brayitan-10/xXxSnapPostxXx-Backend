const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  { timestamps: true }
);

usersSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Cantidad de rondas que va a dar el encriptado
  //const passwordHasheada = await bcrypt.hash(password, salt)
  return await bcrypt.hash(password, salt) // Lo que encripto
};

usersSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

const User = mongoose.model("User", usersSchema);

module.exports = User;
