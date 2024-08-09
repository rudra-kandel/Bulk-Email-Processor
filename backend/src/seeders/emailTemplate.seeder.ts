import EmailTemplate from '@models/EmailTemplate'; // Adjust import based on your setup

const seedEmailTemplates = async () => {
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
    console.log('Email templates seeded successfully.');
};

seedEmailTemplates().catch(err => console.error('Failed to seed email templates:', err));
