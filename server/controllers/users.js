const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const ChatRoom = require("../models/chatRoomModel");
const { v4: uuid } = require("uuid");

const logUser = async (req, res) => {
  console.log(111);
  const { name, email, sessionId } = req.body;

	if (!email || !name) {
		res.status(400);
		throw new Error("Please Enter all the fields");
	}

  const userExists = await User.findOne({ email });
  console.log(113, userExists, typeof sessionId, sessionId);
  
  if (userExists) {
    const check = sessionId ? "1":"0"
    const chats = sessionId ? await Chat.find({ sessionId }) : []
    console.log(chats);
    let chatRoom
    if (!sessionId) {
      chatRoom = await ChatRoom.findOne({user: userExists._id});
    }

    return res.status(200).json({user: userExists, sessiondId: sessionId ? sessionId : uuid(), chats, chatRoom});
  }
  const user = new User({ name, email });
  await user.save();
  console.log('check here user', user);
	return res.status(201).json({ user: user, sessiondId: uuid() })

};

module.exports = {
	logUser,
};
