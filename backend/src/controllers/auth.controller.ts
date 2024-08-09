import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User';
import AppError from '@utils/error';
import httpStatus from 'http-status';
import httpContext from 'express-http-context'
import { checkPassword, getAccessToken, getEmailVerificationToken, hashPassword } from '@utils/authUtils';
import { sendSuccessResponse } from '@utils/response';

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    //check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return next(new AppError(httpStatus.BAD_REQUEST, 'User already exists'));
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    // Generate a verification token
    const verificationToken = getEmailVerificationToken(newUser.id)

    // TODO: Send verification email with the token

    return sendSuccessResponse(res, httpStatus.CREATED, "Registered Sucessfully.Please check your email for verification")
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.scope('withPassword').findOne({ where: { email } });
    if (!user) {
        return next(new AppError(httpStatus.NOT_FOUND, "Invalid Credentials"))
    }

    const isMatch = await checkPassword(password, user.password)
    if (!isMatch) {
        return next(new AppError(httpStatus.NOT_FOUND, "Invalid Credentials"))
    }

    if (!user.isVerified) {
        return next(new AppError(httpStatus.NOT_FOUND, 'Please verify your email'))
    }

    const token = getAccessToken(user.id)
    return sendSuccessResponse(res, httpStatus.OK, "Login Sucessful", token)
};

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    const userContext = httpContext.get('user');
    const user = await User.findByPk(userContext.userId);

    if (!user) {
        return next(new AppError(httpStatus.BAD_REQUEST, "User not found"))
    }

    user.isVerified = true;
    await user.save();

    return res.json({ message: 'Email verified successfully' });
};

export { register, login, verifyEmail };
