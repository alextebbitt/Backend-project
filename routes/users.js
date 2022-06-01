const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication } = require("../middleware/authentication");

router.post("/", UserController.create);
router.get("/", UserController.getAllUsers);
router.get("/id/:_id", UserController.getUserById);
router.get("/search/:name", UserController.getUsersByName);
router.delete("/id/:_id", UserController.delete);
router.put("/:_id", authentication, UserController.update);
router.get("/confirm/:emailToken", UserController.confirm);
router.post("/login", UserController.login);

module.exports = router;
