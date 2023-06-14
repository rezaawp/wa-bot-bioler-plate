require("dotenv").config();

const timezone = "+07:00";

module.exports = {
  development: {
    username: "root",
    password: null,
    database: "wa_bot",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timezone,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timezone,
  },
};
