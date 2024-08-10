import { getChannel } from "@config/rabbitmq.config";
import { EmailMessage } from "@interfaces/email";
import { ErrorHandler, RetryHandler, SuccessHandler } from "@interfaces/queue";
import { saveEmailLog } from "@services/emailLog.service";

// Error Handler Function
export const handleEmailError: ErrorHandler<EmailMessage> = {
    async handleError(
        error: Error,
        msg: EmailMessage,
        retryCount: number
    ): Promise<void> {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        await saveEmailLog(msg.templateId, msg.email, 'failed', errorMessage, retryCount);
    }
}

// Success Handler Function
export const handleEmailSuccess: SuccessHandler<EmailMessage> = {
    async handleSuccess(msg: EmailMessage): Promise<void> {
        await saveEmailLog(msg.templateId, msg.email, 'sent');
    }
};

// Retry Handler Function
export const handleEmailRetry: RetryHandler<EmailMessage> = {
    async handleRetry(queueName: string, msg: EmailMessage, retryCount: number): Promise<void> {
        const channel = getChannel();

        setTimeout(() => {
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)), {
                persistent: true,
                headers: { retryCount: retryCount + 1 },
            });
        }, 10000); // Retry interval
    }
}
