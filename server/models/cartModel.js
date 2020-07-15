const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    // cart  Information
    userId: { type: String },
    productId: { type: String, unique: true },
    userQuantity: { type: Number },
  },
  {
    timestamps: [{ createdAt: "created_at" }],
  }
);

cartSchema.plugin(uniqueValidator);

module.exports = mongoose.model("cartModel", cartSchema);
