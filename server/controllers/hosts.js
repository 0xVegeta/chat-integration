const Host = require("../models/hostModel");
const ChatRoom = require("../models/chatRoomModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const { generateToken } = require("../config/utility");

const createHost = async (req, res) => {
  try {
    const { name, email, password } = req.body;
		if (!email || !name || !password) {
			res.status(400).json({ errorMsg: "Please Enter all the fields" });
		}
		const host = new Host({ name, email, password });
		await host.save();

		return res.status(201).json(host);
    
  } catch (e) {
    return res.status(500).json({ errorMsg: `Error while creating host => ${e}` });
  }
};

const getAllHosts = async (req, res) => {
	try {
		const hosts = await Host.find();
		res.status(200).json({ hosts });
	} catch (error) {
		res.status(500).json({ error: `Error while fetching hosts, => ${error}` });
	}
};

const updateHost = async (req, res) => {
	try {
		const HostId = req.params.id;
		if (!HostId) {
			return res.status(400).json({ error: "Invalid board ID" });
		}

		const host = await Host.findByIdAndUpdate(
			HostId,

			{ new: true }
		);

		if (!host) {
			return res.status(404).json({ error: "host not found" });
		}
 
		return res.status(200).json({ ...host, token: generateToken(host._id) });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error updating the host" });
	}
};

const deleteHost = async (req, res) => {
	try {
		const HostId = req.params.id;

		// Check if the provided ID is valid (you can add more validation here)
		if (!HostId) {
			return res.status(400).json({ error: "Invalid host ID" });
		}

		const deletedHost = await Host.findByIdAndDelete(HostId);

		if (!deletedHost) {
			return res.status(404).json({ error: "Host not found" });
		}

		return res.status(200).json({ message: "Host deleted successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error deleting the Host" });
	}
};

const fetchHost = async (req, res) => {
	try {
		const hostId = req.params.id;
		const host = await Host.find({ _id: hostId });
		const chatRooms = await ChatRoom.find();

		if (!hostId) {
			return res.status(404).json({ error: "Invalid host ID" });
		}
		for (const chatRoom of chatRooms) {
			chatRoom.user = await User.findById(chatRoom.user);
		}
		return res.status(200).json({ host, chatRooms });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: `Error fetching the host, => ${error}` });
	}
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
		const host = await Host.findOne({ email });

		if (host && (await host.matchPassword(password))) {
			res.status(200);
			res.json({
				_id: host._id,
				email: host.email,
				name: host.name,
				token: generateToken(host._id),
			});
		} else {
			res.status(401).json({ errorMsg: "Invalid Email or Password" });
		}
    
  } catch (e) {
			res.status(500).json({ errorMsg: `Error while logging host, => ${e}` });
  }
};

module.exports = {
	createHost,
	getAllHosts,
	updateHost,
	deleteHost,
	fetchHost,
	login,
};
