const databaseController = require("./databaseController");

const worker = new databaseController();

const getDeletedTodos = async (req, res) => {
  const database_raw = await worker.readDB();
  const database = await JSON.parse(database_raw);
  setTimeout(function () {
    res.status(200).json({
      success: true,
      todos: database.deletedTodos,
    });
  }, 1000);
};

module.exports = getDeletedTodos;
