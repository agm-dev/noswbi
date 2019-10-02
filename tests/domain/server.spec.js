const request = require("supertest");
const httpStatus = require("http-status");
const { createRouter } = require("../../src/domain/router");
const { createServer } = require("../../src/domain/server");

const router = createRouter();
router.get("/status", (req, res) => {
  res.set("Content-Type", "application/json"); // FIXME: this shouldn't be required, but tests fails randomly without forcing content type here... :/
  res.status(200);
  res.json({ status: "OK" });
});

const server = createServer(router);

describe("createServer", () => {
  test("should throw an error if no router provided", done => {
    try {
      createServer();
      done.fail("test should not reach this point");
    } catch (err) {
      done();
    }
  });

  test("should create a server with provided router", async () => {
    await request(server)
      .get("/status")
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK, { status: "OK" });
  });

  test("should return 404 not found response", async () => {
    await request(server)
      .get("/thisdoesnotexist")
      .expect("Content-Type", /json/)
      .expect(httpStatus.NOT_FOUND, {
        status: httpStatus.NOT_FOUND,
        message: "Requested route doesn't exist"
      });
  });
});
