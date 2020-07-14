const express = require("express");

const cartController = require("../controllers/cartController");

const router = express.Router();

router.post("/add_cart", cartController.addProductToCart);

router.put("/edit_cart/:productId", cartController.editProductToCart);
router.delete("/delete_cart_product/:id", cartController.deleteProductToCart);

router.get("/get_cart", cartController.getProductsFromCart);

module.exports = router;
