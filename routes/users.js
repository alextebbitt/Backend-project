const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication, isAdmin } = require("../middlewares/authentication");
const { uploadUserPostsImages } = require('../middlewares/multer');

router.post("/", uploadUserPostsImages.single('image'), UserController.create);
router.get("/", UserController.getAllUsers);
router.get("/id/:_id", UserController.getUserById);
router.get("/search/:name", UserController.getUsersByName);
router.delete("/id/:_id", authentication, isAdmin, UserController.delete);
router.put("/id/:_id", authentication, uploadUserPostsImages.single('image'), UserController.update);
router.get("/confirm/:emailToken", UserController.confirm);
router.post("/login", UserController.login);
router.delete("/logout", authentication, UserController.logout);
router.get("/getinfo", authentication, UserController.getInfo);
router.put("/follow/:_id", authentication, UserController.follow);
router.put("/unfollow/:_id", authentication, UserController.unFollow);

module.exports = router;
