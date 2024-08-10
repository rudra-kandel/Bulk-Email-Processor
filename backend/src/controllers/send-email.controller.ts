import EmailTemplate from "@models/EmailTemplate";
import { emailQueue } from "@queues/email.queue";
import AppError from "@utils/error";
import { sendSuccessResponse } from "@utils/response";
import { NextFunction, Request, Response } from "express";
import httpContext from 'express-http-context'

export const sendBulkEmails = async (req: Request, res: Response, next: NextFunction) => {
    const userContext = httpContext.get('user');
    const { templateId, userEmails } = req.body;
    console.log(userContext)
    const template = await EmailTemplate.findByPk(templateId);
    if (!template) {
        return next(new AppError(400, 'Template not found'));
    }

    userEmails.forEach((userEmail: string) => {
        emailQueue('emailQueue', { userId: userContext.userId, userEmail, template });
    });

    sendSuccessResponse(res, 200, 'Emails are being processed.');
};