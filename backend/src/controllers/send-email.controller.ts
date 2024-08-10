import EmailTemplate from "@models/EmailTemplate";
import AppError from "@utils/error";
import { sendSuccessResponse } from "@utils/response";
import { NextFunction, Request, Response } from "express";

export const sendBulkEmails = async (req: Request, res: Response, next: NextFunction) => {
    const { templateId, userEmails } = req.body;

    const template = await EmailTemplate.findByPk(templateId);
    if (!template) {
        return next(new AppError(400, 'Template not found'));
    }
    console.log(userEmails)
    // users.forEach(user => {
    //     emailQueue.add({ user, template, replacements: { name: user.name } });
    // });

    sendSuccessResponse(res, 200, 'Emails are being processed.');
};