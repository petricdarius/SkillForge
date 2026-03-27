const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (error) => {
  console.log(error.name, error.message);
  console.log("Uncaught expection! Shutting down...");
  setTimeout(() => process.exit(1), 3000);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DB.replace("<db_password>", process.env.DB_PASSWORD);
mongoose.connect(DB).then((con) => {
  console.log("DB connected succesfully");
});

const PORT = process.env.BE_PORT;
const server = app.listen(PORT, () => {
  console.log("App running on port ", PORT);
});

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
