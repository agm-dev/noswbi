const { createRouter } = require("../../src/domain/router");

const router = createRouter();

describe("createRouter", () => {
  const requiredMethods = ["get", "post", "put", "patch", "delete"];

  requiredMethods.forEach(method => {
    test(`should return a router that has "${method}" method`, () => {
      expect(router).toHaveProperty(method);
      expect(typeof router[method]).toBe("function");
    });
  });
});
