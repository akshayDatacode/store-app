const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    // Product  Information
    title: { type: String },
    price: { type: Number },
    size: { type: Number },
    discount: { type: Number },
  },
  {
    timestamps: [{ createdAt: "created_at" }],
  }
);

module.exports = mongoose.model("ProductModel", productSchema);
