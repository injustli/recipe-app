const request = require("supertest");
const server = require("./server");

test("/test endpoint", async () => {
  const response = await request(server).get("/test");
  expect(response.status).toBe(200);
  expect(response.text).toBe("Hello World");
})
