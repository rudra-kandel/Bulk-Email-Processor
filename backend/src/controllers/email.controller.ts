import express from 'express';
import EmailTemplate from '@models/EmailTemplate'; // Adjust import based on your setup

const router = express.Router();

// Controller to fetch all email templates
const getEmailTemplates = async (req: express.Request, res: express.Response) => {
    try {
        const templates = await EmailTemplate.findAll();
        res.status(200).json({
            status: 'success',
            message: 'Email templates fetched successfully',
            data: templates,
        });
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

// Route to get email templates
router.get('/templates', getEmailTemplates);

export default router;
