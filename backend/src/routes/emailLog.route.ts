import { Router } from 'express';
import { register, login, verifyEmail } from '../controllers/auth.controller';
import validateRequest from '@middlewares/validateRequest.middleware';
import { registerValidationSchema } from '../validations/auth/register.validation';
import { loginValidationSchema } from '../validations/auth/login.validation';
import authentication from '@middlewares/auth.middleware';

const router = Router();

router.get('/', authentication, register);

export default router;
