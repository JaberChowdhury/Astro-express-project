const fs = require("fs").promises;
const path = require("path");

const fileName = path.join(__dirname, "../db/todos.txt")
class databaseController {
  constructor(path = fileName) {
    this.path = path;

    this.outputMaker = (success, message, payload) => {
      return { success, message, payload };
    };

    this.readDB = async () => {
      const rawDatabase = await fs.readFile(this.path, "utf-8");
      const database = await JSON.parse(JSON.stringify(rawDatabase));
      return database;
    };

    this.findDuplicate = async (array, id) => {
      const filtered = await array.filter((each) => {
        return each.id.toString() === id.toString();
      });
      if (filtered.length === 0) {
        return this.outputMaker(
          false,
          "No duplicate item detected based on uuid",
          id,
        );
      } else {
        return {
          success: true,
          message: "Duplicate item detected based on uuid",
        };
      }
    };

    this.addItem = async (item) => {
      const rawDatabase = await this.readDB();
      const database = await JSON.parse(rawDatabase);
      const result = await this.findDuplicate(database.todos, item.id);
      if (result.success === false) {
        database.todos = [...database.todos, item];
        try {
          const writeResult = await fs.writeFile(
            this.path,
            JSON.stringify(database),
          );
          return this.outputMaker(true, "Item has been added");
        } catch (e) {
          return this.outputMaker(false, "can't write the database", e);
        }
      } else {
        return this.outputMaker(false, `uuid ${item.id} already exists`);
      }
    };

    this.deleteItem = async (id) => {
      const rawDatabase = await this.readDB();
      const database = await JSON.parse(rawDatabase);
      const result = await this.findDuplicate(database.todos, id);
      if (result.success === true) {
        try {
          const filtered = database.todos.filter((each) => {
            return each.id !== id;
          });
          const deletedTodo = database.todos.filter((each) => {
            return each.id === id;
          });
          database.todos = filtered;
          database.deletedTodos = [...database.deletedTodos, ...deletedTodo];
          const writeResult = await fs.writeFile(
            this.path,
            JSON.stringify(database),
          );
          return this.outputMaker(true, "item successfully deleted");
        } catch (e) {
          return this.outputMaker(false, "can't write the database", e);
        }
      } else {
        return this.outputMaker(false, `uuid ${id} doesn't exist`);
      }
    };

    this.updateItem = async (item) => {
      const rawDatabase = await this.readDB();
      const database = await JSON.parse(rawDatabase);
      const result = await this.findDuplicate(database.todos, item.id);
      if (result.success === true) {
        const updated = database.todos.map((each) => {
          if (each.id === item.id) {
            return { ...each, ...item };
          } else {
            return each;
          }
        });
        database.todos = updated;
        try {
          const writeResult = await fs.writeFile(
            this.path,
            JSON.stringify(database),
          );
          return this.outputMaker(true, "item has been updated");
        } catch (e) {
          return this.outputMaker(false, "can't write the database", e);
        }
      } else {
        return this.outputMaker(false, `uuid ${item.id} doesn't exist`);
      }
    };

    this.getItem = async (id) => {
      const rawDatabase = await this.readDB();
      const database = await JSON.parse(rawDatabase);
      const result = await this.findDuplicate(database.todos, id);
      if (result.success === true) {
        const specificItem = database.todos.filter((each) => {
          return each.id === id;
        });
        return this.outputMaker(true, "item found", specificItem[0]);
      } else {
        return this.outputMaker(false, `uuid ${id} doesn't exist`);
      }
    };

    this.getDeletedItem = async (id) => {
      const rawDatabase = await this.readDB();
      const database = await JSON.parse(rawDatabase);
      const result = await this.findDuplicate(database.deletedTodos, id);
      if (result.success === true) {
        const specificItem = database.deletedTodos.filter((each) => {
          return each.id === id;
        });
        return this.outputMaker(true, "item found", specificItem[0]);
      } else {
        return this.outputMaker(false, `uuid ${id} doesn't exist`);
      }
    };

    this.deleteDeletedItem = async (id) => {
      const rawDatabase = await this.readDB();
      const database = await JSON.parse(rawDatabase);
      const result = await this.findDuplicate(database.deletedTodos, id);
      if (result.success === true) {
        try {
          const filtered = database.deletedTodos.filter((each) => {
            return each.id !== id;
          });
          database.deletedTodos = filtered;
          const writeResult = await fs.writeFile(
            this.path,
            JSON.stringify(database),
          );
          return this.outputMaker(true, "item successfully deleted");
        } catch (e) {
          return this.outputMaker(false, "can't write the database", e);
        }
      } else {
        return this.outputMaker(false, `uuid ${id} doesn't exist`);
      }
    };

    this.recoverDeletedItem = async (id) => {
      const rawDatabase = await this.readDB();
      const database = await JSON.parse(rawDatabase);
      const result = await this.findDuplicate(database.deletedTodos, id);
      if (result.success === true) {
        try {
          const filtered = database.deletedTodos.filter((each) => {
            return each.id === id;
          });
          const withoutItem = database.deletedTodos.filter((each) => {
            return each.id !== id;
          });
          database.deletedTodos = withoutItem;
          database.todos = [...database.todos, ...filtered];
          const writeResult = await fs.writeFile(
            this.path,
            JSON.stringify(database),
          );
          return this.outputMaker(true, "item successfully recovered");
        } catch (e) {
          return this.outputMaker(false, "can't write the database", e);
        }
      } else {
        return this.outputMaker(false, `uuid ${id} doesn't exist`);
      }
    };
  }
}

module.exports = databaseController;
