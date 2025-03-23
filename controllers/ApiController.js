import Message from '../models/Message.js';
import { io } from '../socket.js';

const index = (req, res) => {
    res.send('The server is up and running!')
}

const postAlert = (req, res) => {
    const validationResult = new Message(req.headers, req.body).validate();
    if (!validationResult.success) {
        return res.status(400).json({
            "success": validationResult.success,
            "message": validationResult.message
        });
    }

    io.to(req.body.roomId).emit('alert', req.body.message);

    res.status(200).json({
        "success": validationResult.success,
        "message": "Message sent successfully"
    });
}

const unknownRoute = (req, res) => {
    res.status(404).send(":-(");
}

export const ApiController = {
    index,
    postAlert,
    unknownRoute
};