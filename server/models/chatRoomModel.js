const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema(
	{
		host: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Host",
				required: true,
			},
		],
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		status: {
			type: String,
			enum: ["busy", "idle"], //chat room is idle when no host has joined
			required: true,
		},
	},
	{ timestamps: true }
);

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
