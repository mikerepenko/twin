const http = require('http')
const socket = require('socket.io')
const server = http.createServer()
const port = 11100

let onlineUsers = []

const io = socket(server, {
    pingInterval: 10000,
    pingTimeout: 5000
})

io.use((socket, next) => {
    if (socket.handshake.query.token === "UNITY") {
        next()
    } else {
        next(new Error("Authentication error"))
    }
})

io.on('connection', socket => {
  console.log("Connected user")

  socket.on("addNewUser", (userId) => {
    console.log("addNewUser " + userId)

    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push(({
        userId,
        socketId: socket.id,
      }))

    io.emit("getOnlineUsers", onlineUsers)
  })

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
    io.emit("getOnlineUsers", onlineUsers)
  })

  socket.on('addMessage', (data) => {
    const { recipientId, text } = data
    
    if (onlineUsers.some((u) => u.userId == recipientId)) {
      console.log(onlineUsers.find((u) => u.userId == recipientId).socketId + '--' + socket.id)
      if (onlineUsers.find((u) => u.userId == recipientId).socketId === socket.id) {
        io.emit('getMessage', { createdAt: "17:00", text,  })
      }
    }
  })
})


server.listen(port, () => {
  console.log('Socket - success')
})