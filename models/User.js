const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "This email is not valid"],
      unique: true,
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    confirmed: Boolean,
    tokens: [],
    role: String,
    postIds: [{ type: ObjectId, ref: "Post" }],
    favourites: [{ type: ObjectId, ref: "Post" }]
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
