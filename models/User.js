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
    favourites: [{ type: ObjectId, ref: "Post" }],
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }],
    image_path: { type: String }
  },
  { timestamps: true }
);
UserSchema.methods.toJSON = function() {

const user = this._doc;

delete user.tokens;

delete user.password;

return user;
}
const User = mongoose.model("User", UserSchema);
module.exports = User;
