// import { io } from '@socket/socket';

import { getSocketIOInstance } from "@socket/socket";

export const notifyClient = (room: string, data: any): void => {
    const io = getSocketIOInstance();
    io.to(room).emit('emailLog', data);
};
