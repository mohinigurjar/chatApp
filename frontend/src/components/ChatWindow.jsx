import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useChatStore } from "../store/chatStore";
import { joinRoom, sendMessage } from "./socketActions";
import { getMessages, getUser } from "../services/api";

const ChatWindow = () => {
    const {userId} = useParams();
    const selectedUser = useChatStore(state => state.selectedUser);
    const setSelectedUser = useChatStore(state => state.setSelectedUser);
    const messages = useChatStore(state => state.messages);
    const currentUser = useChatStore(state => state.currentUser);
    const setMessages = useChatStore(state => state.setMessages);
    const currentRoomId = useChatStore(state => state.currentRoomId);
    const clearMessages = useChatStore(state => state.clearMessages);

    const [text, setText] = useState("");


    const handleSendMessage = () => {
        if(!selectedUser|| !text.trim()) return;
        sendMessage(selectedUser._id, text); //sender function from frontend
        setText("");
    }

    useEffect(() => {
        if(!userId) return;
        joinRoom(userId);
    }, [userId]);

    useEffect(() => {
        if(!userId) return;

        const fetchUser = async() => {
            const res = await getUser(userId);
            setSelectedUser(res.data.user);
        };
        fetchUser();
    }, [userId]);

    

    useEffect(() => {

       if(!currentRoomId) return;
        
        clearMessages();

        console.log("current room id  is: ", currentRoomId);

        const fetchMessages = async() => {
            try{
                const res = await getMessages(currentRoomId); //api call to backend
                const msgs = res.data
                setMessages(msgs); //state in store 
            }catch(error){
                console.log("Error fetching messages: ", error);
            }
        };

        fetchMessages();
    }, [currentRoomId]);

    return (
    <div>
        {selectedUser ? (
        <h2>Chatting with {selectedUser.username}</h2>
        ) : (
        <p>Select a user</p>
        )}

        {/* messages UI (we’ll improve later) */}
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
                            {msg.message}
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