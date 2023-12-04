const express = require("express");

const { createHost, getAllHosts, fetchHost } = require("../controllers/hosts");
const hostRouter = express.Router();

hostRouter.route("/").post(createHost).get(getAllHosts);
hostRouter.route("/:hostId").get(fetchHost)

	// .patch(hostControllers.updateHost)
	// .delete(hostControllers.deleteHost);

module.exports = hostRouter;
