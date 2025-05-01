import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  github: {
    apiUrl: string;
    token: string;
  };
  redis: {
    host: string;
    port: number;
    cacheTtl: number;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000'),
  nodeEnv: process.env.NODE_ENV || 'development',
  github: {
    apiUrl: process.env.GITHUB_API_URL || 'https://api.github.com',
    token: process.env.GITHUB_TOKEN || '',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    cacheTtl: parseInt(process.env.REDIS_CACHE_TTL || '300'),
  },
  rateLimit: {
    windowMs: parseInt(process.env.API_RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    max: parseInt(process.env.API_RATE_LIMIT_MAX || '100'),
  },
};

export default config;
