import { publishToQueue } from "@queues/email.queue";

export const sendBulkEmails = async (templateId: string, userList: any[], res: Response) => {
    userList.forEach(async (user) => {
        await publishToQueue('emailQueue', { templateId, email: user.email });
    });
    // sendSuccessResponse(res, 202, 'Emails are being processed in the background');
};

