import { useChatStore } from "../store/chatStore";
import Avatar from "./Avatar";
import ChatsList from "./ChatsList";
import ContactsList from "./ContactsList";

const Sidebar = () => {
    const currentUser = useChatStore(state => state.currentUser);
    const activeTab = useChatStore(state => state.activeTab);

    const setActiveTab = useChatStore(state => state.setActiveTab);

    return (
        <div className="fixed left-0 top-0 h-screen w-[300px] bg-white border-r flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">

                <div className="flex items-center gap-3">
                    <Avatar name={currentUser?.username} isOnline={true} />

                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-800">{currentUser?.username}</h3> 
                    </div>
                </div>

                <div>
                    <a href="/login">
                      <button className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                        logout
                      </button>
                    </a>
                </div>

            </div>


        <hr></hr>
            <div className="flex border-b">
                <button
                    onClick={() => setActiveTab("chats")}
                    className={`flex-1 py-2 text-sm ${
                        activeTab === "chats"
                        ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                        : "text-gray-500"
                    }`}
                    >
                    Chats
                </button>

                <button
                    onClick={() => setActiveTab("contacts")}
                    className={`flex-1 py-2 text-sm ${
                        activeTab === "contacts"
                        ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                        : "text-gray-500"
                    }`}
                    >
                    Contacts
                </button>
            </div>

        <hr></hr>
    
        {/* CONDITIONAL RENDERING OF LISTS */}
            <div className="flex-1 overflow-y-auto p-2 bg-gray-50">
                {activeTab === "chats" ? <ChatsList /> : <ContactsList />}
            </div>
        
        </div>
    )
}

export default Sidebar;