const { Server } = require("socket.io");


//change this to live site url

const allowedOrigins = ['https://chat-project-one.vercel.app', 'https://chatter-jzch.onrender.com'];

const io = new Server({
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"]
    }
});

let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("new connection", socket.id)


    //listen to a connection
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((user) => user.userId === userId) &&
        onlineUsers.push({
            userId,
            socketId: socket.id,
        });
        
        console.log("onlineUsers", onlineUsers);

        io.emit("getOnlineUsers", onlineUsers);
    });
    
    // add message
    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find(user => user.userId === message.recipientId)

        if(user){
            io.to(user.socketId).emit("getMessage", message);
            io.to(user.socketId).emit("getNotification", {
                senderId: message.senderId,
                isRead: false,
                date: new Date(),
            });
        }
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
        io.emit("getOnlineUsers", onlineUsers);
    })
});

io.listen(3000);