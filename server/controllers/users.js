const User = require("../models/userModel");
const { v4: uuid } = require("uuid");

const logUser = async (req, res) => {

  const { name, email } = req.body;
  if (!email || !name) {
		res.status(400);
		throw new Error("Please Enter all the fields");
	}

  const userExists = await User.findOne({ email });
  if(userExists) return res.status(200).json(userExists)
	const user = new User({ name, email });
  await user.save();
  return res.status(201).json({user: user, sessiodId : uuid()});

};






module.exports = {
	logUser,
};