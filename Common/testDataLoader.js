"use strict";

const fs = require("fs");
const path = require("path");

function loadJson(relativePath) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const content = fs.readFileSync(absolutePath, "utf8");
  return JSON.parse(content);
}

module.exports = {
  loadJson
};
