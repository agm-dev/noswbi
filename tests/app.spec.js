const app = require("../src/app");

describe("App", () => {
  const exportedMethods = ["createServer", "createRouter"];

  exportedMethods.forEach(method => {
    test(`should export ${method} method`, () => {
      expect(app).toHaveProperty(method);
      expect(typeof app[method]).toBe("function");
    });
  });
});
