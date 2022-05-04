import "./styles.css";
import { TodoList, Todo } from "./classes";
import { crearTodoHtml } from "./js/componentes";

export const todoList = new TodoList();

// todoList.todos.forEach((todo) => crearTodoHtml(todo));

// cuando es el mismo parametro se puede invocar a la función solamente
todoList.todos.forEach(crearTodoHtml);

console.log("todos:", todoList.todos);
