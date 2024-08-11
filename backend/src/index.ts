import app from './app';
import logger from './utils/logger';
import { Server } from 'http';
import dotenv from 'dotenv'
import { closeConnection } from '@config/rabbitmq.config';
import { initializeSocket } from '@socket/socket';

dotenv.config();

const port = Number(process.env.PORT) || 3000

const server: Server = new Server(app);

//Initialize socket
initializeSocket(server);

server.listen(port, (): void => {
  logger.info(`Server started in http://localhost:${port}`);
});

const shutDownRabbitMQ = async () => {
  logger.info("Shutting Down RabbitMQ......")
  await closeConnection();
  logger.info("RabbitMQ ShutDown Completed")
}
const unexpectedErrorHandler = async (error: Error): Promise<void> => {
  logger.error(error);
  await shutDownRabbitMQ()
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  }
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', async (error: Error) => {
  await unexpectedErrorHandler(error);
  process.exit(1);
});

process.on('SIGTERM', unexpectedErrorHandler);
process.on('SIGINT', unexpectedErrorHandler);
