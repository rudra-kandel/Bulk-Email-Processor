// src/services/queueConsumer.ts
import { getChannel } from '@config/rabbitmq.config';
import { ConsumerOptions, ErrorHandler, RetryHandler, SuccessHandler } from '@interfaces/queue';
import AppError from '@utils/error';
import { ConsumeMessage } from 'amqplib';
import { handleEmailError } from './emailStrategy';
import { handleQueueError, handleQueueRetry, handleQueueSuccess } from './defaultStrategy';

export const createConsumer = <T>(options: ConsumerOptions<T>) => {
    const {
        queueName,
        processMessage,
        maxRetries = 5,
        retryInterval = 10000,
        errorHandler = handleQueueError as ErrorHandler<T>,
        successHandler = handleQueueSuccess as SuccessHandler<T>,
        retryHandler = handleQueueRetry as RetryHandler<T>,
    } = options;

    const channel = getChannel();

    channel.consume(queueName, async (msg: ConsumeMessage | null) => {
        if (msg !== null) {
            const parsedMsg = JSON.parse(msg.content.toString()) as T
            const { retryCount = 0 } = msg.properties.headers as { retryCount?: number };

            try {
                await processMessage(parsedMsg);
                await successHandler.handleSuccess(parsedMsg)
                channel.ack(msg); // Acknowledge message as processed
            } catch (error) {
                await errorHandler.handleError(error as Error, parsedMsg, retryCount);

                if (retryCount < maxRetries) {
                    await retryHandler.handleRetry(queueName, parsedMsg, retryCount)
                } else {
                    channel.nack(msg, false, false); // Do not requeue after max retries
                }
            }
        }
    });
};
