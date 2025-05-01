import request from 'supertest';
import app from '../../src/app';
import db from '../../src/models';
import Redis from 'ioredis';
import { redisMock } from '../../src/mocks/redis.mock';

jest.mock('ioredis', () => require('../../src/mocks/redis.mock'));

describe('Users API', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await db.sequelize.close();
    jest.clearAllMocks();
  });

  describe('GET /api/users', () => {
    it('should return 200 with users data', async () => {
      redisMock.get.mockResolvedValue(null);

      const response = await request(app).get('/api/users').expect(200);

      expect(response.body.users).toBeInstanceOf(Array);
      expect(redisMock.set).toHaveBeenCalled();
    });

    it('should return cached data', async () => {
      const cachedData = {
        users: [{ username: 'cached', identifier: 1, profile_image: 'test' }],
      };
      redisMock.get.mockResolvedValue(JSON.stringify(cachedData));

      const response = await request(app).get('/api/users').expect(200);

      expect(response.body).toEqual(cachedData);
    });
  });
});
