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
                body: '<h1>Welcome! {{userEmail}} </h1><p>Thank you for joining us.</p>',
            },
            {
                name: 'Password Reset',
                subject: 'Reset Your Password',
                body: '<h1>{{userEmail}} </h1> <p> Click <a href="{link}">here</a> to reset your password.</p>',
            },
            {
                name: 'Account Verification',
                subject: 'Verify Your Account',
                body: '<h1>Verify Your Email</h1><p>Dear {{userEmail}}, please click <a href="{{link}}" target="_blank">here</a> to verify your account.</p>',
            },
            {
                name: 'Order Confirmation',
                subject: 'Your Order has been Confirmed!',
                body: '<h1>Order Confirmation</h1><p>Thank you for your purchase, {{userEmail}}! Hope you order again.</p>',
            },
            {
                name: 'Shipping Notification',
                subject: 'Your Order is on its Way!',
                body: '<h1>Shipping Notification</h1><p>Hi {{userEmail}}, your order has been shipped. Track it <a href="{{link}}">here</a>.</p>',
            },
            {
                name: 'Subscription Renewal Reminder',
                subject: 'Your Subscription is About to Expire',
                body: '<h1>Subscription Renewal Reminder</h1><p>Dear {{userEmail}}, your subscription will soon. Renew it <a href="{{link}}">here</a>.</p>',
            },
            {
                name: 'Event Invitation',
                subject: 'You’re Invited to Our Event!',
                body: '<h1>Event Invitation</h1><p>Hello {{userEmail}}, we’re excited to invite you to our upcoming event. Click <a href="{{link}}">here</a> for more details.</p>',
            },
            {
                name: 'Feedback Request',
                subject: 'We Value Your Feedback',
                body: '<h1>Feedback Request</h1><p>Hi {{userEmail}}, we’d love to hear your thoughts on our service. Please provide your feedback <a href="{{link}}">here</a>.</p>',
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
