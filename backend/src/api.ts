import { Router } from 'express';
import authRoutes from '@routes/auth.route'
import emailTemplateRoutes from '@routes/emailTemplate.route'
import logRoutes from '@routes/emailLog.route'
import sendBulkEmailRoutes from '@routes/send-email.route'
import logger from '@utils/logger';

const api: Router = Router();

api.use('/auth', authRoutes)
api.use('/email-template', emailTemplateRoutes)
api.use('/logs', logRoutes)
api.use('/send-bulk-email', sendBulkEmailRoutes)

api.all("/*", (req, res) => {
    logger.info(`Path Not found: ${req.originalUrl}`)
    res.status(404).json({ status: false, message: "Route not found" });
})


export default api;
