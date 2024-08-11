import { Server } from 'http';
import { Socket, Server as SocketIOServer } from 'socket.io';
import { handleConnection, handleDisconnect } from './connectionHandler';
import logger from '@utils/logger';

export let io: SocketIOServer

export const initializeSocket = (server: Server): SocketIOServer => {
    io = new SocketIOServer(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    logger.info("Socket Initialized....")
    io.on("connection", (client: Socket) => {
        logger.info("Connecting .......")
        handleConnection(client);
        client.on("disconnect", () => handleDisconnect(client));
    });

    return io;
};


export const getSocketIOInstance = (): SocketIOServer => {
    if (!io) {
        throw new Error("Socket.IO server not initialized");
    }
    return io;
};