import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './utils/swagger.json';
import config from './utils/config';
import ErrorMiddleware from './middlewares/error.middleware';
import { requestLoggerMiddleware } from './middlewares/requestLogger.middleware';
import usersRouter from './routes/users.route';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(requestLoggerMiddleware);

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: 'Too many requests from this IP, please try again later',
});
app.use('/api', limiter);

// API Documentation
if (config.nodeEnv === 'development') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// Routes
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Africa Work Power API',
    documentation:
      config.nodeEnv === 'development'
        ? 'http://localhost:3000/api-docs'
        : undefined,
    endpoints: {
      users: '/api/users',
      health: '/health',
    },
    status: 'operational',
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Error handling
app.use(ErrorMiddleware.handleNotFound);
app.use(ErrorMiddleware.handleError);

export default app;
