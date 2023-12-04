import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import ChatBlock from "../components/ChatBlock";
import { useState } from "react";
function DemoPage() {
	const [showChatBlock, setShowChatBlock] = useState(false);

	
	return (
		<div className="w-screen h-screen">
			{!showChatBlock && (
				<div
					className="flex flex-col justify-center border fixed bottom-0 right-0 p-3 py-2 border-0.5 border-black z-10 m-4 shadow-lg cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-sm"
					onClick={() => setShowChatBlock(true)}
				>
					<ChatBubbleBottomCenterTextIcon className="w-8 h-8 " />
				</div>
			)}
			{showChatBlock && <ChatBlock openChat={setShowChatBlock} />}
		</div>
	);
}
export default DemoPage;
