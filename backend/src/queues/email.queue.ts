import { getChannel } from '@config/rabbitmq.config';

export const publishToQueue = async (queueName: string, data: any) => {
    const channel = getChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
        persistent: true, // Ensure messages survive broker restarts
    });
};

export const consumeQueue = async (queueName: string, callback: Function) => {
    const channel = getChannel();
    channel.consume(queueName, async (msg) => {
        if (msg !== null) {
            await callback(JSON.parse(msg.content.toString()));
            channel.ack(msg); // Acknowledge message after processing
        }
    });
};