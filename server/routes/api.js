const express = require("express");
const apiRouters = express.Router();
// apiRouters.get('', (req, res) => {
//   res.json({ message: "wow" });
// })
apiRouters.use("/hosts", require("./hosts"));
apiRouters.use("/chats", require("./chats"));
apiRouters.use('/users',require('./users'))

// apiRouters.use("/chat-rooms", require("./chatRooms"));


module.exports = apiRouters; 
