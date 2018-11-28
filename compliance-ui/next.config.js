// next.config.js
require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  distDir: "build",
  webpack: (config, { dev }) => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    return config;
  }
};
