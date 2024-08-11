// src/models/emailLog.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '@config/database.config';
import { v7 as uuidV7 } from 'uuid'
import EmailTemplate from './EmailTemplate';
import User from './User';

export class EmailLog extends Model {
    declare id: string
}

EmailLog.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidV7,
        primaryKey: true,
    },
    templateId: {
        type: DataTypes.UUID,
        references: {
            model: EmailTemplate,
            key: 'id'
        },
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['sent', 'failed', 'retry']],
        },
    },
    errorMessage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    retryCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'EmailLog',
    tableName: 'email_logs'
});

EmailLog.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export default EmailLog