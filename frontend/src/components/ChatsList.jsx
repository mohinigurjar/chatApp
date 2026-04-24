import UserRow from "./UserRow";
import { useEffect } from "react";

//fetch chats and show them here in the chats
import { getChatsList } from "../services/api";
import { useChatStore } from "../store/chatStore";
import { getOtherUser } from "../utils/getOtherUser";

const  ChatsList = () => {
    const setChats = useChatStore(state => state.setChats);
    const setCurrentChatId = useChatStore(state => state.setCurrentChatId);
    const setSelectedUser = useChatStore(state => state.setSelectedUser);

    const chats = useChatStore(state => state.chats);
    const currentUser = useChatStore(state => state.currentUser);

    useEffect(() => {
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
    }, [currentUser]);

    if (!chats || !currentUser) {
        return <div>Loading chats...</div>;
    }
    

    return(
        <div>
            {chats.map((chat) => {
                //get other user
                const otherUser = getOtherUser(chat, currentUser._id);

                return (
                    <UserRow
                      key={chat._id} //unique key per chat - chatid
                      user={otherUser} //show opposite user
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