import { getUser, getUserByIds } from "../services/api";
import { socket } from "../socket"
import { useEffect } from "react";

export const useSocket = ({setCurrentUser, setOnlineUsersList}) => {

    useEffect(() => {
        socket.connect();

        //.on - argument - data we rcv
        //.emit - argument - data we send
        socket.on("me", async(data) => { //here we used data instead of userId because on me event we receive a object as response
            const userId = data.userId;

            if(!userId){
                setCurrentUser(null);
                return;
            }

            try{
                const res = await getUser(userId); 
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
                const res = await getUserByIds(cleanIds);
                const users = res.data;
                console.log("Online users list: ", users);
                setOnlineUsersList(users);
            }catch(error){
                console.log("Error getting list of online users: ", error);
            }

        })

        return () => {
            socket.off("me");
            socket.off("online_users");
            socket.disconnect();
        }

    }, []);
}