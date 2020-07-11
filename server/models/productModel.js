const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    // Product  Information
    title: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    discount: { type: Number },
    userQuantity: { type: Number },
  },
  {
    timestamps: [{ createdAt: "created_at" }],
  }
);

module.exports = mongoose.model("ProductModel", productSchema);
