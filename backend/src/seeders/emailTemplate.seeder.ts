import EmailTemplate from '@models/EmailTemplate'; // Adjust import based on your setup
import logger from '@utils/logger';
import { Sequelize } from 'sequelize';

const seedEmailTemplates = async (): Promise<void> => {
    try {
        // await sequelize.authenticate();
        // await sequelize.sync()
        const existingTemplateCount = await EmailTemplate.count();
        if (existingTemplateCount > 0) {
            logger.info("Email templates already exists. Skipping seeding......")
            return;
        }
        const templates = [
            {
                name: 'Welcome Email',
                subject: 'Welcome to Our Service!',
                body: '<h1>Welcome!</h1><p>Thank you for joining us.</p>',
            },
            {
                name: 'Password Reset',
                subject: 'Reset Your Password',
                body: '<p>Click <a href="{resetLink}">here</a> to reset your password.</p>',
            },
        ];

        await Promise.all(templates.map(template =>
            EmailTemplate.create(template)
        ));
        logger.info('Email templates seeded successfully.');
    } catch (error) {
        logger.error('Failed to seed email templates:', error)
        throw error;
    }
};

// seedEmailTemplates().catch(err => console.error('Failed to seed email templates:', err));

export default seedEmailTemplates
