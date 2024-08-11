// src/services/emailLogService.ts
import { EmailLog } from '@models/EmailLog';
import EmailTemplate from '@models/EmailTemplate';
import User from '@models/User';
import AppError from '@utils/error';
import httpStatus from 'http-status';

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
    return await getOneEmalLog(logdata.id);
};

export const getOneEmalLog = async (id: string): Promise<EmailLog> => {
    const result = await EmailLog.findOne({
        where: { id },
        include: [{
            model: User,
            as: 'user'
        }]
    })
    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Email log not found"
    )
    return result;
}



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