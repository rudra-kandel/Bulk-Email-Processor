import { allLogsOfUser } from '@controllers/emailLog.controller';
import authentication from '@middlewares/auth.middleware';
import { getEmailLogsByUserId } from '@services/emailLog.service';
import { Router } from 'express';

const router = Router();

router.get('/', authentication, allLogsOfUser);

export default router;
