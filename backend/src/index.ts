import app from './app';
import logger from './utils/logger';
import { Server } from 'http';
import dotenv from 'dotenv'

dotenv.config();

const port = Number(process.env.port) || 3000

const server: Server = app.listen(port, (): void => {
  logger.info(`Server started in http://localhost:${port}`);
});

const unexpectedErrorHandler = (error: Error): void => {
  logger.error(error);
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  }
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', (error: Error) => {
  throw error;
}); 
