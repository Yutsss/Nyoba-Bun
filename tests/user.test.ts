import { app } from '../src/index';
import { UserTestUtils } from './test-utils';

describe('POST /api/user/register ', () => {
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

describe('POST /api/user/login', () => {
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
