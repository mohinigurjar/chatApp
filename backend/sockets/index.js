const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

module.exports = function(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true,
        }
    })

    //socket auth middleware
    io.use((socket, next) => {
        try{
            const cookieHeader = socket.handshake.headers.cookie;

            if(!cookieHeader){
                throw new Error("No cookies found")
            }

            const cookies = cookie.parse(cookieHeader);
            const token = cookies.token;

            if(!token){
                return next(new Error("No token found"));
            }
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded.id;
            next();
        }catch(err){
            next(new Error("Unauthorized"));
        }
    });

    //socket connection
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.userId}`);

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.userId}`);
        });
    });
}