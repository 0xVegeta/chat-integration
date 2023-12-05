const express = require("express");
const {protect} = require('../middlewares/authentication')
const { createHost, getAllHosts, fetchHost, login } = require("../controllers/hosts");
const hostRouter = express.Router();

hostRouter.route("/").post(createHost).get(getAllHosts);
hostRouter.get("/:id", protect, fetchHost)
hostRouter.post('/login', login)

	// .patch(hostControllers.updateHost)
	// .delete(hostControllers.deleteHost);

module.exports = hostRouter;
