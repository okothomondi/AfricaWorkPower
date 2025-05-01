import GitHubService from '../../src/services/github.service';
import axios from 'axios';
import sinon from 'sinon';
import { CustomError } from '../../src/interfaces/error.interface';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GitHubService', () => {
  describe('getUsers', () => {
    it('should return transformed users', async () => {
      const mockUsers = [
        { login: 'user1', id: 1, avatar_url: 'http://example.com/avatar1' },
      ];

      mockedAxios.get.mockResolvedValue({ data: mockUsers });

      const result = await GitHubService.getUsers();

      expect(result).toEqual([
        {
          username: 'user1',
          identifier: 1,
          profile_image: 'http://example.com/avatar1',
        },
      ]);
    });

    it('should handle API errors', async () => {
      mockedAxios.get.mockRejectedValue({
        response: { status: 403, data: { message: 'API rate limit exceeded' } },
      });

      await expect(GitHubService.getUsers()).rejects.toThrow(
        'Rate limit exceeded'
      );
    });
  });
});
