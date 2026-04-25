import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_BE_URL, {
    withCredentials: true, //send cookies
    autoConnect: false, //disable automatic connection on io() call
})

window.socket = socket;