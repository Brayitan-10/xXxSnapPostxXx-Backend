const express = require("express");
const server = express();
server.name = "xXxSnapPostxXx";
const router = require("./routes/index.routes");
const cors = require("cors");
const bodyParser = require("body-parser");

// Configuraciones de express 
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
/* ------------ Midedleware para haceptar jsons-------------------*/
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
/* -------------------------------CORS---------------------------*/
server.use(cors());
// Conecta las rutas
server.use("/api", router);

// Conecto mongo...
require("./dbMongoDb");

module.exports = server;
