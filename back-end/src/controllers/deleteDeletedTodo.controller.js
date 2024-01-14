const databaseController = require("./databaseController");

const worker = new databaseController();

const deleteDeletedTodo = async (req, res) => {
  const deleteResult = await worker.deleteDeletedItem(req.params.id);
  res.status(deleteResult.success === true ? 200 : 400).json({
    success: deleteResult.success === true ? true : false,
    message: deleteResult.message,
  });
};

module.exports = deleteDeletedTodo;
