
import { EmailMessage } from "@interfaces/email";
import { saveEmailLog } from "@services/emailLog.service";
import { sendMail } from "@utils/sendEmail.util";

export const processEmailJob = async (jobData: EmailMessage) => {
    try {
        console.log(4, "email job")
        console.log(jobData)
        const { template, userEmail, userId } = jobData;
        sendMail(template, userEmail);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        // await saveEmailLog(jobData.templateId, jobData.email, 'failed', errorMessage);
        throw error;
    }
};
