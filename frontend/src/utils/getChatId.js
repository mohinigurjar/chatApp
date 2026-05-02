export const getChatId = (currentUserId, otherUserId) => {
    console.log("get chatid called");
    return [currentUserId, otherUserId].sort().join('_');
}