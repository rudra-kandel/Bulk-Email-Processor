import express, { NextFunction } from 'express';
import EmailTemplate from '@models/EmailTemplate';
import { sendSuccessResponse } from '@utils/response';
import httpStatus from 'http-status';

// Controller to fetch all email templates
export const getEmailTemplates = async (req: express.Request, res: express.Response) => {
    try {
        const templates = await EmailTemplate.findAll();
        sendSuccessResponse(res, httpStatus.OK, 'Email templates fetched successfully', templates)
        // res.status(200).json({
        //     status: 'success',
        //     message: 'Email templates fetched successfully',
        //     data: templates,
        // });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: {
                code: 'FETCH_TEMPLATES_FAILED',
                message: 'Failed to fetch email templates',
            },
        });
    }
};
