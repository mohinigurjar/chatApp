import { useEffect, useState } from "react";
import { socket } from "../socket";

const Dashboard = () => {
  const [status, setStatus] = useState("disconnected");
  const [socketId, setSocketId] = useState(null);
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
    });

    socket.on("receive_message", (messageData) => {
      console.log("Received message: ", messageData);
    })

    socket.on("onlineUsers", (count) => {
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
      socket.off("onlineUsers");
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <p>Status: {status}</p>
      {socketId && <p>Socket ID: {socketId}</p>}
      <p>Online Users: {onlineUsers}</p>
    </div>
  );
};

export default Dashboard;
