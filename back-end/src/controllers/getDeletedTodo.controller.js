const databaseController = require("./databaseController");

const worker = new databaseController();

const getDeletedTodo = async (req, res) => {
  const getTodoResult = await worker.getDeletedItem(req.params.id);
  setTimeout(function () {
    res.status(getTodoResult.success === true ? 200 : 400).json({
      success: getTodoResult.success === true ? true : false,
      message: getTodoResult.message,
      todo: getTodoResult.payload,
    });
  }, 10);
};

module.exports = getDeletedTodo;
