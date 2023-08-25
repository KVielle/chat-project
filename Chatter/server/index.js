const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoute = require("./Routes/userRoute")
const chatRoute = require("./Routes/chatRoute")
const messageRoute = require("./Routes/messageRoute")

const app = express()
require("dotenv").config()

const allowedOrigins = ['https://chat-project-5nxeo4xxz-kvielle.vercel.app'];

app.use(express.json());
app.use(cors({
    origin: function(origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    }
    }));
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

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