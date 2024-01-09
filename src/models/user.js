"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  });
  return User;
};
