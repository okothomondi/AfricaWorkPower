// src/middlewares/requestLogger.middleware.ts
import { Request, Response, NextFunction } from 'express';
import db from '../models';
import logger from '../utils/logger';

class RequestLoggerMiddleware {
  private static async logRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const start = Date.now();

    res.on('finish', async () => {
      const duration = Date.now() - start;

      try {
        await db.RequestLog.create({
          endpoint: req.originalUrl,
          method: req.method,
          status: res.statusCode,
          responseTime: duration,
          ip: req.ip || null,
          userAgent: req.get('User-Agent') || null,
        });

        logger.info(
          `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
        );
      } catch (error) {
        logger.error(`Failed to log request: ${error}`);
      }
    });

    next();
  }

  // Public static method to get the middleware function
  public static getMiddleware() {
    return this.logRequest;
  }
}

// Export the middleware function directly
export const requestLoggerMiddleware = RequestLoggerMiddleware.getMiddleware();
