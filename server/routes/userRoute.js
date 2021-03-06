const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/userController");

const router = express.Router();

router.post(
  "/signup",
  [
    check("userName").not().isEmpty(),
    check("email")
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

// =================================================================

module.exports = router;
