import ChatWindow from "../components/ChatWindow"
import Sidebar from "../components/Sidebar"

const ChatPage = () => {
    return(
        <div className="flex h-screen bg-gray-100">

            <div className="w-90 bg-white border-r border-gray-200">
                <Sidebar />
            </div>

            <div className="flex-1 bg-gray-50">
                <ChatWindow />
            </div>

        </div>
    )
}

export default ChatPage;

