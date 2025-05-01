import axios, { AxiosInstance, AxiosError } from 'axios';
import config from '../configurations/config';
import logger from '../utils/logger';
import { retryWithExponentialBackoff } from '../utils/retry';

interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
}

interface TransformedUser {
  username: string;
  identifier: number;
  profile_image: string;
}

class GitHubService {
  private api: AxiosInstance;
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.github.apiUrl;
    this.api = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `token ${config.github.token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      timeout: 10000,
    });
  }

  private transformUserData(users: GitHubUser[]): TransformedUser[] {
    return users.map((user) => ({
      username: user.login,
      identifier: user.id,
      profile_image: user.avatar_url,
    }));
  }

  async getUsers(): Promise<TransformedUser[]> {
    const endpoint = '/users';

    try {
      const response = await retryWithExponentialBackoff(
        () => this.api.get<GitHubUser[]>(endpoint),
        {
          maxRetries: 3,
          initialDelayMs: 1000,
        }
      );

      return this.transformUserData(response.data);
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  private handleError(error: AxiosError): void {
    if (error.response) {
      // GitHub API error response
      const { status, data } = error.response;

      logger.error(`GitHub API Error: ${status} - ${JSON.stringify(data)}`);

      switch (status) {
        case 401:
        case 403:
          throw new Error(
            'Authentication failed. Please check your GitHub token.'
          );
        case 429:
          throw new Error('Rate limit exceeded. Please try again later.');
        default:
          throw new Error(`GitHub API error: ${status}`);
      }
    } else if (error.request) {
      // No response received
      logger.error('No response from GitHub API');
      throw new Error(
        'No response from GitHub API. Please check your network connection.'
      );
    } else {
      // Request setup error
      logger.error(`Error setting up GitHub API request: ${error.message}`);
      throw new Error(`Failed to setup GitHub API request: ${error.message}`);
    }
  }
}

export default new GitHubService();
