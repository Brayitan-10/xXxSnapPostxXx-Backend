require("dotenv").config();
const { PORT } = process.env;
const server = require("./src/app.js");
const conectionMongoDB = require("./src/dbMongoDb.js");
const { createAdmin, createRoles } = require("./src/libs/initialSetup.js");
/* ------------------------------------------- */

conectionMongoDB();
// crear roles
createRoles()
//crear usuarios
// createAdmin()

/* ------------------------------------------- */
server.listen(PORT, () => {
  console.log("Servidor levantado correctamente en el puerto ", PORT);
});
