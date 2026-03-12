const express = require('express');
const http = require('http');
const cors = require('cors');
const userRouter = require('./routes/userRouter.js');
const connectDB = require('./config/db.js');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


app.use(express.json());

app.use('/api/users', userRouter);


//create http server
const server = http.createServer(app);

//initialize socket.io
require('./sockets/index.js')(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);