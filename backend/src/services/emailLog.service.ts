// src/services/emailLogService.ts
import { EmailLog } from '@models/EmailLog';
import User from '@models/User';

export const saveEmailLog = async (
    templateId: string,
    email: string,
    status: 'sent' | 'failed' | 'retry',
    errorMessage?: string,
    retryCount: number = 0
) => {
    await EmailLog.create({
        templateId,
        email,
        status,
        errorMessage,
        retryCount,
    });
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