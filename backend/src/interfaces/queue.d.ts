export interface ConsumerOptions<T> {
    queueName: string;
    processMessage: (msg: T) => Promise<void>;
    maxRetries?: number;
    retryInterval?: number;
    errorHandler?: ErrorHandler<T>;
    successHandler?: SuccessHandler<T>;
    retryHandler?: RetryHandler<T>
}

export interface QueueConsumer<T> {
    processMessage(message: T): Promise<void>;
}

export interface RetryStrategy {
    shouldRetry(retryCount: number): boolean;
    getRetryInterval(): number;
}

export interface Logger {
    logSuccess(templateId: string, email: string): Promise<void>;
    logFailure(templateId: string, email: string, errorMessage: string, retryCount: number): Promise<void>;
}

export interface ErrorHandler<T> {
    handleError(error: Error, msg: T, retryCount: number): Promise<void>;
}

export interface SuccessHandler<T> {
    handleSuccess(msg: T): Promise<void>;
}

export interface RetryHandler<T> {
    handleRetry(queueName: string, msg: T, retryCount: number): Promise<void>;
}

