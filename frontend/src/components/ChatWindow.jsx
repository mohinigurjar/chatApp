import { useState, useEffect } from "react";
import { useChatStore } from "../store/chatStore";

const chatWindow = () => {
    const selectedUser = useChatStore(state => state.selectedUser);

    return (
    <div>
        {selectedUser ? (
        <h2>Chatting with {selectedUser.username}</h2>
        ) : (
        <p>Select a user</p>
        )}

        <div>
            <input
            type="text"
            name="message"
            placeholder="type a message here"
            >
            </input>
        </div>
    </div>
    );
    }

export default chatWindow;