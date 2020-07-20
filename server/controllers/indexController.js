const HttpResponse = require("../models/http-response");
const productModel = require("../models/productModel");

const { validationResult } = require("express-validator");

//========add Product ===============================================================

const addProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpResponse("Invalid inputs passed, please check your data.", 422),
      console.log(errors)
    );
  }

  console.log(req.body);
  const { title, price, quantity, discount } = req.body;

  const createdProduct = new productModel({
    title,
    price,
    quantity,
    discount,
    userQuantity: 1,
  });

  try {
    const addProduct = await createdProduct.save();
    res.send({ addProduct: addProduct, success: true });
  } catch (err) {
    console.log(err);
    const error = new HttpResponse(err, 500);
    return res.status(500).json({ response: error });
  }
  res.status(201).json({
    title: createdProduct.title,
    price: createdProduct.price,
    quantity: createdProduct.quantity,
    discount: createdProduct.discount,
  });
};

// fetchMessages=====================================================================

const getProducts = async (req, res) => {
  try {
    const product = await productModel.find({}).sort({ createdAt: -1 });
    res.send({ product: product, success: true });
  } catch (error) {
    console.error(error);
    res.send({ success: false });
  }
};

// editProduct=====================================================================

const editProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(id, data);
    res.send({ success: "ture", updatedProduct: updatedProduct });
  } catch (error) {
    console.error(error);
    res.send({ success: false });
  }
};

exports.addProduct = addProduct;
exports.editProduct = editProduct;
exports.getProducts = getProducts;
