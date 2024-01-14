const databaseController = require("./databaseController");

const worker = new databaseController();

const addTodo = async (req, res) => {
  const todo = {
    title: req.body.title || "No title",
    description: req.body.description || "no description",
    checked: req.body.checked || false,
    id: req.body.id || crypto.randomUUID(),
    lastUpdated: new Date().toLocaleString(),
  };

  const addresult = await worker.addItem(todo);
  res.status(addresult.success === true ? 200 : 400).json({
    success: addresult.success === true ? true : false,
    message: addresult.message,
    newTodo: addresult.success === true ? todo : false,
  });
};

module.exports = addTodo;
