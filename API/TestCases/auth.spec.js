"use strict";

const assert = require("assert");
const path = require("path");
const UnibeeApi = require("../../Common/API/unibeeApi");
const config = require("../../Common/config");
const { loadJson } = require("../../Common/testDataLoader");

describe("Unibee API - Authentication", function () {
  const unibeeApi = new UnibeeApi({
    baseURL: config.api.baseUrl
  });

  it("should login successfully and return a response", async function () {
    const payload = loadJson(path.join("API", "TestData", "loginPayload.json"));
    const requestBody = {
      username: process.env.API_USERNAME || payload.username || config.api.username,
      password: process.env.API_PASSWORD || payload.password || config.api.password
    };

    const response = await unibeeApi.login(requestBody);

    assert.ok(response.status >= 200 && response.status < 300, "Login API did not return a success status");
    assert.ok(response.data, "Response body should not be empty");
  });
});
