const express = require("express");
const router = express.Router();
const userService = require("./service/messages");

router.get("/api/messages/getMessages", userService.getMessages);
router.get("/api/messages/getMessagesRead", userService.getMessagesRead);
router.get("/api/messages/getMessagesUnread", userService.getMessagesUnread);
router.get(
  "/api/messages/getMessagesOutgoing",
  userService.getMessagesOutgoing
);
// TODO:
router.post("/api/messages/add", userService.addMessage);
// TODO:
router.delete("/api/messages/delete/:id", userService.deleteMessage);

module.exports = router;
