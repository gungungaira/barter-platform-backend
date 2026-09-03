const express = require("express");
const router = express.Router();
const authFindMatchMiddleware = require("../Middleware/findMatchMiddleware"); // reuse existing auth middleware
const { sendMessage, getConversation,getInbox } = require("../Controller/messageController");

router.post("/sendMessage", authFindMatchMiddleware, sendMessage);
router.get("/conversation/:friendId", authFindMatchMiddleware, getConversation);
router.get("/inbox", authFindMatchMiddleware, getInbox);

module.exports = router;