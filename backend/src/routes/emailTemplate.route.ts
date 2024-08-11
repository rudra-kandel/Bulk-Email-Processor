import { getEmailTemplates } from '@controllers/emailTemplate.controller';
import { Router } from 'express';

const router = Router();

router.get('/', getEmailTemplates);

export default router;
