import { Sequelize } from 'sequelize';
import config from './env.config';
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

        // Optionally, you can sync the models to the database:
        // await sequelize.sync({ force: false }); // Use { force: true } to drop and recreate the tables
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit process with a failure code
    }
};

export default sequelize;
