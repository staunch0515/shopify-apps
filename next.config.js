require("dotenv").config();
const withCSS = require('@zeit/next-css');
const webpack = require('webpack');

const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);
const appName = JSON.stringify(process.env.APP_NAME);
const appTitle = JSON.stringify(process.env.APP_TITLE);
const appHost = JSON.stringify(process.env.APP_HOST);
module.exports = withCSS({
  webpack: (config) => {
    const env = {
      API_KEY: apiKey,
      APP_TITLE: appTitle,
      APP_HOST: appHost,
      APP_NAME: appName,
    };
    config.plugins.push(new webpack.DefinePlugin(env));
    return config;
  },
});