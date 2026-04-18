import { useChat } from "../context/ChatContext"

const Sidebar = () => {
    const { currentUser, onlineUsersList } = useChat();

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h3 className="text-red-700">{currentUser?.username}</h3>
                    {/* <h5>{user.online ? <span>😁</span> : <span>😒</span>}</h5> */}

                    


                </div>
                <div>
                    <button>logout</button>
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
                            {onlineUsersList.map((user) => (
                            <li key={user._id}>{user.username}</li>
                            ))}
                        </ul>
                    </div>
                <div>online status</div>
            </div>
           <hr></hr>
                
            
        </div>
    )
}

export default Sidebar;