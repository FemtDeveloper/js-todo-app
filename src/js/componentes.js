import { todoList } from "..";
import { Todo } from "../classes";

const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnBorrarCompletados = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");

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
});

// divTodoList.addEventListener("click", (event) => {
//   const nombreElemento = event.target.localName;
//   const todoElemento = event.target.parentElement.parentElement;
//   const todoId = todoElemento.getAttribute("data-id");

//   if (nombreElemento.includes("input")) {
//     // click en el check
//     todoList.marcarCompletado(todoId);
//     todoElemento.classList.toggle("completed");
//   } else if (nombreElemento.includes("button")) {
//     // hay que borrar el todo

//     todoList.eliminarTodo(todoId);
//     divTodoList.removeChild(todoElemento);
//   }
// });

export const crearTodoHtml = (todo) => {
  const htmlTodo = `<li class='${
    todo.completado ? "completed" : ""
  }' data-id="${todo.id}">
            <div class="view">
              <input class="toggle" type="checkbox" ${
                todo.completado ? "checked" : ""
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
  }
});

ulFiltros.addEventListener("click", (e) => {
  const filtro = e.target.text;
  if (!filtro) {
    return;
  }

  txtInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && txtInput.value.length > 0) {
      console.log(txtInput.value);
      const nuevoTodo = new Todo(txtInput.value);
      todoList.nuevoTodo(nuevoTodo);
      crearTodoHtml(nuevoTodo);
      txtInput.value = "";
    }
  });

  btnBorrarCompletados.addEventListener("click", () => {
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
      const elemento = divTodoList.children[i];
      if (elemento.classList.contains("completed")) {
        divTodoList.removeChild(elemento);
      }
    }
  });

  anchorFiltros.forEach((element) => element.classList.remove("selected"));
  e.target.classList.add("selected");

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
