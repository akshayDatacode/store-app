const express = require("express");
const checkToken = require("../middlewares/checkToken");
const cartController = require("../controllers/cartController");

const router = express.Router();
router.use(checkToken);

router.post("/add_cart", cartController.addProductToCart);

router.put("/edit_cart/:id", cartController.editProductToCart);
router.delete("/delete_cart_product/:id", cartController.deleteProductToCart);

router.get("/get_cart", cartController.getProductsFromCart);

module.exports = router;
