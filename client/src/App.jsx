import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DemoPage from "./pages/DemoPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HostChatPage from "./pages/HostChatPage";
import ChatProvider from "./context/ChatProvider";
import AdminPage from "./pages/AdminPage";

function App() {
	return (
		<Router>
			<ChatProvider>
				<Routes>
					<Route path="/chat-embed" element={<DemoPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} /> 
					<Route path="/host" element={<HostChatPage />} />
					<Route path="/admin" element={<AdminPage />} />
				</Routes>
			</ChatProvider>
		</Router>
	);
}
export default App;
