"use strict";

module.exports = {
  web: {
    baseUrl: process.env.WEB_BASE_URL || "https://merchant.unibee.top/",
    username: process.env.WEB_USERNAME || "joshua.yu+1993@wowow.io",
    password: process.env.WEB_PASSWORD || "Aa@666666",
    targetPath: process.env.WEB_TARGET_PATH || "plan/new?productId=0&tab=advanced"
  },
  api: {
    baseUrl: process.env.API_BASE_URL || "http://localhost:8080",
    username: process.env.API_USERNAME || "demo@example.com",
    password: process.env.API_PASSWORD || "ChangeMe123!"
  }
};
