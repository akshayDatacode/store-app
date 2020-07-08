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
  const { title, price, size, discount } = req.body;

  const createdProduct = new productModel({
    title,
    price,
    size,
    discount,
  });

  try {
    await createdProduct.save();
  } catch (err) {
    console.log(err);
    const error = new HttpResponse(err, 500);
    return res.status(500).json({ response: error });
  }
  res.status(201).json({
    title: createdProduct.title,
    price: createdProduct.price,
    size: createdProduct.size,
    discount: createdProduct.discount,
  });
};

exports.addProduct = addProduct;
