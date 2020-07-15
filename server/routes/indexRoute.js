const express = require("express");
const { check } = require("express-validator");
const checkToken = require("../middlewares/checkToken");
const indexController = require("../controllers/indexController");

const router = express.Router();

router.use(checkToken);

router.post(
  "/add_product",
  [
    check("title").not().isEmpty().withMessage("Title is required"),
    check("price").not().isEmpty().withMessage("Price is Require"),
  ],
  indexController.addProduct
);

router.put("/edit_product/:id", indexController.editProduct);

router.get("/get_products", indexController.getProducts);

module.exports = router;
