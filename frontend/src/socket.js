import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
    withCredentials: true, //send cookies
    autoConnect: false, //disable automatic connection on io() call
})

window.socket = socket;