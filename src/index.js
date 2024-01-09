const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const { sequelize } = require("../src/models");
const bodyParser = require("body-parser");
const authRoute = require("./routes/authRoute.js");

const connectDb = async () => {
  console.log("Checking database connection...");
  try {
    await sequelize.authenticate();
    console.log("database connection established!");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};

const app = express();
const options = {
  swaggerOptions: {
    // tryItOutEnabled: false,
    // supportedSubmitMethods: [""],
    overview: true,
  },
};
dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

const PORT = 3000;
//routes
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

app.use("/users", authRoute);

app.listen(PORT, async () => {
  await connectDb();
  console.log(
    `Server running on port ${PORT}. Access the docs on http://localhost:${PORT}/api-docs`
  );
});

process.on("SIGINT", async () => {
  console.log("Shutting down...");

  // Close any other resources or servers here
  console.log("Goodbye!");
  process.exit(0);
});
