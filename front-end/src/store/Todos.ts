import axios from "axios";
import { atom } from "nanostores";

type todoType = {
  id: string;
  todo: string;
  description: string;
  time: string;
  lastUpdated?: string;
  title?: string;
};

const $todos = atom({
  isLoading: false,
  error: null,
  data: [
    {
      id: "1",
      todo: "dummy",
      description: "awesome  react  project ",
      time: new Date().toLocaleString(),
    },
  ],
});

axios
  .get("http://localhost:5174/api/v1/todos/get")
  .then((res) => {
    $todos.set({
      error: null,
      isLoading: false,
      data: res.data.todos.map((todo: todoType) => {
        return {
          id: todo.id,
          description: todo.description,
          todo: todo.title,
          time: todo.lastUpdated,
        };
      }),
    });
  })
  .catch((er) => {
    console.log(er);
    $todos.set({
      error: er.message,
      isLoading: false,
      data: [],
    });
  });

export default $todos;
