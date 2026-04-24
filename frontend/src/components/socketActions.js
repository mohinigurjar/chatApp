import { socket } from "../socket"

export const createChat = (otherUserId) => {
    socket.emit("create_chat", { otherUserId });
}

export const sendMessage = (otherUserId, text) => {
    console.log("Emitting msg works");
    socket.emit("send_message", { otherUserId, text});
}