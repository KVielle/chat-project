const express = require("express");
const { createChat, getUserChats, getChat } = require("../Controllers/chatController");

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", getUserChats);
router.get("/find/:firstId/:secondId", getChat);

module.exports = router;