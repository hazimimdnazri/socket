const express = require('express')
let app = express.Router()

app.get('/', (req, res) => {
    res.send('Socket is up and running!')
})

app.get('/help', (req, res) => {
    res.send('Do you need help?')
})

app.post('/alert', (req, res) => {
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

module.exports = app;