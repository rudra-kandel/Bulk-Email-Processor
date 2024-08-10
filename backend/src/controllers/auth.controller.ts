import { ILoginUser, IRegisterUser } from '@interfaces/user';
import { loginUser, registerUser, verifyUserEmail } from '@services/user.service';
import { getEmailVerificationToken } from '@utils/authUtils';
import { sendSuccessResponse } from '@utils/response';
import { NextFunction, Request, Response } from 'express';
import httpContext from 'express-http-context';
import httpStatus from 'http-status';

const register = async (req: Request, res: Response, next: NextFunction) => {
    const userDto: IRegisterUser = req.body;

    const newUser = await registerUser(userDto);

    // Generate a verification token
    const verificationToken = getEmailVerificationToken(newUser.id)

    // TODO: Send verification email with the token

    return sendSuccessResponse(res, httpStatus.CREATED, "Registered Sucessfully.Please check your email for verification")
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    const userLoginDto: ILoginUser = req.body

    const token = await loginUser(userLoginDto);

    return sendSuccessResponse(res, httpStatus.OK, "Login Sucessful", token)
};

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    const userContext = httpContext.get('user');

    await verifyUserEmail(userContext.userId);

    return sendSuccessResponse(res, httpStatus.OK, 'Email verified successfully')
};

export { login, register, verifyEmail };

