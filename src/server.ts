import app from './app';
import config from './utils/config';
import db from './models';
import logger from './utils/logger';

const PORT = config.port;

// Initialize database connection
db.sequelize
  .sync()
  .then(() => {
    logger.info('Database connected');

    // Start the server
    app.listen(PORT, () => {
      logger.info(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    logger.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (error: Error) => {
  logger.error(`Unhandled Rejection: ${error.message}`);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});
