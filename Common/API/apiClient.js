"use strict";

const axios = require("axios");

class ApiClient {
  constructor(options = {}) {
    const {
      baseURL = process.env.API_BASE_URL || "http://localhost:8080",
      timeout = Number(process.env.API_TIMEOUT || 15000),
      headers = {}
    } = options;

    this.client = axios.create({
      baseURL,
      timeout,
      headers: {
        "Content-Type": "application/json",
        ...headers
      }
    });
  }

  setAuthToken(token) {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  clearAuthToken() {
    delete this.client.defaults.headers.common.Authorization;
  }

  get(url, config = {}) {
    return this.client.get(url, config);
  }

  post(url, data = {}, config = {}) {
    return this.client.post(url, data, config);
  }

  put(url, data = {}, config = {}) {
    return this.client.put(url, data, config);
  }

  patch(url, data = {}, config = {}) {
    return this.client.patch(url, data, config);
  }

  delete(url, config = {}) {
    return this.client.delete(url, config);
  }
}

module.exports = ApiClient;
