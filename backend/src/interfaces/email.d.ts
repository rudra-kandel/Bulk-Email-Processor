

export interface EmailMessage {
    userId: string,
    template: {
        id: string,
        name: string,
        subject: string,
        body: string
    };
    userEmail: string;
    retryCount?: number;
}