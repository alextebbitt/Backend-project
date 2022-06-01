const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication, isAdmin } = require("../middleware/authentication");

router.post("/", UserController.create);
router.get("/", UserController.getAllUsers);
router.get("/id/:_id", UserController.getUserById);
router.get("/search/:name", UserController.getUsersByName);
router.delete("/id/:_id", authentication, isAdmin, UserController.delete);
router.put("/", authentication, UserController.update);
router.get("/confirm/:emailToken", UserController.confirm);
router.post("/login", UserController.login);
router.put("/logout", authentication, UserController.logout);

module.exports = router;
