const jwt = require("jsonwebtoken");
const Host = require("../models/hostModel");

const protect = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];

			//decodes token id
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.host = await Host.findById(decoded.id).select("-password");

			next();
		} catch (error) {
			res.status(500).json({ errorMsg: "Not authorized, token failed" });
		}
	}

	if (!token) {
		res.status(401).json({ errorMsg: "Token not provided" });
	}
};

module.exports = { protect };
