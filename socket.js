const { Socket } = require('dgram')
require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const cors = require('cors');
const io = require('socket.io')(server, {
    cors: { origin : "*" }
})

let clients = []
app.use(express.json());

// app.post('/alert', (req, res) => {
//     console.log('Alert received.')
//     if(req.body.SECRET_KEY == process.env.SECRET_KEY){
//         switch (req.body.apps) {
//             case 'recruitment':
//                 io.sockets.emit("getRecruitmentAlert", req.body.message);
//                 break;
        
//             case 'hr':
//                 io.sockets.emit("getHrAlert", req.body.message);
//                 break;
        
//             default:
//                 break;
//         }
//         res.send('Alert sent.')
//     } else {
//         res.send('ERROR!')
//     }
// })

eventsHandler = (req, res) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };

    res.writeHead(200, headers);

    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res
    };
  
    clients.push(newClient);
  
    req.on('close', () => {
        clients = clients.filter(client => client.id !== clientId);
    });
}

sendEventsToAll = (newAlert) => {
    clients.forEach(client => client.res.write(`data: ${JSON.stringify(newAlert)}\n\n`))
}
  
async function triggerEvent(req, res){
    if(req.body.SECRET_KEY == process.env.SECRET_KEY){
        const newAlert = req.body;
        delete newAlert['SECRET_KEY'];
        res.send('Alert sent!')
        return sendEventsToAll(newAlert);
    } else {
        res.send('ERROR!')
    }
}

app.get('/', (req, res) => {res.send('Socket is up and running!')})
app.get('/events', eventsHandler);
app.post('/trigger', triggerEvent)

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
