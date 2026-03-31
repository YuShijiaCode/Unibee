"use strict";

const ApiClient = require("./apiClient");

class UnibeeApi {
  constructor(options = {}) {
    this.apiClient = new ApiClient(options);
  }

  login(credentials) {
    return this.apiClient.post("/api/v1/auth/login", credentials);
  }

  getPlans(params = {}) {
    return this.apiClient.get("/api/v1/plans", { params });
  }

  createPlan(payload) {
    return this.apiClient.post("/api/v1/plans", payload);
  }

  getSubscriptions(params = {}) {
    return this.apiClient.get("/api/v1/subscriptions", { params });
  }
}

module.exports = UnibeeApi;
