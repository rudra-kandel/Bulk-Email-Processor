import { Sequelize } from 'sequelize';
import config from './env.config';
import seedEmailTemplates from '@seeders/emailTemplate.seeder';
const { password, user, host, databaseName } = config;

const sequelize = new Sequelize(
    databaseName as string,
    user as string,
    password as string,
    {
        host,
        dialect: 'postgres',
    }
);

// Function to initialize and authenticate the database
export const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        await sequelize.sync({ alter: true });
        // await seedEmailTemplates(sequelize)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit process with a failure code
    }
};

export default sequelize;
