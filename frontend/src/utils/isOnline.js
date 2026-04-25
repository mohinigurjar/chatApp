import { useChatStore } from "../store/chatStore";

export const isOnline = (user) => {
    const onlineUsersList = useChatStore.getState().onlineUsersList;
    return onlineUsersList.some(u => u._id === user._id);

}