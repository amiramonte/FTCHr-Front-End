const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

// how to send to the same user every time
// this only inlcudes users that are online currently
let users = [];

// may possibly need to create an array of alllk users that are on the app to allow conversations that are not real time
// fetch conversation members? 
// socketio used for real time updating, so if you are not online,th emessage is sent through the database still?

const addUser = (user_name, socketId) => {
    !users.some((userobj) => userobj.user_name === user_name) &&
        users.push({user_name, socketId});
};

const removeUser = (socketId) => {
    users.filter((user) => {
        return user.socketId !== socketId
    })
};

const getUser = (user_name) => {
    return users.find((userobj) => userobj.user_name === user_name)
}

io.on("connection", (socket) => {

    // when connect
    socket.on("addUser", (user_name) => {
        console.log(`${user_name} connected`);
        if(user_name !== " ") {
            addUser(user_name, socket.id)
        // get all users to find online friends
        io.emit("getUsers", users)
        }
    });

    // send and get a message 
    // const members = [currentChat.senderId, currentChat.recieverId]
    socket.on("sendMessage", ({senderId, recieverId, text}) => {
        // const user is the person who is recieving the message
        const user = getUser(recieverId);
        console.log(user, "user that we are trying to send message to")
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