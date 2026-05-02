import UserRow from "./UserRow";
import { useEffect } from "react";

//fetch chats and show them here in the chats
import { getChatsList } from "../services/api";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import { getOtherUser } from "../utils/getOtherUser";

const  ChatsList = () => {
    const setChats = useChatStore(state => state.setChats);
    const setCurrentChatId = useChatStore(state => state.setCurrentChatId);
    const setSelectedUser = useChatStore(state => state.setSelectedUser);

    const chats = useChatStore(state => state.chats);
    const currentUser = useAuthStore(state => state.currentUser);
    const initialized = useAuthStore(state => state.initialized);

    useEffect(() => {
        if(!initialized || !currentUser) return;
        console.log("chatList mounted");

        const fetchChats = async() => {
        try{
            const res = await getChatsList();
            const chat = res.data;
            console.log(chat);
            setChats(chat);
        }catch(error){
            console.log("Error fetching chats", error);
        }
    }

    fetchChats();
    }, [currentUser, initialized]);

    if (!chats || !currentUser) {
        return <div>Loading chats...</div>;
    }

    console.log("chat isds are", chats.map(c => c._id));
    

    return(
        <div>
            {chats.map((chat) => {
                //get other user
                const otherUser = getOtherUser(chat, currentUser._id);

                return (
                    <UserRow
                      key={chat._id} //unique key per chat - chatid
                      user={otherUser} //show opposite user
                      lastMessage={chat.lastMessage}
                      onClick={() => {
                        setSelectedUser(otherUser);
                        console.log("opening chat:", chat._id); // debug log
                        setCurrentChatId(chat._id); //give the chat id
                      }}
                    />
                )
            })}
        </div>
    )
}

export default ChatsList;