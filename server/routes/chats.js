const express = require("express");

const { createChats, createChatRoom } = require("../controllers/chats");
const chatsRouter = express.Router();

chatsRouter.post("/create", createChats);
chatsRouter.post("/room", createChatRoom);
// chatsRouter userRouter.post('/')

module.exports = chatsRouter;
