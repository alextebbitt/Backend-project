const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { authentication, isAdmin, isAuthor } = require("../middlewares/authentication");
const { uploadUserPostsImages } = require('../middlewares/multer');

router.post("/", authentication, uploadUserPostsImages.single('image'), PostController.create);
router.get("/", PostController.getAll);
router.get("/id/:_id", PostController.getById);
router.get("/search/:name", PostController.getPostsByName);
router.delete("/id/:_id", authentication, PostController.delete);
router.put("/:_id", authentication, uploadUserPostsImages.single('image'), isAdmin, isAuthor, PostController.update);
router.put("/comments/:_id", authentication, PostController.insertComment);
router.put("/likes/:_id", authentication, PostController.like);
router.put("/unlike/:_id", authentication, PostController.unLike);


module.exports = router;
