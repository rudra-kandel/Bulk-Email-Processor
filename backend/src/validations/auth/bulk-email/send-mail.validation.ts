import Joi from 'joi';

export const bulkEmailValidationSchema = Joi.object({
    templateId: Joi.string().guid({ version: 'uuidv7' }).required().messages({
        'string.empty': 'Email is required',
        'string.guid': 'Please include a valid uuid',
    }),
    userEmails: Joi.array()
        .items(Joi.string().email().required())
        .required()
        .messages({
            'array.base': 'User emails must be an array',
            'array.includesRequiredUnknowns': 'All items in the array must be valid emails',
            'array.empty': 'User emails cannot be empty',
            'string.empty': 'Each email is required',
            'string.email': 'Invalid email address',
        }),
});
