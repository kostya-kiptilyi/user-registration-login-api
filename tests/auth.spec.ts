import { test, expect, request } from '@playwright/test';

test('User registration and login', async () => {
  const context = await request.newContext();

  // Generate a unique email using the current timestamp
  const email = `user${Date.now()}@example.com`;
  const password = 'password123';

  // Registration
  const registerResponse = await context.post('/register', {
    data: { email, password }
  });

  // Expect status 201 Created
  expect(registerResponse.status()).toBe(201);

  const registerBody = await registerResponse.json();

  // Expect a token to be returned on successful registration
  expect(registerBody).toHaveProperty('accessToken');

  // Login
  const loginResponse = await context.post('/login', {
    data: { email, password }
  });

  // Expect status 200 OK
  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();

  // Expect a token to be returned on successful login
  expect(loginBody).toHaveProperty('accessToken');
});