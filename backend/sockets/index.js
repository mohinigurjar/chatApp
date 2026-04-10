const { Server } = require("socket.io"); //create a websocket server
const jwt = require("jsonwebtoken");
// const cors = require("cors");
const cookie = require("cookie"); //parses cookies from request header

function getRoomId(user1, user2){
    return [user1, user2].sort().join("_");
}

//this function receives the http server(http) created in app.js as argument and attaches socket.io server to it
module.exports = function(server) {

    //storing the online users
    const onlineUsers = new Map();


    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", //allows connections from frontend (localhost:3000)
            credentials: true, //allow cookies to be sent with socket requests
        }
    })

    //socket auth middleware - runs before every socket connection
    io.use((socket, next) => {
        try{
            const cookieHeader = socket.handshake.headers.cookie; //read cookie header from socket handshake(initial) request...cookies are sent in request headers

            if(!cookieHeader){
                throw new Error("No cookies found")
            }

            const cookies = cookie.parse(cookieHeader);
            const token = cookies.token;

            if(!token){
                return next(new Error("No token found")); //if no token found, reject connection
            }
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token
            socket.userId = decoded.id; //attach userId to socket object for future use
            
            next(); //allow connection
        }catch(err){
            next(new Error("Unauthorized"));
        }
    });

    //runs if authentication passed
    //socket connection
    io.on("connection", (socket) => {
        // console.log(`User connected: ${socket.userId}`); //access userId attached in auth middlware to identify the user

        const userId = socket.userId; //get userid from socket object to track online users
        
        //store multiple socket ids for a single user if user opens multiple tabs
        // Online users = Map { userId1: Set{socketId1, socketId2}, userId2: Set{socketId3} }
        if(!onlineUsers.has(userId)) {
            onlineUsers.set(userId, new Set());
        }

        onlineUsers.get(userId).add(socket.id);

        console.log("User connected: ", userId);
        console.log("Users online: ", onlineUsers.size);

        //emit to all clients when someone connects
        io.emit("onlineUsers", onlineUsers.size);
        //sending userid
        socket.emit("me", { userId: socket.userId });

        socket.on("join_room", ({ otherUserId }) => {
            const roomId = getRoomId(socket.userId, otherUserId);
            socket.join(roomId);
            console.log(`User ${socket.userId} joined room ${roomId}`);
            console.log("JOIN ROOM:");
            console.log("User:", socket.userId);
            console.log("Other:", otherUserId);
            console.log("Room:", roomId);
        })

        socket.on("send_message", ({ otherUserId, message }) => {
            const roomId = getRoomId(socket.userId, otherUserId);
            console.log("MESSAGE EVENT:");
            console.log("From:", socket.userId);
            console.log("To:", otherUserId);
            console.log("Room:", roomId);
            console.log("Message:", message);

            const messageData = {
                senderId: socket.userId,
                message,
                timestamp: Date.now()
            };

            io.to(roomId).emit("receive_message", messageData);
        })

        socket.on("disconnect", () => {
            // console.log(`User disconnected: ${socket.userId}`);

            const userSockets = onlineUsers.get(userId);

            if(userSockets){
                userSockets.delete(socket.id);

                if(userSockets.size === 0){
                    onlineUsers.delete(userId);
                    console.log("User fully offline: ", userId);
                }
            }

            console.log("User disconnected: ", userId);

            //emit updated count when someone disconnects
            io.emit("onlineUsers", onlineUsers.size);

        });
    });
}

//todo: create fronteend to get online users data