
import { saveEmailLog } from "@services/emailLog.service";

export const processEmailJob = async (jobData: any) => {
    try {
        const { templateId, email } = jobData;
        // const template = await findTemplateById(templateId);
        // await sendEmail(template, email);
        // await saveEmailLog(templateId, email, 'sent');
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        // await saveEmailLog(jobData.templateId, jobData.email, 'failed', errorMessage);
        throw error;
    }
};
