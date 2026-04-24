import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useChatStore } from "../store/chatStore";
import { createChat, sendMessage } from "./socketActions";
import { getMessages} from "../services/api";
import { getOtherUser } from "../utils/getOtherUser";
import { getChatId } from "../utils/getChatId";

const ChatWindow = () => {
    const setMessages = useChatStore(state => state.setMessages);

    const messages = useChatStore(state => state.messages);
    const currentUser = useChatStore(state => state.currentUser);
    const selectedUser = useChatStore(state => state.selectedUser);
    const chats = useChatStore(state => state.chats);
    const currentChatId = useChatStore(state => state.currentChatId);
    const clearMessages = useChatStore(state => state.clearMessages);

    const [text, setText] = useState("");
    
    const otherUser = selectedUser;

    const handleSendMessage = () => {
        if(!otherUser || !text.trim()) return;
        sendMessage(otherUser._id, text); //.emit - sender function from frontend
        setText("");
    }

    useEffect(() => {
        if(!otherUser) return;
        console.log("created chat with: ", otherUser)
        createChat(otherUser._id);
    }, [otherUser]);

    useEffect(() => {

       if(!currentChatId) return;
        
        clearMessages();

        console.log("current chat id  is: ", currentChatId);

        const fetchMessages = async() => {
            try{
                const res = await getMessages(currentChatId); //api call to backend
                const msgs = res.data
                setMessages(msgs); //state in store 
            }catch(error){
                console.log("Error fetching messages: ", error);
            }
        };

        fetchMessages();
    }, [currentChatId]);

    return (
    <div>
        {otherUser ? (
        <h2>Chatting with {otherUser.username}</h2>
        ) : (
        <p>Select a user</p>
        )}

        {/* messages UI */}
            <div className="flex flex-col gap-2">
                {messages.map((msg, index) => {
                    const isMe = msg.senderId?.toString() === currentUser?._id.toString();

                    return(
                        <div
                        key={index}
                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`p-2 rounded-lg max-w-xs ${
                                    isMe
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-300 text-black"
                                }`}
                            >
                            {msg.text}
                            <div className="text-xs opacity-70">
                                {new Date(msg.createdAt).toLocaleString()}
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>


        <div className="flex justify-between">
            
            <input
                type="text"
                placeholder="type a message here"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        
            <button onClick={handleSendMessage}>send</button>
            
        </div>
    </div>
    );
    }

export default ChatWindow;