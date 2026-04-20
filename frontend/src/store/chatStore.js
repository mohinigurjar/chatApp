import { create } from "zustand";

export const useChatStore = create((set) => ({
    //states
    currentUser : null,
    onlineUsersList: [],
    selectedUser: null,
    currentRoomId: null,
    messages: [],

    //state updaters
    setCurrentUser: (user) => set({currentUser: user}),
    setOnlineUsersList: (users) => set({onlineUsersList: users}),
    setSelectedUser: (user) => set({selectedUser: user}),
    setCurrentRoomId: (id) => set({currentRoomId: id}),
    setMessages: (msgs) => set({messages: msgs}),
    addMessage: (msg) => set((state) => ({
        messages: [...state.messages, msg]
    })),
    clearMessages: () => set({ messages: []})
}));