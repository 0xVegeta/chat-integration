const ChatRoom = require("../models/chatRoomModel");
const Chat = require('../models/chatModel')

const createChats = async (req, res) => {
  const { sessionId, chatRoom, sender, message, isHost } = req.body;
  const chat = new Chat({ sessionId, chatRoom, sender: { id:sender, type : isHost ? "Host": "User"}, message })
  await chat.save()
  return res.status(200).json(chat)
}

const createChatRoom = async (req, res) => {
	const { userId } = req.body;
	const chatRoom = new ChatRoom({ user: userId, status: "idle" });
	await chatRoom.save();
	return res.status(201).json(chatRoom);
};

const fetchChatRoom = async (req, res) => {
  try {
		const chatRoomId = req.params.id;
    const chatRoom = await ChatRoom.find({ _id: chatRoomId });
    const chats = await Chat.find({chatRoom})
		if (!chatRoomId) {
			return res.status(404).json({ error: "Invalid chatRoom ID" });
		}
		return res.status(200).json({ chatRoom, chats });
  } catch (error) {
		console.error(error.stack);
		return res.status(500).json({ error: "Error fetching the chatRoom" });
	}
};

const fetchAllChatRooms = async (req, res) => {
	try {
		const chatRooms = await ChatRoom.find();
		return res.status(200).json({ chatRooms });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error fetching the chatRoom" });
	}
};

module.exports = { createChats, createChatRoom, fetchChatRoom, fetchAllChatRooms };
