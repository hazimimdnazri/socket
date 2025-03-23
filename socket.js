import express from 'express';
import { createServer } from 'http';
import routes from './route.js';
import { websocket } from './websocket.js';

const app = express();
const server = createServer(app);
const io = websocket.initializeWebSocket(server);

app.use(express.json());
app.use('/', routes);

server.listen(process.env.PORT, () => {
    console.log(`Websocket server is running on port ${process.env.PORT}`)
});

export { io };