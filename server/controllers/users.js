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
    const chats = await Chat.find({ sessionId })
    return res.status(200).json({user: userExists,sessiodId: sessionId ? sessionId : uuid(), chats});
  }
	const user = new User({ name, email });
	await user.save();
	return res.status(201).json({ user: user, sessiondId: uuid() });
};

module.exports = {
	logUser,
};
