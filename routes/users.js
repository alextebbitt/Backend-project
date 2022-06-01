const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/", UserController.create);
router.get("/", UserController.getAllUsers);
router.get("/id/:_id", UserController.getUserById);
router.get("/search/:name", UserController.getUsersByName);
router.delete("/id/:_id", UserController.delete);
router.put("/:_id", UserController.update);
router.post("/login", UserController.login);
router.get("/confirm/:email", UserController.confirm);

module.exports = router;
