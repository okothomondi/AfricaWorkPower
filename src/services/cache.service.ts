import Redis from 'ioredis';
import config from '../configurations/config';
import logger from '../utils/logger';

class CacheService {
  private client: Redis;
  private ttl: number;

  constructor() {
    this.client = new Redis({
      host: config.redis.host,
      port: config.redis.port,
    });
    this.ttl = config.redis.cacheTtl;

    this.client.on('connect', () => {
      logger.info('Connected to Redis');
    });

    this.client.on('error', (error) => {
      logger.error(`Redis error: ${error}`);
    });
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      logger.error(`Cache get error: ${error}`);
      return null;
    }
  }

  async set(key: string, value: string): Promise<void> {
    try {
      await this.client.setex(key, this.ttl, value);
    } catch (error) {
      logger.error(`Cache set error: ${error}`);
    }
  }

  async clear(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      logger.error(`Cache clear error: ${error}`);
    }
  }
}

export default new CacheService();
