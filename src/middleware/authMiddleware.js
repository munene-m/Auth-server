const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;

const authMiddleware = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "");

      const user = await User.findByPk(decodedToken.user.id);

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.user = user;
      req.token = token;

      if (user.role === "admin") {
        return next();
      } else {
        // Regular users can only access their personal profiles
        if (req.params.userId && req.params.userId !== user.id.toString()) {
          return res.status(403).json({
            message: "Forbidden request. You can only access your profile.",
          });
        }
        return next();
      }
    } else {
      return res.status(401).json({ message: "Unauthorized attempt" });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authMiddleware };
