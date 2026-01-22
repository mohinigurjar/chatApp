const express = require('express');
const userRouter = require('./routes/userRouter.js');
const connectDB = require('./config/db.js');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
connectDB();

app.use(express.json());

app.use('/api/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);