export const getChatId = (currentUserId, otherUserId) => {
    return [currentUserId, otherUserId].sort().join('_');
}