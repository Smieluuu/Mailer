const express = require("express");
const router = express.Router();
const loginService = require("./service");

router.post("/api/adminLogin", loginService.adminLogin);
router.post("/api/userLogin", loginService.userLogin);

module.exports = router;
