import EmailTemplate from "@models/EmailTemplate";
import { emailQueue } from "@queues/email.queue";

// export const sendBulkEmails = async (templateId: string, userList: string[]) => {
//     userList.forEach(async (user) => {
//         await emailQueue('emailQueue', { templateId, email: user.email });
//     });
//     // sendSuccessResponse(res, 202, 'Emails are being processed in the background');
// };

export const getOneTemplateById = async (templateId: string) => {
    const template = await EmailTemplate.findByPk(templateId);
    if (!template) {
        throw new Error('Template not found');
    }

    return template
}

export const getOneTemplateByName = async (templateName: string) => {
    const template = await EmailTemplate.findOne({
        where: { name: templateName }
    })
    if (!template) {
        throw new Error('Template not found');
    }

    return template;
}
