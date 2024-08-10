import { handleEmailError, handleEmailRetry, handleEmailSuccess } from "@queues/emailStrategy";
import { createConsumer } from "@queues/queue.consumer";
import { processEmailJob } from "../jobs/email.job";


createConsumer(
    {
        queueName: 'emailQueue',
        processMessage: processEmailJob,
        maxRetries: 5,
        errorHandler: handleEmailError,
        successHandler: handleEmailSuccess,
        retryHandler: handleEmailRetry
    },
);
