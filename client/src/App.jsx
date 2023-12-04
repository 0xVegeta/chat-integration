import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DemoPage from "./pages/DemoPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HostChatPage from "./pages/HostChatPage";
import ChatProvider from "./context/ChatProvider";

function App() {
	return (
		<Router>
			<ChatProvider>
				<Routes>
					<Route path="/" element={<DemoPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/host" element={<HostChatPage />} />
				</Routes>
			</ChatProvider>
		</Router>
	);
}
export default App;
