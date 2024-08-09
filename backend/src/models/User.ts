import { DataTypes, Model } from 'sequelize';
import sequelize from '@config/database.config';
import { v7 as uuidV7 } from 'uuid';

class User extends Model {
    public id!: string;
    public email!: string;
    public password!: string;
    public isVerified!: boolean;
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidV7(),
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    defaultScope: {
        attributes: { exclude: ['password'] },
    },
    scopes: {
        withPassword: {
            attributes: { include: ['id', 'password'] }, // Include password when explicitly requested
        },
    },
});

export default User;
