

export interface EmailMessage {
    templateId: string;
    email: string;
    retryCount?: number;
}