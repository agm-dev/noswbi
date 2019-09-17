const server = require("../../src/config/server");

describe("server", () => {
  const requiredMethods = ["set", "use", "listen"];

  requiredMethods.forEach(method => {
    test(`should have ${method} method`, () => {
      expect(server).toHaveProperty(method);
      expect(typeof server[method]).toBe("function");
    });
  });
});
