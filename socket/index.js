const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

// how to send to the same user every time
let users = [];

const addUser = (user, socketId) => {
    !users.some((userobj) => userobj.user === user) &&
        users.push({user, socketId});
};

const removeUser = (socketId) => {
    users.filter((user) => {
        return user.socketId !== socketId
    })
};

const getUser = (user) => {
    return users.find(userobj => userobj.user === user)
}

io.on("connection", (socket) => {
    // when connect
    
    console.log("a user connected");
    // take userId and socketId from user
    socket.on("addUser", user => {
        addUser(user, socket.id)
        io.emit("getUsers", users)
    } )

    // send and get a message 
    socket.on("sendMessage", ({senderId, reciever, text}) => {
        const user = getUser(reciever);
        io.to(user.socketId).emit("getMessage", {
            senderId, 
            text
        });
    })

    socket.on("disconnect", () => {
        console.log("a user disconnected")
        removeUser(socket.id);
        io.emit("getUsers", users)
    })
})