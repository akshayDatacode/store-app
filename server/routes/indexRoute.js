const express = require("express");
const { check } = require("express-validator");
const indexController = require("../controllers/indexController");

const router = express.Router();

router.post(
  "/add_product",
  [
    check("title").not().isEmpty().withMessage("Title is required"),
    check("price").not().isEmpty().withMessage("Price is Require"),
  ],
  indexController.addProduct
);

module.exports = router;
