import { useState, useEffect, useRef } from "react";
import Avatar from "./Avatar";
import { useChatStore } from "../store/chatStore";
import { createChat, sendMessage } from "./socketActions";
import { getMessages} from "../services/api";
import { getOtherUser } from "../utils/getOtherUser";
import { getChatId } from "../utils/getChatId";

const ChatWindow = () => {
    const messagesEndRef = useRef(null);

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

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behaviour: "smooth"});
    },[messages]);

    return (
    <div className="flex flex-col h-screen">

  {/* HEADER */}
        <div className="p-4 border-b bg-white flex items-center gap-3">
            {otherUser ? (
            <div className="flex items-center gap-3">
                <Avatar name={otherUser.username} isOnline={true}/>

                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800">{otherUser.username.toUpperCase()} </h2>
                </div>
            </div>
            ) : (
            <p className="text-gray-500">Select a user</p>
            )}
        </div>

  {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            <div className="flex flex-col gap-2">
            {messages.map((msg, index) => {
                const isMe =
                msg.senderId?.toString() === currentUser?._id?.toString();

                return (
                <div
                    key={index}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                    <div
                    className={`px-3 py-2 rounded-lg max-w-xs break-words ${
                        isMe
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black border"
                    }`}
                    >
                    <p>{msg.text}</p>
                    <p className="text-[10px] opacity-70 mt-1 text-right">
                        {new Date(msg.createdAt).toLocaleString()}
                    </p>
                    </div>
                </div>
                );
            })}
            <div ref={messagesEndRef} />
            </div>
        </div>

  {/* INPUT BAR */}
        <div className="p-3 border-t bg-white flex gap-2">
            <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === "Enter") handleSendMessage();
            }}
            className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 text-sm"
            disabled={!text.trim()}
            >
            Send
            </button>
        </div>

</div>
    );
}

export default ChatWindow;