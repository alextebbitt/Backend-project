User = require("../models/User");
Post = require("../models/Post");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, jwt_secret);
    const user = await User.findOne({ _id: payload._id, tokens: token });
    if (!user) {
      return res.status(401).send({ message: "No estas autorizado" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error, message: "Ha habido un problema con el token" });
  }
};
const isAdmin = async (req, res, next) => {
  const admins = ["admin", "superadmin"];
  if (!admins.includes(req.user.role)) {
    return res.status(403).send({
      message: "You do not have permission",
    });
  }
  next();
};
const isAuthor = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    if (post.userId !== req.user._id) {
      return res.status(403).send({ message: "This post is not yours" });
    }
    next();
  } catch (error) {
    console.error(error);

    return res.status(500).send({
      error,
      message: "There was a problem checking the author of this post",
    });
  }
};
module.exports = { authentication, isAdmin, isAuthor };
