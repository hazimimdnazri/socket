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
    console.log(`Connection ${socket.id} established.`)

    socket.on('sendRequestToServer', (data) => {
        console.log(`Incoming request from ${data.name} with e-mail ${data.email}.`)
        io.sockets.emit('sendRequestToAdmin', data)
    })

    socket.on('sendResponseToServer', (data) => {
        if(data.action == 'reject'){
            console.log(`Request ${data.socket_id} rejected by Admin.`)
        } else {
            console.log(`Request ${data.socket_id} accepted by Admin.`)
        }
        io.sockets.emit('sendResponseToClient', data)
    })

    socket.on('disconnect', (socket) => {
        console.log('Disconnected.')
    })
});

server.listen(3000, () => {
    console.log('Socket.io server is running.')
})
