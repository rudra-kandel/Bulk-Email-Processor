import { Router } from 'express';
import { register, login, verifyEmail } from '../controllers/auth.controller';
import validateRequest from '@middlewares/validateRequest.middleware';
import { registerValidationSchema } from '../validations/auth/register.validation';
import { loginValidationSchema } from '../validations/auth/login.validation';

const router = Router();
router.post('/login', validateRequest(loginValidationSchema), login);
router.post('/register', validateRequest(registerValidationSchema), register);


router.get('/verify/:token', verifyEmail);

export default router;
