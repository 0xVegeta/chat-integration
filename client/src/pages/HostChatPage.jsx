import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { ChatState } from "../context/ChatProvider";

var newSocket;
function HostChatPage() {
	const ENDPOINT = "http://localhost:5000";
	// const [socket, setSocket] = useState(null);
	const [loading, setLoading] = useState(true);
	// const [hostDetail, setHostDetail] = useState();
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");

	const { selectedChat, setSelectedChat, host, setHost } = ChatState();
	const [chatDetails, setChatDetails] = useState();
	const [lastChat, setLastChat] = useState();
	const [currSessionId, setCurrSessionId] = useState();

	const handleLastChatChange = (newChat) => {
		setLastChat(newChat);
	};

	const handleHistoryChange = (newChatHistory) => {
		setMessages(() => newChatHistory);
	};

	const navigate = useNavigate();

	useEffect(() => {
		if (selectedChat) {
			newSocket = io(ENDPOINT);

			newSocket.emit("setup", "yeaa");
			newSocket.on("connected", (message) => {
				console.log(message);
			});

			newSocket.emit("join", selectedChat._id);

			newSocket.on("message", (message) => {
				console.log("we got a message", message);
				setMessages((prevMessages) => [...prevMessages, message]);
				setCurrSessionId(message.sessionId);
			});

			return () => {
				newSocket.disconnect();
			};
		}
	}, [selectedChat]);

	const getHostDetail = async (id, token) => {
		setLoading(true);

		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await axios.get(
				`http://127.0.0.1:5000/hosts/${id}`,
				config
			);
			console.log(data);
			setChatDetails(data);

			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		const hostInfo = JSON.parse(localStorage.getItem("hostInfo"));
		setHost(hostInfo);

		if (!hostInfo) {
			navigate("/signup");
		}
		getHostDetail(hostInfo._id, hostInfo.token);
	}, []);

	if (loading) return <span className="loading loading-ring loading-lg"></span>;

	const sendMessageHandler = async (e) => {
		e.preventDefault();
		try {
			const config = {
				"Content-Type": "application/json",
			};
			const body = {
				sessionId: currSessionId,
				chatRoom: selectedChat._id,
				sender: host._id,
				message: message,
				isHost: true,
			};
			const { data } = await axios.post(
				"http://localhost:5000/chats/create",
				body,
				config
			);
			console.log(data);
			newSocket.emit("message", data);
			setMessages([...messages, data]);
			setMessage("");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="w-screen h-screen flex">
			<div>{chatDetails && <Sidebar chatDetails={chatDetails} />}</div>
			<div className="w-4/5  flex flex-col">
				<Navbar />
				<div className="w-full h-full rounded-md bg-gray-100 m-4 p-6 flex flex-col justify-between overflow-auto">
					{!selectedChat ? (
						<h1 className="text-center">Select a chat to start messaging</h1>
					) : (
						<Chat
							messages={selectedChat}
							onLastChatChange={handleLastChatChange}
							onHistoryChange={handleHistoryChange}
							chatHistory={messages}
						/>
					)}
				</div>
				<div className="relative ml-4 mb-4">
					<input
						type="text"
						placeholder="Type a new message"
						className="input input-bordered w-full "
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") sendMessageHandler(e);
						}}
					/>
					<PaperAirplaneIcon
						className=" w-8 h-8 absolute top-1/2 right-4 transform -translate-y-1/2 border-box text-gray-400 pr-2"
						onClick={sendMessageHandler}
					/>
				</div>
			</div>
		</div>
	);
}

export default HostChatPage;
