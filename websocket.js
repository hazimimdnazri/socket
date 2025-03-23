import { Server } from 'socket.io';

const initializeWebSocket = (server) => {
    const io = new Server(server, {
        cors: { origin: "*" }
    });

    io.on('connection', (socket) => {
        socket.on('vendor', (vendorId) => {
            socket.join(vendorId);
            console.log(`Socket ${socket.id} joined ${vendorId}`);
        });
    });

    return io;
} 

export const websocket = {
    initializeWebSocket
}