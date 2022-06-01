const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    confirmed: Boolean,
    tokens: [],

  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
