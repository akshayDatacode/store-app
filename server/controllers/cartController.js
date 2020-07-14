const HttpResponse = require("../models/http-response");
const cartModel = require("../models/cartModel");

//========addProductToCart===============================================================

const addProductToCart = async (req, res) => {
  console.log(req.body);
  const { productId } = req.body;

  const createdCart = new cartModel({
    productId,
    userQuantity: 0,
  });

  try {
    await createdCart.save();
  } catch (err) {
    console.log(err);
    const error = new HttpResponse(err, 500);
    return res.status(500).json({ response: error });
  }
  res.status(201).json({
    productId: createdCart.productId,
    userQuantity: createdCart.userQuantity,
  });
};

// getProductsFromCart=====================================================================

const getProductsFromCart = async (req, res) => {
  try {
    const cart = await cartModel.find({}).sort({ createdAt: -1 });
    res.send({ cart: cart, success: true });
  } catch (error) {
    console.error(error);
    res.send({ success: false });
  }
};
// editProductToCart=====================================================================

const editProductToCart = async (req, res) => {
  console.log("BAcked Se AA Rha he Med", req.body.updateQuantity, req.params);

  const update = { userQuantity: req.body.updateQuantity };
  try {
    await cartModel.findOneAndUpdate(req.params, update);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.send({ success: false });
  }
};

// DeleteProductToCart=====================================================================

const deleteProductToCart = async (req, res) => {
  console.log("DELETE WALA", req.params);

  try {
    await cartModel.deleteOne({ productId: req.params.id });
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.send({ success: false });
  }
};

exports.addProductToCart = addProductToCart;
exports.editProductToCart = editProductToCart;
exports.getProductsFromCart = getProductsFromCart;
exports.deleteProductToCart = deleteProductToCart;
