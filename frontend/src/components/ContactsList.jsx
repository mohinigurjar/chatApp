import { useEffect } from "react";
import UserRow from './UserRow';
import { useChatStore } from "../store/chatStore";
import { getChatId } from '../utils/getChatId';
import { getChatsList, getUsersByIds } from '../services/api';


const ContactsList = () => {
    const setCurrentChatId = useChatStore(state => state.setCurrentChatId);
    const setContacts = useChatStore(state => state.setContacts);
    const setSelectedUser = useChatStore(state => state.setSelectedUser);

    const onlineUsersList = useChatStore(state => state.onlineUsersList);
    const currentUser = useChatStore(state => state.currentUser);
    const contacts = useChatStore(state => state.contacts);
    

    console.log("contactlist working");

    useEffect(() => {
        if(!currentUser) return;

        const fetchContacts = async() => {
            try{
                const chatsRes = await getChatsList();
                const chats = chatsRes.data;

                const chattedUserIds = chats.flatMap(chat => 
                    chat.participants.map(p => p._id)
                )

                const onlineUsersIds = onlineUsersList.map(user => user._id)
                .filter(id => id !== currentUser._id);

                const contactIds = onlineUsersIds.filter(
                    id => !chattedUserIds.includes(id)
                )

                if(contactIds.length === 0){
                    setContacts([]);
                    return;
                }

                const res = await getUsersByIds(contactIds);
                setContacts(res.data);
                

            }catch(error){
                console.log("Error fetching contacts");
            }
        }

        fetchContacts();
    }, [onlineUsersList, currentUser]);

    if(!onlineUsersList || !currentUser) return <div>Loading...</div>

    // useEffect(() => {
        

    //     const fetchUsers = async() => {
    //         const chattedUsersIds = await getChatsList.map(chat => chat._id);
    //         const onlineUsersIds = onlineUsersList.map(user => user._id);
    //         const contactsIds = onlineUsersIds.filter(id => !chattedUsersIds.include(id));
    //         const contacts = await getUsersByIds(contactsIds);
    //         const res = contacts.data;
    //         setContacts(res);
    //     }
    // }, [])
    
  return (
    <div>
        {
            contacts.map((user) =>
                <UserRow
                key={user._id}
                user={user}
                lastMessage={null}
                onClick={() => {
                    console.log("new chat created")
                    setSelectedUser(user);
                    const chatId = getChatId(currentUser._id, user._id);
                    setCurrentChatId(chatId);

                }}
                />
            )
        }
    </div>
  )
}

export default ContactsList;