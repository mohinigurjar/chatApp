export const getOtherUser = (chats, currentUserId) => {
    
    return chats?.participants?.find((user) => user._id !== currentUserId);

}