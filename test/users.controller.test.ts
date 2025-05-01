import request from 'supertest';
import app from '../src/app';
import CacheService from '../src/services/cache.service';
import GitHubService from '../src/services/github.service';
import db from '../src/models';

describe('GET /api/users', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return transformed GitHub users', async () => {
    const mockUsers = [
      { login: 'user1', id: 1, avatar_url: 'http://example.com/avatar1' },
      { login: 'user2', id: 2, avatar_url: 'http://example.com/avatar2' },
    ];

    jest.spyOn(GitHubService, 'getUsers').mockResolvedValueOnce(
      mockUsers.map((user) => ({
        username: user.login,
        identifier: user.id,
        profile_image: user.avatar_url,
      }))
    );

    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      users: [
        {
          username: 'user1',
          identifier: 1,
          profile_image: 'http://example.com/avatar1',
        },
        {
          username: 'user2',
          identifier: 2,
          profile_image: 'http://example.com/avatar2',
        },
      ],
    });
  });

  it('should return cached data if available', async () => {
    const cachedData = {
      users: [
        {
          username: 'cachedUser',
          identifier: 99,
          profile_image: 'http://example.com/cached',
        },
      ],
    };

    jest
      .spyOn(CacheService, 'get')
      .mockResolvedValueOnce(JSON.stringify(cachedData));
    const githubSpy = jest.spyOn(GitHubService, 'getUsers');

    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(cachedData);
    expect(githubSpy).not.toHaveBeenCalled();
  });

  it('should handle GitHub API errors', async () => {
    jest
      .spyOn(GitHubService, 'getUsers')
      .mockRejectedValueOnce(new Error('API error'));

    const response = await request(app).get('/api/users');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Failed to fetch users');
  });
});
