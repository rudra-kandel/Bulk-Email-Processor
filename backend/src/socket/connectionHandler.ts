import { Socket } from "socket.io";
import * as jwt from "jsonwebtoken";
import { getRoomById } from "@utils/socket.util";
import config from "@config/env.config"
import logger from "@utils/logger";
const { jwtSecret } = config

const validateToken = (token: string, secret: string): Promise<any> => {
    console.log(token)
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, payload) => {
            if (err) reject(err);
            else resolve(payload);
        });
    });
};

export const handleConnection = async (client: Socket) => {
    try {
        const { token } = client.handshake.auth;
        delete client.handshake.auth.token;
        const user: any = await validateToken(token, jwtSecret);
        if (!user) {
            client.emit("error", { message: 'Token Invalid', statusCode: 401 });
            client.disconnect(true);
            return;
        }

        client.handshake.auth.userId = user.userId;

        const userId = client.handshake.auth.userId;
        const rooms = getRoomById(userId);
        client.join(rooms);

        logger.info(`User ${userId} connected and joined rooms: ${rooms}`);
    } catch (error) {
        logger.error("Error handling connection:", error);
        client.emit("error", { message: "Internal server error", statusCode: 500 });
        client.disconnect(true);
    }
};

export const handleDisconnect = (client: Socket) => {
    const userId = client.handshake.auth.userId;
    console.log(`User ${userId} disconnected`);
};

