import { useChatStore } from "../store/chatStore";
import { useNavigate } from "react-router-dom";
import ChatsList from "./ChatsList";
import ContactsList from "./ContactsList";

const Sidebar = () => {
    const currentUser = useChatStore(state => state.currentUser);
    const activeTab = useChatStore(state => state.activeTab);
    const setActiveTab = useChatStore(state => state.setActiveTab);


    // const handleSelectedUser = (user) => {
    //     setSelectedUser(user);
    //     Navigate(`/chatWindow/${user._id}`);
    // }

    

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h3 className="text-red-700">{currentUser?.username}</h3>
                    {/* <h5>online status of current user</h5> */}
                </div>
                <div>
                    <a href="/login">
                      <button>logout</button>
                    </a>
                </div>
            </div>


        <hr></hr>
            <div className="flex justify-between p-2">
                <button
                    onClick={() => setActiveTab("chats")}
                    className={activeTab === "chats" ? "font-bold" : ""}
                >
                    Chats
                </button>

                <button
                    onClick={() => setActiveTab("contacts")}
                    className={activeTab === "contacts" ? "font-bold" : ""}
                >
                    Contacts
                </button>
            </div>

        <hr></hr>
    
        {/* CONDITIONAL RENDERING OF LISTS */}
            <div className="flex-1 overflow-y-auto">
                {activeTab === "chats" ? (
                    <ChatsList />
                ) : (
                    <ContactsList />
                )}
            </div>
           
                
            
        </div>
    )
}

export default Sidebar;