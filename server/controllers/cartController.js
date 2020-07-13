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
  const { id } = req.params;
  const data = req.body;
  try {
    await cartModel.findByIdAndUpdate(id, data);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.send({ success: false });
  }
};

exports.addProductToCart = addProductToCart;
exports.editProductToCart = editProductToCart;
exports.getProductsFromCart = getProductsFromCart;
