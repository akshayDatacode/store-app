const express = require("express");

const cartController = require("../controllers/cartController");

const router = express.Router();

router.post("/add_cart", cartController.addProductToCart);

router.put("/edit_cart/:id", cartController.editProductToCart);

router.get("/get_cart", cartController.getProductsFromCart);

module.exports = router;
