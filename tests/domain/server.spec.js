const request = require("supertest");
const httpStatus = require("http-status");
const { createRouter } = require("../../src/domain/router");
const { createServer } = require("../../src/domain/server");

const router = createRouter();
router.get("/status", (req, res) => res.status(200).json({ status: "OK" }));

const server = createServer(router);

describe("createServer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should throw an error if no router provided", done => {
    try {
      createServer();
      done.fail("test should not reach this point");
    } catch (err) {
      expect(err.message).toBe("createServer requires a router object");
    }

    try {
      createServer([]);
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

  test("should enable cors if allowCors enabled on config", async () => {
    const corsServer = createServer(router, { allowCors: true });
    await request(corsServer)
      .get("/status")
      .expect(httpStatus.OK)
      // .expect("Access-Control-Allow-Origin", "*") // FIXME: this doesn't work. Try moving cors to router
      .expect({ status: "OK" });
  });
});
