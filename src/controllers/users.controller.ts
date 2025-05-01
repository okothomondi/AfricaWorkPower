import { Request, Response } from 'express';
import GitHubService from '../services/github.service';
import CacheService from '../services/cache.service';
import logger from '../utils/logger';

const CACHE_KEY = 'github_users';

class UsersController {
  async getUsers(req: Request, res: Response) {
    try {
      // Check cache first
      const cachedData = await CacheService.get(CACHE_KEY);
      if (cachedData) {
        logger.info('Serving users from cache');
        return res.json(JSON.parse(cachedData));
      }

      // Fetch from GitHub if not in cache
      const users = await GitHubService.getUsers();
      const responseData = { users };

      // Cache the response
      await CacheService.set(CACHE_KEY, JSON.stringify(responseData));

      res.json(responseData);
    } catch (error) {
      logger.error(`Error fetching users: ${error}`);
      res.status(500).json({
        error: 'Failed to fetch users',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

export default new UsersController();
