import { app } from '../src/index';

describe('GET /api/health ', () => {
  it('should return status ok', async () => {
    const response = await app.request('/api/health');
    const responseJson = await response.json();
    expect(response.status).toBe(200);
    expect(responseJson).toEqual({
      resultCode: 200,
      resultMessage: 'ok',
    });
  });
});
