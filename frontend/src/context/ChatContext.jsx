import { createContext, useContext, useState } from "react";
import { useSocket } from "../hooks/useSocket";

const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [onlineUsersList, setOnlineUsersList] = useState([]);

    //plugin socket here
    useSocket({setCurrentUser, setOnlineUsersList});

    return(
        <ChatContext.Provider value={{
            currentUser, onlineUsersList
        }}>
            {children}

        </ChatContext.Provider>
    )
}

export const useChat = () => useContext(ChatContext);