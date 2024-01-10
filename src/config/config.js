const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
  test: {
    url: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
