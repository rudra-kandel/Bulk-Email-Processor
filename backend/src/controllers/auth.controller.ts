import { ILoginUser, IRegisterUser } from '@interfaces/user';
import { loginUser, registerUser, verifyUserEmail } from '@services/user.service';
import { getEmailVerificationToken, verifyToken } from '@utils/authUtils';
import { sendSuccessResponse } from '@utils/response';
import { NextFunction, Request, Response } from 'express';
import httpContext from 'express-http-context';
import httpStatus from 'http-status';
import config from '@config/env.config'
import { getOneTemplateByName } from '@services/emailTemplate.service';
import { sendMail } from '@utils/sendEmail.util';
const { appUrl } = config

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userDto: IRegisterUser = req.body;

        const newUser = await registerUser(userDto);

        // Generate a verification token
        const verificationToken = getEmailVerificationToken(newUser.id)

        const verificationLink = `${appUrl}/auth/verify-email/${verificationToken}`

        // TODO: Send verification email with the token
        const template = await getOneTemplateByName('Account Verification')
        sendMail(template, newUser.email, verificationLink);

        return sendSuccessResponse(res, httpStatus.CREATED, "Registered Sucessfully.Please check your email for verification")
    } catch (error) {
        next(error)
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userLoginDto: ILoginUser = req.body

        const token = await loginUser(userLoginDto);

        return sendSuccessResponse(res, httpStatus.OK, "Login Sucessful", token)
    } catch (error) {
        next(error)
    }
};

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.params;
        const decoded = verifyToken(token)

        await verifyUserEmail(decoded.userId);

        return sendSuccessResponse(res, httpStatus.OK, 'Email verified successfully')
    } catch (error) {
        next(error)
    }
};

export { login, register, verifyEmail };

