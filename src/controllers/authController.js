const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const {
  validateRegistration,
  validateLogin,
} = require("../helpers/validation.js");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const validationError = validateRegistration(username, email, password);
  if (validationError) {
    return res.status(400).json({ message: validationError.message });
  }

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const isAdmin = email === process.env.ADMIN_EMAIL;

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: isAdmin ? "admin" : "user",
    });
    const token = generateToken(newUser);

    const userWithoutPassword = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    res
      .status(201)
      .json({
        message: "User registered successfully",
        user: userWithoutPassword,
        token,
      });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(400).json({ message: "An error occurred" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const validationError = validateLogin(email, password);
  if (validationError) {
    return res.status(400).json({ message: validationError.message });
  }
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userWithoutPassword = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const token = generateToken(user);

    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(400).json({ message: "An error occurred", error });
  }
};

const getProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error finding user:", error);
    res
      .status(400)
      .json({ message: "An error occurred when fetching user", error });
  }
};

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = { registerUser, loginUser, getProfile };
