import { sendBulkEmails } from '@controllers/send-email.controller';
import authentication from '@middlewares/auth.middleware';
import validateRequest from '@middlewares/validateRequest.middleware';
import { Router } from 'express';
import { bulkEmailValidationSchema } from 'validations/auth/bulk-email/send-mail.validation';

const router = Router();

router.post('/', [validateRequest(bulkEmailValidationSchema), authentication], sendBulkEmails);

export default router;
