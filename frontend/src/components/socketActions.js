import { socket } from "../socket"

export const joinRoom = (otherUserId) => {
    socket.emit("join_room", { otherUserId });
}