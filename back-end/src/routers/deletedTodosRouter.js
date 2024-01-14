const express = require("express");

// all about deleteTodos
const getDeletedTodos = require("../controllers/getDeletedTodos.controller.js");
const getDeletedTodo = require("../controllers/getDeletedTodo.controller.js");
const deleteDeletedTodo = require("../controllers/deleteDeletedTodo.controller.js");
const recoverDeletedTodo = require("../controllers/recoverDeletedTodo.controller.js");

const deletedTodosRouter = express.Router();

// only for deleted todos
deletedTodosRouter.get("/get", getDeletedTodos);
deletedTodosRouter.get("/get/:id", getDeletedTodo);
deletedTodosRouter.delete("/delete/:id", deleteDeletedTodo);
deletedTodosRouter.delete("/recover/:id", recoverDeletedTodo);

module.exports = deletedTodosRouter;
