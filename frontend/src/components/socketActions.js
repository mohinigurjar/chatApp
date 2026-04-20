import { socket } from "../socket"

export const joinRoom = (otherUserId) => {
    socket.emit("join_room", { otherUserId });
}

export const sendMessage = (otherUserId, message) => {
    socket.emit("send_message", { otherUserId, message});
}