const databaseController = require("./databaseController");

const worker = new databaseController();

const updateTodo = async (req, res) => {
  const { title, description, id, lastUpdated, checked } = req.body;
  const todo = { title, description, id, lastUpdated, checked };

  const updateResult = await worker.updateItem(todo);

  console.log(todo);

  res.status(updateResult.success === true ? 200 : 400).json({
    success: updateResult.success === true ? true : false,
    message: updateResult.message,
    newTodo: updateResult.success === true ? todo : false,
  });
};

module.exports = updateTodo;
