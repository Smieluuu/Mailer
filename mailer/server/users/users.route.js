const express = require("express");
const router = express.Router();
const userService = require("./service");

router.post("/api/add/user", userService.addUser);
router.get("/api/get/users", userService.getUsers);
router.delete("/api/delete/user/:id", userService.deleteUser);

module.exports = router;
