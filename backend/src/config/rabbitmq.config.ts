import logger from '@utils/logger';
import amqp from 'amqplib';

let channel: amqp.Channel;
let connection: amqp.Connection;

const rabbitMQUrl = process.env.RABBITMQ_URL || 'amqp://localhost';

export const connectRabbitMQ = async (): Promise<void> => {
    try {
        const connection = await amqp.connect(rabbitMQUrl);
        // const connection = await amqp.connect({
        //     hostname: 'localhost',
        //     username: 'guest',
        //     password: 'guest',
        //     reconnectStrategy: (retries) => Math.min(retries * 100, 3000), // Reconnect strategy
        // });
        channel = await connection.createChannel();

        // await channel.assertQueue('emailQueue', { durable: true });
        logger.info("Connected to Rabbit MQ")

        connection.on('error', (err) => {
            logger.error('RabbitMQ connection error:', err);
            setTimeout(connectRabbitMQ, 5000); // Retry connection after 5 seconds
        });

        connection.on('close', () => {
            logger.error('RabbitMQ connection closed. Attempting to reconnect...');
            setTimeout(connectRabbitMQ, 5000); // Retry connection after 5 seconds
        });

        channel.on('error', (err) => {
            logger.error('RabbitMQ channel error:', err);
        });
    } catch (error) {
        logger.error("Failed to connect to rabbit MQ ", error);
        setTimeout(connectRabbitMQ, 5000);
        // process.exit(1);
    }
};

export const getChannel = (): amqp.Channel => channel;
export const closeConnection = async () => {
    if (channel) {
        await channel.close();
    }
    if (connection) {
        await connection.close();
    }
};