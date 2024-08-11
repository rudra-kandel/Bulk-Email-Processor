import EmailTemplate from "@models/EmailTemplate";
import { emailQueue } from "@queues/email.queue";
import { getOneTemplateById } from "@services/emailTemplate.service";
import AppError from "@utils/error";
import { sendSuccessResponse } from "@utils/response";
import { NextFunction, Request, Response } from "express";
import httpContext from 'express-http-context'

export const sendBulkEmails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userContext = httpContext.get('user');
        const { templateId, userEmails } = req.body;

        const template = await getOneTemplateById(templateId)

        userEmails.forEach((userEmail: string) => {
            emailQueue('emailQueue', { userId: userContext.userId, userEmail, template });
        });

        sendSuccessResponse(res, 200, 'Emails are being processed.');
    } catch (error) {
        next(error)
    }
};