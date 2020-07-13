const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    // cart  Information
    userId: { type: String },
    productId: { type: String },
    userQuantity: { type: Number },
  },
  {
    timestamps: [{ createdAt: "created_at" }],
  }
);

module.exports = mongoose.model("cartModel", cartSchema);
