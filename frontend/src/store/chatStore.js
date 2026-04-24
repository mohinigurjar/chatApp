import { create } from "zustand";

export const useChatStore = create((set) => ({
    //states
    currentUser : null,
    selectedUser : null,
    onlineUsersList: [],

    currentChatId: null,
    messages: [],
    chats: [],
    contacts: [],
    activeTab: 'chats',

    //state updaters
    setCurrentUser: (user) => set({currentUser: user}),
    setSelectedUser: (user) => set({selectedUser: user}),
    setOnlineUsersList: (users) => set({onlineUsersList: users}),
    setCurrentChatId: (id) => set({currentChatId: id}),
    setMessages: (msgs) => set({messages: msgs}),
    addMessage: (msg) => set((state) => ({
        messages: [...state.messages, msg]
    })),
    clearMessages: () => set({ messages: []}),
    setChats: (chat) => set({chats: chat}),
    setContacts: (user) => set({contacts: user}),
    setActiveTab: (tab) => set({activeTab: tab})
}));