const express = require("express");
const passport = require("passport");
const { createRouter } = require("../../src/domain/router");

const router = createRouter();

describe("createRouter", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const requiredMethods = ["get", "post", "put", "patch", "delete"];

  describe(`has ${requiredMethods.join(", ")} methods`, () => {
    requiredMethods.forEach(method => {
      test(`should return a router that has "${method}" method`, () => {
        expect(router).toHaveProperty(method);
        expect(typeof router[method]).toBe("function");
      });
    });
  });

  test("uses auth when enabled on config", () => {
    const spyAuth = jest.spyOn(passport, "authenticate");
    const spyRouter = jest.spyOn(express, "Router").mockReturnValue({
      use: () => {}
    });
    createRouter({ requireAuth: true });
    expect(spyRouter).toHaveBeenCalledTimes(1);
    expect(spyAuth).toHaveBeenCalledTimes(1);
    expect(spyAuth).toHaveBeenCalledWith("jwt", { session: false });
  });

  test("doesn't use auth when not enabled on config", () => {
    const spyAuth = jest.spyOn(passport, "authenticate");
    const spyRouter = jest.spyOn(express, "Router").mockReturnValue({
      use: () => {}
    });
    createRouter({ requireAuth: false });
    expect(spyRouter).toHaveBeenCalledTimes(1);
    expect(spyAuth).toHaveBeenCalledTimes(0);
  });
});
