import { getChannel } from '@config/rabbitmq.config';

export const emailQueue = async (queueName: string, data: any) => {
    console.log(1)
    const channel = getChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
        persistent: true, // Ensure messages survive broker restarts
    });
    console.log(2)
};