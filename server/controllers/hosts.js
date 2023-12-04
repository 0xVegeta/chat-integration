const Host = require("../models/hostModel");
const ChatRoom = require("../models/chatRoomModel");

const createHost = async (req, res) => {
	const { name, email, password } = req.body;
	if (!email || !name || !password) {
		res.status(400);
		throw new Error("Please Enter all the fields");
	}
	const host = new Host({ name, email, password });
	await host.save();

	return res.status(201).json(host);
};

const getAllHosts = async (req, res) => {
	try {
		const hosts = await Host.find();
		res.status(200).json({ hosts });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
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

		return res.status(200).json({ host });
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
		const { hostId } = req.params;
		const host = await Host.find({ _id: hostId });
		const chatRooms = await ChatRoom.find();

		if (!hostId) {
			return res.status(404).json({ error: "Invalid host ID" });
		}

		return res.status(200).json({ host, chatRooms });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error fetching the host" });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const host = await Host.findOne({ email });

	if (host && (await Host.matchPassword(password))) {
		res.status(200);
		res.json({
			email: host.email,
			name: host.name,
			token: generateToken(host._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid Email or Password");
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
