const { Socket } = require('dgram')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: { origin : "*" }
})

app.get('/', function(req, res) {
    res.send('Socket is up and running!')
})

io.on('connection', (socket) => {
    console.log('connection established')

    socket.on('sendRequestToServer', (data) => {
        console.log(data)
        io.sockets.emit('sendRequestToAdmin', data)
    })

    socket.on('sendResponseToServer', (data) => {
        console.log(data)
        io.sockets.emit('sendResponseToClient', data)
    })

    socket.on('disconnect', (socket) => {
        console.log('disconnected')
    })
});

server.listen(3000, () => {
    console.log('Socket.io server is running.')
})
