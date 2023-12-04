import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";
import { v4 as uuid } from "uuid";

import { io } from "socket.io-client";
function ChatBlock ( { openChat } ) {
	const [history, setHistory] = useState();
	const [loading, setLoading] = useState( false );
	const [message, setMessage] = useState( "" );
	const [name, setName] = useState( null );
	const [email, setEmail] = useState( null );

	useEffect( () => {

	}, [] );

	const ENDPOINT = "http://localhost:5000";

	useEffect( () => {
		const newSocket = io( ENDPOINT );

		newSocket.emit( "setup", "yeaa" );
		newSocket.on( "connected", ( message ) => {
			console.log( message );
		} );


		return () => {
			newSocket.disconnect();

		};
	}, [ENDPOINT] );
	const getChatHistory = async () => {
		try {
			setLoading( true );

			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const body = {
				"name": "saket",
				"email": "saket@gmail.com",
				"sessionId": "2521c56-41d8-49b1-8be3-4cbdefcfbedd",
			};

			const { data } = await axios.post(
				"http://localhost:5000/users/log",
				body,
				config
			);
			console.log( "History", data.chats );
			setHistory( data.chats );
			setLoading( false );
		} catch ( error ) {
			console.log( error );
			setLoading( false );
		}
	};
	useEffect( () => {
		getChatHistory();

		return () => {
			setHistory( [] );
		};
	}, [] );

	const hostInfo = JSON.parse( localStorage.getItem( "hostInfo" ) );
	const sessionId = JSON.parse( localStorage.getItem( "sessionId" ) );

	const sendMessageHandler = async ( e ) => {
		e.preventDefault();

		if ( !name && !email ) {
			setName( message );
			return;
		}

		else if ( !email ) {
			setEmail( message );
			return;
		}
		try {
			const config = {
				"Content-Type": "application/json",
			};
			const body = { sessionId: sessionId, chatRoom: "656da188f7ef07743ccd7cb0", sender: "656d9e811a48e42a52ac64bb", message: message, isHost: false };
			const { data } = await axios.post( "http://localhost:5000/chats/create", body, config );
			console.log( data );
			setMessage( "" );
		} catch ( error ) {
			console.log( error );
		}
	};
	return (
		<div className=" h-[36rem] w-80 m-4 border bg-white rounded-md border-black shadow-lg z-20 bottom-0 fixed right-0 flex flex-col justify-between">
			<div className="p-3 border-b border-gray-300 flex justify-between text-sm">
				<div className="font-medium">Chat</div>
				<XMarkIcon
					className="h-4 w-4 m-1 cursor-pointer"
					onClick={() => openChat( false )}
				/>
			</div>
			<div className="grow overflow-y-auto">
				{name == null && email == null ? <ChatBubble key={uuid()} isSender={false} message={"Please enter your name"} time={Date.now()} sender={"Host"} /> : <></>}
				{name != null && email == null ? <ChatBubble key={uuid()} isSender={true} message={name} time={Date.now()} sender={"User"} /> : <></>}
				{name != null && email == null ? <ChatBubble key={uuid()} isSender={false} message={"Please enter your email"} time={Date.now()} sender={"Host"} /> : <></>}
				{name != null && email != null ? <ChatBubble key={uuid()} isSender={true} message={email} time={Date.now()} sender={"User"} /> : <></>}

				{/* {
					loading ? ( <div>Loading...</div> ) : ( history && history.map( item => <ChatBubble key={item._id} isSender={item.sender.type === "Host"} message={item.message} time={item.createdAt} sender={item.sender.type} /> ) )
				} */}

			</div>
			<div className="flex justify-between  border-t border-gray-300">
				<input
					type="text"
					className="grow py-1 px-3 text-sm focus:outline-none rounded-md outline-none border-none focus:border-none ring-0 focus:ring-0 "
					placeholder="Type a new message..."
					value={message}
					onChange={( e ) => setMessage( e.target.value )}
				/>
				<div className="flex justify-center flex-col p-3 cursor-pointer" onClick={sendMessageHandler}>
					<PaperAirplaneIcon className="h-5 w-5" />
				</div>
			</div>
		</div>
	);
}
export default ChatBlock;
