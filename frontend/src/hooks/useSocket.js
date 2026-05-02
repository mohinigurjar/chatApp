import { getUserProfile, getUsersByIds } from "../services/api";
import { socket } from "../socket"
import { useEffect } from "react";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore"

export const useSocket = () => {
    const  currentUser = useAuthStore(state => state.currentUser);
    const  initialized = useAuthStore(state => state.initialized);
    const  currentChatId = useChatStore(state => state.currentChatId);
    // const  setCurrentUser  = useChatStore(state => state.setCurrentUser);
    const  setOnlineUsersList  = useChatStore(state => state.setOnlineUsersList);
    const  setCurrentChatId = useChatStore(state => state.setCurrentChatId);

    useEffect(() => {
        if(!currentUser || !initialized){
            socket.disconnect();
            // setCurrentUser(null);
            setOnlineUsersList([]);
            return;
        }
        socket.connect();

        socket.off("online_users");
        socket.off("chat_joined");
        socket.off("receive_message");
        
        //.on - listenver/receiver
        // socket.on("me", async(data) => { //here we used data instead of userId because on me event we receive a object as response
        //     const userId = data.userId;

        //     if(!userId){
        //         setCurrentUser(null);
        //         return;
        //     }

        //     try{
        //         const res = await getUserProfile(); 
        //         const currentUser = res.data.user; //.user because from backet we get object like { user: { username: "", email: "",...}}
        //         console.log("Current user is: ", user);
        //         setCurrentUser(user);
        //     }catch(error){
        //         console.log("Error getting details of current user: ", error);
        //     }
        // })

        socket.on("online_users", async(ids) => { //we receive array of ids from this event from backend

            if(!Array.isArray(ids) || ids.length === 0){
                setOnlineUsersList([]);
                return;
            }
            console.log("Raw ids: ", ids);

            const cleanIds = ids.filter(id=>
                typeof(id) === "string" && id.length === 24
            );

            if(cleanIds.length === 0){
                setOnlineUsersList([]);
                return;
            }
           
            console.log("clean Ids are: ", cleanIds);

            try{
                const res = await getUsersByIds(cleanIds);
                const users = res.data;
                console.log("Online users list: ", users);
                setOnlineUsersList(users);
            }catch(error){
                console.log("Error getting list of online users: ", error);
            }

        })

        socket.on("chat_joined", (chatId) => {
            console.log("Joining chat first: ", chatId );
            setCurrentChatId(chatId);
        })

        socket.on("receive_message", (msg) => {
            const { currentChatId, addMessage } = useChatStore.getState();
            const { chats, setChats } = useChatStore.getState();
            
            if(msg.chatId?.toString() === currentChatId?.toString()){
                addMessage(msg);
            }

           useChatStore.setState((state) => {
                const chatId = msg.chatId?.toString();

                const existingChat = state.chats.find(
                    chat => chat._id?.toString() === chatId
                );

                if (!existingChat) return state;

                const filteredChats = state.chats.filter(
                    chat => chat._id?.toString() !== chatId
                );

                const updatedChat = {
                    ...existingChat,
                    lastMessage: msg.text,
                    lastMessageAt: new Date().toISOString()
                };

                return {
                    chats: [updatedChat, ...filteredChats]
                };
            });

            console.log("message received", msg);
        });
        return () => {
            // socket.off("me");
            socket.off("online_users");
            socket.off("chat_joined");
            socket.off("receive_message");
            socket.disconnect();
        }

    }, [currentUser, initialized]);
}

