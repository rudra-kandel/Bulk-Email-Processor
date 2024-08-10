import logger from "@utils/logger";
import { Channel } from "amqplib";
import { processEmailJob } from "jobs/email.job";
import { handleEmailError, handleEmailRetry, handleEmailSuccess } from "./emailStrategy";
import { createConsumer } from "./queue.consumer";
import { ConsumerOptions } from "@interfaces/queue";

export const queuesConfig: Omit<ConsumerOptions<any>, 'channel'>[] = [
    {
        queueName: 'emailQueue',
        options: { durable: true },
        processMessage: processEmailJob,
        errorHandler: handleEmailError,
        successHandler: handleEmailSuccess,
        retryHandler: handleEmailRetry,
        maxRetries: 5,
        retryInterval: 5000,
    },
    // Add more queues here as needed
];

export const initializeQueuesAndConsumers = async (channel: Channel) => {
    for (const queueConfig of queuesConfig) {
        await channel.assertQueue(queueConfig.queueName, queueConfig.options);
        logger.info(`Queue initialized: ${queueConfig.queueName}`);

        createConsumer({
            ...queueConfig,
            channel
        });

        logger.info(`Consumer initialized for queue: ${queueConfig.queueName}`);
    }
};