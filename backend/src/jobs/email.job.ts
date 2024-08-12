
import { EmailMessage } from "@interfaces/email";
import { saveEmailLog } from "@services/emailLog.service";
import { sendMail } from "@utils/sendEmail.util";

export const processEmailJob = async (jobData: EmailMessage) => {
    try {
        const { template, userEmail, userId } = jobData;
        await sendMail(template, userEmail);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw error;
    }
};
