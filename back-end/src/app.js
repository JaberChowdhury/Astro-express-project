const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const expressRateLimit = require("express-rate-limit");
const todosRouter = require("./routers/todosRouter");
const deletedTodosRouter = require("./routers/deletedTodosRouter");

const app = express();

const rateLimit = expressRateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 70,
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again later",
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(xssClean());
app.use(rateLimit);

app.use("/api/v1/todos", todosRouter);
app.use("/api/v1/deletedTodos", deletedTodosRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "welcome to the server",
  });
});

// client error
app.use((req, res, next) => {
  next(createError(400, `${req.path} route doesn't exist`));
});

// server error
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
