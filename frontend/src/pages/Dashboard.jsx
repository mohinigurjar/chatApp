import { useEffect, useState } from "react";
import { socket } from "../socket";

const Dashboard = () => {
  const [status, setStatus] = useState("disconnected");
  const [socketId, setSocketId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      setStatus("connected");
      setSocketId(socket.id);
      console.log("Socket connected:", socket.id);
    });

    socket.on("me", (data) => {
      console.log("My userId:", data.userId);
      setUserId(data.userId);
    });

    socket.on("receive_message", (messageData) => {
      console.log("Received message: ", messageData);
      setMessage(messageData.message);
    })

    socket.on("online_users_count", (count) => {
      console.log("Online users event recieved:", count);
      setOnlineUsers(count);
    });

    socket.on("disconnect", () => {
    //   setStatus("disconnected");
    //   setSocketId(null);
       console.log("socket disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("Socket error:", err.message);
    });

    return () => {
      socket.off("me");
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <p>Status: {status}</p>
      {socketId && <p>Socket ID: {socketId}</p>}
      <p>Online Users: {onlineUsers}</p>
      <p>User ID: {userId}</p>
      {/* <p>Last message: {message}</p> */}

      <button>Chats</button>
    </div>
  );
};

export default Dashboard;
