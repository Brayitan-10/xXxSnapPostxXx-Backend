const { Router } = require("express");
const router = Router();
const { signInHandler, signUpHandler } = require("../controllers/auth.controllers")

// Sign Up ===> Crear
router.post("/signup", signUpHandler)

// Sign In ===> Login
router.post("/signin", signInHandler)

module.exports = router;
