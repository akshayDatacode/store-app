const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // Sign up Information
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, minlength: 6 },
    userId: { type: String },
  },
  {
    timestamps: [{ createdAt: "created_at", updatedAt: "updated_at" }],
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
