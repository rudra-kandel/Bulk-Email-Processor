// src/services/emailLogService.ts
import { EmailLog } from '@models/EmailLog';
import EmailTemplate from '@models/EmailTemplate';
import User from '@models/User';

export const saveEmailLog = async (
    userId: string,
    template: {
        id: string,
        name: string,
        subject: string,
        body: string
    },
    userEmail: string,
    status: 'sent' | 'failed' | 'retry',
    errorMessage?: string,
    retryCount: number = 0
) => {
    const logdata = await EmailLog.create({
        templateId: template.id,
        userId,
        email: userEmail,
        status,
        errorMessage,
        retryCount,
    });
    return logdata;
};



//get email logs by userid
export const getEmailLogsByUserId = async (
    userId: string,
    page: number = 1,
    limit: number = 10
): Promise<{ rows: EmailLog[], count: number }> => {
    const offset = (page - 1) * limit;

    const { count, rows } = await EmailLog.findAndCountAll({
        where: { userId },
        limit: limit,
        offset,
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: User,
                as: 'user',
            }
        ],
    });

    return {
        rows,
        count,
    };
};