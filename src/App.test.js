const request = require("supertest");
const server = require("./server");

describe("Test example", () => {
  test("/test endpoint", () => {
    request(server)
      .get("/test")
      .expect(200)
      .expect((res) => {
        res.body.data = "Hello World!"
      });
  })
});
