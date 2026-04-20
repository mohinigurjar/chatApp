import { useChatStore } from "../store/chatStore";
import { useSocket } from "../hooks/useSocket"
import { joinRoom } from "./socketActions";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const currentUser = useChatStore(state => state.currentUser);
    const onlineUsersList = useChatStore(state => state.onlineUsersList);
    const setSelectedUser = useChatStore(state => state.setSelectedUser);
    const Navigate = useNavigate();


    const handleSelectedUser = (user) => {
        setSelectedUser(user);
        Navigate(`/chatWindow/${user._id}`);
    }

    

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
            <div className="flex justify-between">
                <button>Chats</button>
                <button>Contacts</button>
            </div>

        <hr></hr>

{/* we will use chats? chats : contacts logic here to open both */}
            <div className="flex justify-between">
                <div>
                        <h3>Online users: </h3>
                        <ul>
                            {onlineUsersList
                            .filter(user => currentUser?._id && user._id.toString() !== currentUser._id.toString())
                            .map((user) => <li 
                            key={user._id}
                            onClick={() => handleSelectedUser(user)}
                            className="cursor-pointer">{user.username}</li>)}
                        </ul>
                    </div>
                <div>online status</div>
            </div>
           <hr></hr>
                
            
        </div>
    )
}

export default Sidebar;