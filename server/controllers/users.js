const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const { v4: uuid } = require("uuid");

const logUser = async (req, res) => {
  const { name, email, sessionId } = req.body;
	if (!email || !name) {
		res.status(400);
		throw new Error("Please Enter all the fields");
	}

	const userExists = await User.findOne({ email });
  if (userExists) {
    const chats = sessionId ? await Chat.find({ sessionId }) : []
    let lastMessage
    if (!sessionId) {
      lastMessage = await Chat.findOne({ sender: { id: sender, type: "User" } })
    }
    return res.status(200).json({user: userExists, sessiondId: sessionId ? sessionId : uuid(), chats, chatRoom: lastMessage.chatRoom});
  }
	const user = new User({ name, email });
	await user.save();
	return res.status(201).json({ user: user, sessiondId: uuid() });
};

module.exports = {
	logUser,
};
