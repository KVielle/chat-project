const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoute = require("./Routes/userRoute")
const chatRoute = require("./Routes/chatRoute")
const messageRoute = require("./Routes/messageRoute")

const app = express()
require("dotenv").config()



app.use(express.json());
app.use((req, res, next) => {
    const allowedOrigins = ['https://chat-project-beryl.vercel.app', 'https://chatter-jzch.onrender.com'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
    })
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get('/hello', (_, res) => res.send('Hello from ME'))

app.get("/", (req, res) => {
    res.send("Welcome to Chatter APIs")
});

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

app.listen(port, (req, res) => {
    console.log(`Server running on port: ${port}`)
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connection established"))
.catch((error) => console.log("MongoDb Connection failed: ", error.message));