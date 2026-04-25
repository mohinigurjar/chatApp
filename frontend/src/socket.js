import { io } from "socket.io-client";

export const socket = io("https://chatapp-bceh.onrender.com", {
    withCredentials: true, //send cookies
    autoConnect: false, //disable automatic connection on io() call
})

window.socket = socket;