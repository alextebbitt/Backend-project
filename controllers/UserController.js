const User = require("../models/User");
const Post = require("../models/Post");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;

const UserController = {
  async create(req, res, next) {
    try {
      if (req.file) req.body.image_path = req.file.filename;
      let hash = req.body.password ? req.body.password : null;
      if (req.body.password) {
        hash = bcrypt.hashSync(req.body.password, 10);
      }
      const user = await User.create({
        ...req.body,
        password: hash,
        confirmed: false,
        role: "user",
      });
      const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, {
        expiresIn: "48h",
      });

      // const url = "http://localhost:8787/users/confirm/" + emailToken;
      // await transporter.sendMail({
      //   to: req.body.email,
      //   subject: "Confirm your email",
      //   html: `<h3>Welcome! you are one step closer to registering </h3>
      // <a href="${url}"> Click para confirmar tu registro</a>`,
      // });
      res.status(201).send({
        message: "We have sent you an email to confirm your registration",
        user: {
          name: user.name,
          email: user.email,
          createdAt: user.createAt,
          updatedAt: user.updatedAt
        },
      });
    } catch (err) {
      err.origin = "User";
      next(err);
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.find().populate("followers", "name");

      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params._id);

      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },
  async getUsersByName(req, res) {
    try {
      if (req.params.name.length > 20) {
        return res.status(400).send("Search too long");
      }
      const name = new RegExp(req.params.name, "i");
      const user = await User.find({ name });
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params._id);
      res.send({ user, message: "User deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem trying to remove the user",
      });
    }
  },
  async update(req, res) {
    try {
      if (req.file) req.body.image_path = req.file.filename;
      const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
      });
      res.send({ message: "User successfully updated", user });
    } catch (error) {
      console.error(error);
    }
  },
  async login(req, res, next) {
    try {
      if (!req.body.password || !req.body.email) {
        return res.status(400).json({
          message: "Please enter all fields",
        });
      }

      const user = await User.findOne({
        email: req.body.email,
      });

      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (!isMatch) {
        return res.status(400).send({ message: "Password or name incorrect" });
      }

      if (!user.confirmed) {
        res.status(404).send({ msg: "Please confirm your email" });
      }
      const token = jwt.sign({ _id: user._id }, jwt_secret); //creo el token
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.send({ message: "Welcome " + user.name, token });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem logging in.",
      });
    }
  },
  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      const payload = jwt.verify(token, jwt_secret);
      const user = await User.findOneAndUpdate(
        {
          email: payload.email,
        },
        { confirmed: true },
        { new: true }
      );
      res.status(201).send("User confirmed");
    } catch (error) {
      console.error(error);
    }
  },
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problems with logging out",
      });
    }
  },
  async getInfo(req, res) {
    try {
      const user = await User.findById(req.user._id)
        .populate({
          path: "postIds",

          populate: {
            path: "comments.userId",
          },
        })
        .populate("followers", "name")
        .populate("following", "name");
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem",
      });
    }
  },
  async follow(req, res) {
    try {
      const existUser = await User.findById(req.params._id); // get id from params
      if (!existUser.followers.includes(req.user._id)) {
        // if the id of user is not already in followers
        const user = await User.findByIdAndUpdate(
          req.params._id,
          { $push: { followers: req.user._id } }, //push user on to following list
          { new: true } // update and show updat
        );
        await User.findByIdAndUpdate(
          req.user._id,
          { $push: { following: req.params._id } }, //push user on to following list
          { new: true } // update and show updat
        );
        res.send(user);
      } else {
        res.status(400).send({ message: "You already follow this person!" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem with following this person." });
    }
  },
  async unFollow(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params._id,
        { $pull: { followers: req.user._id } },
        { new: true }
      );
      res.send(user);
    } catch (error) {
      console.error(error);

      res
        .status(500)
        .send({ message: "There was a problem with your unfollow" });
    }
  },
};

module.exports = UserController;
