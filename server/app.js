const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: `.env` });
const { connectDB } = require("./config/db");
const bodyParser = require('body-parser')
const apiRouters = require('./routes/api')
connectDB();
const app = express();
app.use(cors());
const server = http.createServer(app);
app.use(bodyParser.json());
// app.get('/hey', (req, res) => {
//   res.json({"message":"wow"})
// })
// console.log('check here', apiRouters);
app.use("/", apiRouters);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`
  ====================================================================

  
        Server running on
        port: ${PORT}


  ====================================================================
  `);
});






const io = require("socket.io")(server, {
	pingTimeout: 60000,
	cors: {
		origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
	},
});

io.on("connection", (socket) => {
	console.log("connected to socket.io");
	socket.on("setup", () => {
		socket.emit("connected");
	});


});
