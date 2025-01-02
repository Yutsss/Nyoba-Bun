import { appLogger } from '../src/configs/logger';
import { app } from '../src/index';
import { UserTestUtils } from './test-utils';

describe('POST /api/users/register ', () => {
  afterEach(async () => {
    await UserTestUtils.delete();
  });

  it('should success registering user', async () => {
    const response = await app.request('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@mail.com',
        name: 'test',
        password: 'test1234',
      }),
    });
    const responseJson: any = await response.json();
    expect(response.status).toBe(201);
    expect(responseJson.data.name).toBe('test');
    expect(responseJson.data.email).toBe('test@mail.com');
  });

  it('should fail registering user when user exist', async () => {
    await UserTestUtils.create();

    const response = await app.request('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@mail.com',
        name: 'test',
        password: 'test1234',
      }),
    });

    const responseJson: any = await response.json();
    expect(response.status).toBe(409);
    expect(responseJson.errorCode).toBe(409);
    expect(responseJson.data).toBeUndefined();
  });

  it('should fail registering user when email is empty', async () => {
    const response = await app.request('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({
        email: '',
        name: 'test',
        password: 'test1234',
      }),
    });

    const responseJson: any = await response.json();
    expect(response.status).toBe(400);
    expect(responseJson.errorCode).toBe(400);
    expect(responseJson.data).toBeUndefined();
  });

  it('should fail registering user when name is empty', async () => {
    const response = await app.request('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@mail.com',
        name: '',
        password: 'test1234',
      }),
    });

    const responseJson: any = await response.json();
    expect(response.status).toBe(400);
    expect(responseJson.errorCode).toBe(400);
    expect(responseJson.data).toBeUndefined();
  });

  it('should fail registering user when password length less than 8', async () => {
    const response = await app.request('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@mail.com',
        name: 'test',
        password: 'test',
      }),
    });

    const responseJson: any = await response.json();
    expect(response.status).toBe(400);
    expect(responseJson.errorCode).toBe(400);
    expect(responseJson.data).toBeUndefined();
  });
});

describe('POST /api/users/login', () => {
  afterEach(async () => {
    await UserTestUtils.delete();
  });

  it('should success login user', async () => {
    await UserTestUtils.create();

    const response = await app.request('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@mail.com',
        password: 'test1234',
      }),
    });

    const responseJson: any = await response.json();
    expect(response.status).toBe(200);
    expect(responseJson.data.accessToken).toBeDefined();
  });

  it('should fail login user when user not found', async () => {
    const response = await app.request('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test2@mail.com',
        password: 'test1234',
      }),
    });

    const responseJson: any = await response.json();
    expect(response.status).toBe(401);
    expect(responseJson.errorCode).toBe(401);
    expect(responseJson.data).toBeUndefined();
  });

  it('should fail login user when password is wrong', async () => {
    await UserTestUtils.create();

    const response = await app.request('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@mail.com',
        password: 'test12345',
      }),
    });

    const responseJson: any = await response.json();
    expect(response.status).toBe(401);
    expect(responseJson.errorCode).toBe(401);
    expect(responseJson.data).toBeUndefined();
  });

  it('should fail login user when email is empty', async () => {
    const response = await app.request('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email: '',
        password: 'test1234',
      }),
    });

    const responseJson: any = await response.json();
    expect(response.status).toBe(400);
    expect(responseJson.errorCode).toBe(400);
    expect(responseJson.data).toBeUndefined();
  });

  it('should fail login user when password is empty', async () => {
    const response = await app.request('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@mail.com',
        password: '',
      }),
    });

    const responseJson: any = await response.json();
    expect(response.status).toBe(400);
    expect(responseJson.errorCode).toBe(400);
    expect(responseJson.data).toBeUndefined();
  });
});

describe('GET /api/users/me', () => {
  afterEach(async () => {
    await UserTestUtils.delete();
  });

  it('should success get user', async () => {
    await UserTestUtils.create();

    const loginResponse = await app.request('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@mail.com',
        password: 'test1234',
      }),
    });

    const loginResponseJson: any = await loginResponse.json();
    const accessToken = loginResponseJson.data.accessToken;

    const response = await app.request('/api/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseJson: any = await response.json();
    expect(response.status).toBe(200);
    expect(responseJson.data.name).toBe('test');
    expect(responseJson.data.email).toBe('test@mail.com');
  });

  it('should fail get user when user not found', async () => {
    await UserTestUtils.create();

    const loginResponse = await app.request('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@mail.com',
        password: 'test1234',
      }),
    });

    const loginResponseJson: any = await loginResponse.json();
    const accessToken = loginResponseJson.data.accessToken;

    appLogger.info(accessToken);

    await UserTestUtils.deleteByEmail('test@mail.com');

    const response = await app.request('/api/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseJson: any = await response.json();
    expect(response.status).toBe(401);
    expect(responseJson.errorCode).toBe(401);
    expect(responseJson.data).toBeUndefined();
  });

  it('should fail get user when token is invalid', async () => {
    const response = await app.request('/api/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer invalidtoken`,
      },
    });

    const responseJson: any = await response.json();
    expect(response.status).toBe(401);
    expect(responseJson.errorCode).toBe(401);
    expect(responseJson.data).toBeUndefined();
  });

  it('should fail get user when token is empty', async () => {
    const response = await app.request('/api/users/me', {
      method: 'GET',
    });

    const responseJson: any = await response.json();
    expect(response.status).toBe(401);
    expect(responseJson.errorCode).toBe(401);
    expect(responseJson.data).toBeUndefined();
  });

  it('should fail get user when token is expired', async () => {
    await UserTestUtils.create();

    const testUser = await UserTestUtils.findByName('test');

    if (!testUser) {
      appLogger.error('Test user not found');

      return;
    }

    const expiredToken = await UserTestUtils.generateExpiredToken(testUser.id);

    const response = await app.request('/api/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${expiredToken}`,
      },
    });

    const responseJson: any = await response.json();
    expect(response.status).toBe(401);
    expect(responseJson.errorCode).toBe(401);
    expect(responseJson.errorMessage).toBe('Token expired, please login again');
    expect(responseJson.data).toBeUndefined();
  });
});
