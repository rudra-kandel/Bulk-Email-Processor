import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '@config/env.config';
const { saltRounds, jwtSecret } = config

// Hash Password
export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, saltRounds);
};

// Verify Password
export const checkPassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

// Generate Email Verification Token
export const getEmailVerificationToken = (userId: string): string => {
    return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
};

// Generate Access Token
export const getAccessToken = (userId: string): string => {
    return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
};

// Generate Refresh Token
export const getRefreshToken = (userId: string): string => {
    return jwt.sign({ userId }, jwtSecret, { expiresIn: '7d' });
};  