import { getChannel } from "@config/rabbitmq.config";
import { EmailMessage } from "@interfaces/email";
import { ErrorHandler, RetryHandler, SuccessHandler } from "@interfaces/queue";
import { saveEmailLog } from "@services/emailLog.service";
import logger from "@utils/logger";

// Error Handler Function
export const handleQueueError: ErrorHandler<string> = {
    async handleError(
        error: Error,
        msg: string,
        retryCount: number
    ): Promise<void> {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        logger.error(errorMessage)
    }
}

// Success Handler Function
export const handleQueueSuccess: SuccessHandler<string> = {
    async handleSuccess(msg: string): Promise<void> {
        logger.info("Success", msg);
    }
};

// Retry Handler Function
export const handleQueueRetry: RetryHandler<string> = {
    async handleRetry(queueName: string, msg: string, retryCount: number): Promise<void> {
        const channel = getChannel();
        setTimeout(() => {
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)), {
                persistent: true,
                headers: { retryCount: retryCount + 1 },
            });
        }, 10000); // Retry interval
    }
};
