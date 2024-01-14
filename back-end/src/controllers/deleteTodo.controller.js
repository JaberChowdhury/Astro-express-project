const databaseController = require("./databaseController");

const worker = new databaseController();

const deleteTodo = async (req, res) => {
  const deleteResult = await worker.deleteItem(req.params.id);
  res.status(deleteResult.success === true ? 200 : 400).json({
    success: deleteResult.success === true ? true : false,
    message: deleteResult.message,
  });
};

module.exports = deleteTodo;
