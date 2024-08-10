import logger from '@utils/logger';
import amqp from 'amqplib';
import config from '@config/env.config'
import { initializeQueuesAndConsumers } from '@queues/initializeQueueAndConsumer';

let channel: amqp.Channel;
let connection: amqp.Connection;
const { rabbitMQUrl } = config;

export const connectRabbitMQ = async (): Promise<void> => {
    try {
        const connection = await amqp.connect(rabbitMQUrl);
        channel = await connection.createChannel();
        logger.info("Connected to Rabbit MQ")

        //Initialize all queues and consumers
        await initializeQueuesAndConsumers(channel)

        connection.on('error', (err) => {
            logger.error('RabbitMQ connection error:', err);
            reconnectRabbitMQ();
        });

        connection.on('close', () => {
            logger.error('RabbitMQ connection closed. Attempting to reconnect...');
            reconnectRabbitMQ();
        });

        channel.on('error', (err) => {
            logger.error('RabbitMQ channel error:', err);
        });
    } catch (error) {
        logger.error("Failed to connect to rabbit MQ ", error);
        reconnectRabbitMQ()
        // process.exit(1);
    }
};

const reconnectRabbitMQ = () => {
    setTimeout(connectRabbitMQ, 5000);
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