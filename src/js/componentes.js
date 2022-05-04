import { todoList } from "..";
import { Todo } from "../classes";

const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnBorrarCompletados = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");
console.log(anchorFiltros);

export const crearTodoHtml = (todo) => {
  const htmlTodo = `<li class='${todo.completed ? "completed" : ""}' data-id="${
    todo.id
  }">
            <div class="view">
              <input class="toggle" type="checkbox" ${
                todo.completed ? "checked" : ""
              } />
              <label>${todo.tarea}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template" />
          </li>`;
  const div = document.createElement("div");

  div.innerHTML = htmlTodo;
  divTodoList.append(div.firstElementChild);
  return div.firstElementChild;
};

txtInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && txtInput.value.length > 0) {
    console.log(txtInput.value);
    const nuevoTodo = new Todo(txtInput.value);
    todoList.nuevoTodo(nuevoTodo);
    crearTodoHtml(nuevoTodo);
    txtInput.value = "";
    console.log(todoList);
  }
});

divTodoList.addEventListener("click", (e) => {
  const nombreElemento = e.target.localName;
  const todoElemento = e.target.parentElement.parentElement;
  const todoId = todoElemento.getAttribute("data-id");

  if (nombreElemento.includes("input")) {
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle("completed");
  } else if (nombreElemento.includes("button")) {
    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(todoElemento);
  }
  console.log(todoElemento);
  console.log(todoId);
  console.log(todoList);
});

btnBorrarCompletados.addEventListener("click", () => {
  todoList.eliminarCompletados();
  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];
    console.log(elemento);
    if (elemento.classList.contains("completed")) {
      divTodoList.removeChild(elemento);
    }
  }
});

ulFiltros.addEventListener("click", (e) => {
  const filtro = e.target.text;
  if (!filtro) {
    return;
  }

  anchorFiltros.forEach((element) => element.classList.remove("selected"));
  e.target.classList.add("selected");

  console.log(e.target);
  for (const elemento of divTodoList.children) {
    elemento.classList.remove("hidden");
    const completado = elemento.classList.contains("completed");

    switch (filtro) {
      case "Pendientes":
        if (completado) {
          elemento.classList.add("hidden");
        }
        break;
      case "Completados":
        if (!completado) {
          elemento.classList.add("hidden");
        }
        break;

      default:
        break;
    }
  }
});
