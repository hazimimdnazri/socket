const { Socket } = require('dgram')
require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: { origin : "*" }
})

app.use(express.json());

app.get('/', function(req, res) {
    res.send('Socket is up and running!')
})

app.post('/alert', function(req, res) {
    console.log('Alert received.')
    if(req.body.SECRET_KEY == process.env.SECRET_KEY){
        switch (req.body.apps) {
            case 'recruitment':
                io.sockets.emit("getRecruitmentAlert", req.body.message);
                break;
        
            case 'hr':
                io.sockets.emit("getHrAlert", req.body.message);
                break;
        
            default:
                break;
        }
        res.send('Alert sent.')
    } else {
        res.send('ERROR!')
    }
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
