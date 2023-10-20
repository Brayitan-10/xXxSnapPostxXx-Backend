const mongoose = require("mongoose");
require("dotenv").config();
const { URI_MONGO } = process.env;

module.exports = () => {
    mongoose.connect(
        URI_MONGO
    ).catch((e) => console.error("Error de conexión con el servidor de mongo", e));
};
