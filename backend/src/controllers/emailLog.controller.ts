import EmailLog from "@models/EmailLog";
import User from "@models/User";
import { getEmailLogsByUserId } from "@services/emailLog.service";
import { sendSuccessResponse } from "@utils/response";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import httpContext from 'express-http-context';

const allLogsOfUser = async (req: Request, res: Response, next: NextFunction) => {
    const userContext = httpContext.get('user');
    const { page, limit } = req.query;
    const { count, rows } = await getEmailLogsByUserId(userContext.userId, Number(page), Number(limit));

    return sendSuccessResponse(res, httpStatus.CREATED, "Registered Sucessfully.Please check your email for verification", rows, { count })
};