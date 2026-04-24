import { getUserProfile, getUsersByIds } from "../services/api";
import { socket } from "../socket"
import { useEffect } from "react";
import { useChatStore } from "../store/chatStore";

export const useSocket = () => {
    const  setCurrentUser  = useChatStore(state => state.setCurrentUser);
    const  setOnlineUsersList  = useChatStore(state => state.setOnlineUsersList);
    const  setCurrentChatId = useChatStore(state => state.setCurrentChatId);

    useEffect(() => {
        socket.connect();
        
        //.on - listenver/receiver
        socket.on("me", async(data) => { //here we used data instead of userId because on me event we receive a object as response
            const userId = data.userId;

            if(!userId){
                setCurrentUser(null);
                return;
            }

            try{
                const res = await getUserProfile(); 
                const user = res.data.user; //.user because from backet we get object like { user: { username: "", email: "",...}}
                console.log("Current user is: ", user);
                setCurrentUser(user);
            }catch(error){
                console.log("Error getting details of current user: ", error);
            }
        })

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
            console.log("Joining chat: ", chatId );
            setCurrentChatId(chatId);
        })

        socket.on("receive_message", (msg) => {
            const { currentChatId, addMessage } = useChatStore.getState();
            
            if(msg.chatId?.toString() === currentChatId?.toString()){
                addMessage(msg);
            }
            
            console.log("message received", {msg});
        })

        return () => {
            socket.off("me");
            socket.off("online_users");
            socket.off("chat_joined");
            socket.off("receive_message");
            socket.disconnect();
        }

    }, []);
}

