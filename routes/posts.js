const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");

router.post("/", PostController.create);
router.get("/", PostController.getAll);
router.get("/id/:_id", PostController.getById);
router.get("/search/:name", PostController.getPostsByName);
router.delete("/id/:_id", PostController.delete);
router.put("/:_id", PostController.update);

module.exports = router;
