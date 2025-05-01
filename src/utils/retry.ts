import logger from './logger';

interface RetryOptions {
  maxRetries: number;
  initialDelayMs: number;
}

export async function retryWithExponentialBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions
): Promise<T> {
  let retries = 0;
  let delay = options.initialDelayMs;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (retries >= options.maxRetries) {
        logger.error(`Max retries (${options.maxRetries}) exceeded`);
        throw error;
      }

      const waitTime = delay * 2 ** retries;
      logger.warn(
        `Attempt ${retries + 1} failed. Retrying in ${waitTime}.ms...`
      );

      await new Promise((resolve) => setTimeout(resolve, waitTime));
      retries++;
    }
  }
}
