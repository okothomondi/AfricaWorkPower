import db from '../../src/models';
import { RequestLog } from '../../src/models/requestLog.model';

describe('RequestLog Model', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  it('should create a request log', async () => {
    const log = await db.RequestLog.create({
      endpoint: '/test',
      method: 'GET',
      status: 200,
      responseTime: 100,
      ip: '127.0.0.1',
    });

    expect(log.id).toBeDefined();
    expect(log.endpoint).toBe('/test');
  });
});
