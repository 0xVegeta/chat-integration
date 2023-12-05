import { ChatState } from "../context/ChatProvider";

function Sidebar({ chatDetails }) {
	const { selectedChat, setSelectedChat } = ChatState();

	const selectChatHandler = (chat) => {
		setSelectedChat(chat);
		console.log(chat);
	};

	if (chatDetails) {
		console.log("Rooms: ", chatDetails);
	}

	return (
		<div className="drawer lg:drawer-open w-1/5">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col items-center justify-center">
				{/* Page content here */}
				<label
					htmlFor="my-drawer-2"
					className="btn btn-primary drawer-button lg:hidden"
				>
					Open drawer
				</label>
			</div>
			<div className="drawer-side w-full">
				<label
					htmlFor="my-drawer-2"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<ul className="menu p-4 w-full min-h-full bg-base-200 text-base-content ">
					<div className="p-2 rounded-md border-2 border-gray-200 mb-2">
						<div className="pl-4 font-medium text-lg tracking-tight bg-gray-200 p-2">
							Chats
						</div>
						<ul className="menu bg-base-200 w-56 rounded-box">
							{!chatDetails ? (
								<div>Loading</div>
							) : (
								chatDetails.chatRooms
									.filter((chat) => chat.status == "idle")
									.map((chat) => (
										<li
											key={chat._id}
											className={`border border-gray-200 rounded-sm mb-1 ${
												chat == selectedChat
													? "bg-gray-800 text-white rounded-lg"
													: ""
											}`}
											onClick={() => selectChatHandler(chat)}
										>
											<a className="text-sm leading-8 font-medium capitalize ">
												{" "}
												{chat.user.name}
											</a>
										</li>
									))
							)}
						</ul>
					</div>
					<div className="p-2 rounded-md border-2 border-gray-200 mb-2">
						<div className="pl-4 font-medium text-lg tracking-tight bg-gray-200 p-2">
							My Chats
						</div>
						<ul className="menu bg-base-200 w-56 rounded-box">
							{!chatDetails ? (
								<div>Loading</div>
							) : (
								chatDetails.chatRooms
									.filter((chat) => chat.status !== "idle")
									.map((chat) => (
										<li
											key={chat._id}
											className={`border border-gray-200 rounded-sm mb-1 ${
												chat == selectedChat
													? "bg-gray-800 text-white rounded-lg"
													: ""
											}`}
											onClick={() => selectChatHandler(chat)}
										>
											<a>{chat.user.name}</a>
										</li>
									))
							)}
						</ul>
					</div>
				</ul>
			</div>
		</div>
	);
}
export default Sidebar;
