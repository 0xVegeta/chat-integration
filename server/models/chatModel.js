const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
	{
		chatRoom: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ChatRoom",
			required: true,
		},
		sender: {
			id: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
			},
			type: {
				type: String,
				enum: ["User", "Host"],
				required: true,
			},
		},
		message: {
			type: String,
			required: true,
		},
		sessionId: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
