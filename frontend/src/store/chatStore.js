import { create } from "zustand";

export const useChatStore = create((set) => ({
    //states
    currentUser : null,
    onlineUsersList: [],

    //state updaters
    setCurrentUser: (user) => set({currentUser: user}),
    setOnlineUsersList: (users) => set({onlineUsersList: users}),
}))