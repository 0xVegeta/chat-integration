const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const ChatRoom = require("../models/chatRoomModel");
const { v4: uuid } = require("uuid");

const logUser = async (req, res) => {
  try {
    const { name, email, sessionId } = req.body;

    if (!email || !name) {
      res.status(400).json({ errorMsg: "Please Enter all the fields" });
    }

    const userExists = await User.findOne({ email });
    
    if (userExists) {
      const chats = sessionId ? await Chat.find({ sessionId }) : []
      let chatRoom

      chatRoom = await ChatRoom.findOne({user: userExists._id});

      return res.status(200).json({user: userExists, sessionId: sessionId ? sessionId : uuid(), chats, chatRoom});
    }
    const user = new User({ name, email });
    await user.save();

    return res.status(201).json({ user: user, sessionId: uuid() })
    
  } catch (e) {
    return res.status(500).json({ errorMsg: `Error while logging user => ${e}`});
  }
};

module.exports = {
	logUser,
};
