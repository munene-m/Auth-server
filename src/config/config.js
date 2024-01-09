module.exports = {
  development: {
    url: "postgresql://postgres:M5Comp@localhost/scanwize_task",
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
