const request = require('supertest');
const server = require('./server');

describe('Test example', () => {
  test('/test endpoint', async () => {
    const response = await request(server).get('/test');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});

afterAll((done) => {
  server.close();
  done();
});
