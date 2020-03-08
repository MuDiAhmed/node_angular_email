const config = require("config");

const env = {
  port: config.has("ENV_PORT") ? config.get("ENV_PORT") : config.get("PORT"),
  env: config.util.getEnv("NODE_ENV"),
  server_debug: config.get("APP_DEBUG.SERVER"),
  api_debug: config.get("APP_DEBUG.API"),
  log: config.get("LOG")
};

const getEnv = () => {
  return { ...env };
};

const setAppEnv = app => {
  app.set("env", env.env);
};
module.exports.getEnv = getEnv;
module.exports.setAppEnv = setAppEnv;
