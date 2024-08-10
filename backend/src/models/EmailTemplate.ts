import { Model, DataTypes } from 'sequelize';
import sequelize from '@config/database.config'
import { v7 as uuidV7 } from 'uuid'

class EmailTemplate extends Model {
    declare id: string;
    declare name: string;
    declare subject: string;
    declare body: string;
}

EmailTemplate.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidV7,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'EmailTemplate',
    tableName: 'email_templates',
    timestamps: true,
});

export default EmailTemplate;
