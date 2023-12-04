const express = require("express");
const { createChats,createChatRoom,fetchChatRoom} = require("../controllers/chats");
const chatsRouter = express.Router();

chatsRouter.post("/create", createChats);
chatsRouter.post("/room", createChatRoom);
chatsRouter.get("/room/:id", fetchChatRoom);

module.exports = chatsRouter;
