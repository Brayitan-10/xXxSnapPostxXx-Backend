const jwt = require("jsonwebtoken");
const User = require("../models/user");
//const Role = require("../models/role");

const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"]
  if (!token) { res.status(400).end() }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id //PAYLOAD CON EL QUE FIRMO
    const user = await User.findById(req.userId)
    if(!user) { res.status(400).end() }

    next();
  } catch (error) {
    //console.log(error);
    res.status(401).end()
  }
};

module.exports = { verifyToken }
