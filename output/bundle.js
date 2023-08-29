var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
var todo = document.getElementById("todo-form_todo");
var description = document.getElementById("todo-form_description");
var todoForm = document.getElementById("todo-form");
var unDoneConatiner = document.getElementById("undone-todos_container");
var doneConatiner = document.getElementById("done-todos_container");
/** Class representing a todo.
 * * @param {string} id - id of todo.
 * @param {string} title - title of todo.
 *  @param {string} description - description of todo.
 *  @param {"done" | "undone"} category - category of todo.
 *  @param {number[]} timeStamp - array of creation and modification dates of todo.
 */
var Todo = /** @class */ (function () {
  function Todo(title, description, time) {
    this.id = String(Math.random());
    this.title = title;
    this.description = description;
    this.category = "undone";
    this.timeStamp = [time];
  }
  return Todo;
})();
var todosList = [];
/**
 * Converts given timestamp to string
 * @returns {string} Returns the converted date to following format: mm:ss - dd. month year.
 */
function convertTimeStamp(timeStamp) {
  var todoDate = new Date(timeStamp);
  return ""
    .concat(todoDate.getHours(), ": ")
    .concat(todoDate.getMinutes(), " - ")
    .concat(todoDate.getDate(), ".")
    .concat(todoDate.toLocaleString("en-US", { month: "short" }), " ")
    .concat(todoDate.getFullYear());
}
/**
 * checks if user clicked on trash icon and removes corresponding todo
 * @returns {void} just updates todosList
 */
function removeTodoHandler(target, clickedTodosId) {
  if (target.classList.contains("fa-trash")) {
    todosList = todosList.filter(function (item) {
      return item.id !== clickedTodosId;
    });
  }
}
/**
 * checks if user clicked on 'I've Done This' button and moves corresponding todo to done category
 * @returns {void} just updates todosList
 */
function fullfillTodo(clickedTodosId) {
  todosList = todosList.map(function (todo) {
    if (todo.id === clickedTodosId) {
      return __assign(__assign({}, todo), {
        category: "done",
        timeStamp: __spreadArray(
          __spreadArray([], todo.timeStamp, true),
          [+new Date()],
          false
        ),
      });
    } else {
      return todo;
    }
  });
}
/**
 * checks if user clicked on 'Undone This' button and moves corresponding todo to done category
 * @returns {void} just updates todosList
 */
function unDoneTodo(clickedTodosId) {
  todosList = todosList.map(function (todo) {
    if (todo.id === clickedTodosId) {
      return __assign(__assign({}, todo), {
        category: "undone",
        timeStamp: __spreadArray(
          __spreadArray([], todo.timeStamp, true),
          [+new Date()],
          false
        ),
      });
    } else {
      return todo;
    }
  });
}
/**
 * remders the todos array on corresponding category
 * @returns {void} just updates todosList
 */
var renderTodos = function (todos) {
  //removes previous todos before rendering todos list
  if (unDoneConatiner && doneConatiner) {
    unDoneConatiner.innerHTML = "";
    doneConatiner.innerHTML = "";
  }
  todos.map(function (todo) {
    var newTodo = document.createElement("li");
    newTodo.classList.add("todos-list_item");
    newTodo.setAttribute("id", todo.id);
    newTodo.addEventListener("click", function (e) {
      var target = e.target;
      var currentTarget = e.currentTarget;
      if (target && currentTarget) {
        var clickedTodosId = currentTarget.getAttribute("id");
        //checks if user clicked on Trash icon
        if (typeof clickedTodosId === "string") {
          removeTodoHandler(target, clickedTodosId);
        }
        //checks if user clicked on I've Done This button
        if (
          target.classList.contains("todos-list_done") &&
          typeof clickedTodosId === "string"
        ) {
          fullfillTodo(clickedTodosId);
        }
        //checks if user clicked on Undone This todo button
        if (
          target.classList.contains("todos-list_undone") &&
          typeof clickedTodosId === "string"
        ) {
          unDoneTodo(clickedTodosId);
        }
        renderTodos(todosList);
      }
    });
    newTodo.innerHTML = "<h3>"
      .concat(todo.title, "</h3>\n    <p>\n    Description: ")
      .concat(todo.description, "\n    </p>\n    <p>\n       Creation Date:")
      .concat(
        convertTimeStamp(todo.timeStamp[0]),
        "\n        </p>\n        <p>\n        Last modified:"
      )
      .concat(
        convertTimeStamp(todo.timeStamp[todo.timeStamp.length - 1]),
        '\n        </p>\n    <button class="todos-list_remove">\n      <i class="fa-solid fa-trash"></i>\n    </button>\n    <button class="'
      )
      .concat(
        todo.category === "undone" ? "todos-list_done" : "todos-list_undone",
        '">'
      )
      .concat(
        todo.category === "undone" ? "I've Done This" : "Undone This",
        "</button>\n    "
      );
    todo.category === "undone"
      ? unDoneConatiner.appendChild(newTodo)
      : doneConatiner.appendChild(newTodo);
  });
  sessionStorage.setItem("wave", JSON.stringify(todosList));
};
/**
 * checks from input fields validity and if so adds new todo
 */
todoForm === null || todoForm === void 0
  ? void 0
  : todoForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (todo.value.trim() === "") {
        todo.classList.add("invalid");
        return;
      }
      if (description.value.trim() === "") {
        description.classList.add("invalid");
        return;
      }
      todosList.push({
        id: String(Math.random()),
        title: todo.value,
        description: description.value,
        category: "undone",
        timeStamp: [+new Date()],
      });
      renderTodos(todosList);
      sessionStorage.setItem("wave", JSON.stringify(todosList));
      todo.value = "";
      description.value = "";
    });
/**
 * removes invalid class from input
 */
todo.addEventListener("input", function () {
  todo.classList.remove("invalid");
});
/**
 * removes invalid class from textarea
 */
description.addEventListener("input", function () {
  description.classList.remove("invalid");
});
/**
 * return stored array and if not existing return an empty array
 */
if (sessionStorage.getItem("wave")) {
  todosList = JSON.parse(sessionStorage.getItem("wave") || "[]");
  renderTodos(todosList);
}
