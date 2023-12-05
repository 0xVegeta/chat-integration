import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";
import { v4 as uuid } from "uuid";

import { io } from "socket.io-client";
var newSocket;
function ChatBlock({ openChat }) {
	const [history, setHistory] = useState();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [name, setName] = useState(null);
	const [email, setEmail] = useState(null);
	const [userDetails, setUserDetails] = useState();
	const [roomDetails, setRoomDetails] = useState();

	const ENDPOINT = "http://localhost:5000";
	const sessionId = sessionStorage.getItem("sessionId");

	const getChatHistory = async () => {
		try {
			setLoading(true);

			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const body = {
				name: name,
				email: email,
				sessionId: sessionId === "undefined" ? undefined : sessionId,
			};

			const { data } = await axios.post(
				"http://localhost:5000/users/log",
				body,
				config
			);
			console.log("History", data.chats);
			setHistory(data.chats);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};
	useEffect(() => {
		if (name && email) getChatHistory();

		return () => {
			setHistory([]);
		};
	}, [name, email]);

	const createRoom = async (userDetails) => {
		try {
			const config = {
				"Content-Type": "application/json",
			};
			console.log("first", userDetails);

			const { data } = await axios.post(
				"http://localhost:5000/chats/room",
				{
					userId: userDetails.user._id,
				},
				config
			);
			console.log("Room Details:", data);
			setRoomDetails(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		newSocket = io(ENDPOINT);

		newSocket.emit("setup", "yeaa");
		newSocket.on("connected", (message) => {
			console.log(message);
		});

		newSocket.on("message", (message) => {
			console.log("we got it", message);
			setHistory((prev) => [...prev, message]);
		});

		return () => {
			newSocket.disconnect();
		};
	}, []);

	const sendMessageHandler = async (e) => {
		e.preventDefault();

		if (!name && !email) {
			setName(message);
			setMessage("");
			return;
		} else if (!email) {
			setEmail(message);
			setMessage("");

			try {
				const config = {
					"Content-Type": "application/json",
				};
				const { data } = await axios.post(
					"http://localhost:5000/users/log",
					{
						name: name,
						email: message,
						sessionId: sessionId === "undefined" ? undefined : sessionId,
					},
					config
				);
				console.log("User Details: ", data);

				setUserDetails(data);

				if (!sessionId) createRoom(data);
				if (data) console.log("session ID: ", data.sessionId);
				if (data.sessionId) sessionStorage.setItem("sessionId", data.sessionId);
			} catch (error) {
				console.log(error);
			}

			return;
		}

		const RoomId = roomDetails ? roomDetails._id : userDetails.chatRoom._id;

		newSocket.emit("join", RoomId);

		try {
			const config = {
				"Content-Type": "application/json",
			};
			const body = {
				sessionId: sessionId,
				chatRoom: roomDetails ? roomDetails._id : RoomId,
				sender: userDetails.user._id,
				message: message,
				isHost: false,
			};
			const { data } = await axios.post(
				"http://localhost:5000/chats/create",
				body,
				config
			);
			newSocket.emit("message", data);
			console.log(data);
			setHistory([...history, data]);

			setMessage("");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className=" h-[36rem] w-80 m-4 border bg-white rounded-md border-black shadow-lg z-20 bottom-0 fixed right-0 flex flex-col justify-between">
			<div className="p-3 border-b border-gray-300 flex justify-between text-sm">
				<div className="font-medium">Chat</div>
				<XMarkIcon
					className="h-4 w-4 m-1 cursor-pointer"
					onClick={() => openChat(false)}
				/>
			</div>
			<div className="grow overflow-y-auto">
				{name == null && email == null ? (
					<ChatBubble
						key={uuid()}
						isSender={false}
						message={"Please enter your name"}
						time={Date.now()}
						sender={"Host"}
					/>
				) : (
					<></>
				)}
				{name != null && email == null ? (
					<>
						<ChatBubble
							key={uuid()}
							isSender={false}
							message={"Please enter your name"}
							time={Date.now()}
							sender={"Host"}
						/>
						<ChatBubble
							key={uuid()}
							isSender={true}
							message={name}
							time={Date.now()}
							sender={name}
						/>
					</>
				) : (
					<></>
				)}
				{name != null && email == null ? (
					<>
						<ChatBubble
							key={uuid()}
							isSender={false}
							message={"Please enter your email"}
							time={Date.now()}
							sender={"Host"}
						/>
					</>
				) : (
					<></>
				)}
				{name != null && email != null ? (
					<>
						<ChatBubble
							key={uuid()}
							isSender={false}
							message={"Please enter your name"}
							time={Date.now()}
							sender={"Host"}
						/>
						<ChatBubble
							key={uuid()}
							isSender={true}
							message={name}
							time={Date.now()}
							sender={name}
						/>
						<ChatBubble
							key={uuid()}
							isSender={false}
							message={"Please enter your email"}
							time={Date.now()}
							sender={"Host"}
						/>
						<ChatBubble
							key={uuid()}
							isSender={true}
							message={email}
							time={Date.now()}
							sender={name}
						/>
					</>
				) : (
					<></>
				)}

				{loading ? (
					<div>Loading...</div>
				) : (
					history &&
					history.map((item) => (
						<ChatBubble
							key={item._id}
							isSender={item.sender.type === "User"}
							message={item.message}
							time={item.createdAt}
							sender={item.sender.type === "User" ? name : "Host"}
						/>
					))
				)}
			</div>
			<div className="flex justify-between  border-t border-gray-300">
				<input
					type="text"
					className="grow py-1 px-3 text-sm focus:outline-none rounded-md outline-none border-none focus:border-none ring-0 focus:ring-0 "
					placeholder="Type a new message..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") sendMessageHandler(e);
					}}
				/>
				<div
					className="flex justify-center flex-col p-3 cursor-pointer"
					onClick={sendMessageHandler}
				>
					<PaperAirplaneIcon className="h-5 w-5" />
				</div>
			</div>
		</div>
	);
}
export default ChatBlock;
