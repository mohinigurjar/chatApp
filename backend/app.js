const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const authRouter = require('./routes/authRouter.js');
const userRouter = require('./routes/userRouter.js');
const messageRouter = require('./routes/messageRouter.js');
const chatRouter = require('./routes/chatRouter.js')

dotenv.config();
const app = express();
connectDB();

app.use(cors({
    origin: [ "http://localhost:5173", "https://chatapp-bceh.onrender.com", "https://chat-app-ubhn.vercel.app"],
    credentials: true
}))


app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/users/profile', userRouter);
app.use('/api/messages', messageRouter);
app.use('/api/chats', chatRouter)


//create http server
const server = http.createServer(app);

//initialize socket.io
require('./sockets/index.js')(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);