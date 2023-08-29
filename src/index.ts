const todo = <HTMLInputElement>document.getElementById("todo-form_todo");
const description = <HTMLInputElement>(
  document.getElementById("todo-form_description")
);
const todoForm = document.getElementById("todo-form");
const unDoneConatiner = document.getElementById("undone-todos_container");
const doneConatiner = document.getElementById("todos-list_container");

class Todo {
  id: string;
  title: string;
  description: string;
  category: "done" | "undone";
  timeStamp: number[];
  constructor(title: string, description: string, time: number) {
    this.id = String(Math.random());
    this.title = title;
    this.description = description;
    this.category = "undone";
    this.timeStamp = [time];
  }
}

let todosList: Todo[] = [];

/**
 * Converts given timestamp to string
 * @returns {string} Returns the converted date to following format: mm:ss - dd. month year.
 */
function convertTimeStamp(timeStamp: number): string {
  const todoDate = new Date(timeStamp);
  return `${todoDate.getHours()}: ${todoDate.getMinutes()} - ${todoDate.getDate()}.${todoDate.toLocaleString(
    "en-US",
    { month: "short" }
  )} ${todoDate.getFullYear()}`;
}
/**
 * checks if user clicked on trash icon and removes corresponding todo
 * @returns {void} just updates todosList
 */
function removeTodoHandler(
  target: HTMLButtonElement,
  clickedTodosId: string
): void {
  if (target.classList.contains("fa-trash")) {
    todosList = todosList.filter((item) => {
      return item.id !== clickedTodosId;
    });
  }
}
/**
 * checks if user clicked on 'I've Done This' button and moves corresponding todo to done category
 * @returns {void} just updates todosList
 */
function fullfillTodo(clickedTodosId: string): void {
  todosList = todosList.map((todo: Todo) => {
    if (todo.id === clickedTodosId) {
      return {
        ...todo,
        category: "done",
        timeStamp: [...todo.timeStamp, +new Date()],
      };
    } else {
      return todo;
    }
  });
}
/**
 * checks if user clicked on 'Undone This' button and moves corresponding todo to done category
 * @returns {void} just updates todosList
 */
function unDoneTodo(clickedTodosId: string): void {
  todosList = todosList.map((todo: Todo) => {
    if (todo.id === clickedTodosId) {
      return {
        ...todo,
        category: "undone",
        timeStamp: [...todo.timeStamp, +new Date()],
      };
    } else {
      return todo;
    }
  });
}
/**
 * remders the todos array on corresponding category
 * @returns {void} just updates todosList
 */
const renderTodos = (todos: Todo[]): void => {
  //removes previous todos before rendering todos list
  if (unDoneConatiner && doneConatiner) {
    unDoneConatiner.innerHTML = "";
    doneConatiner.innerHTML = "";
  }
  todos.map((todo: Todo) => {
    const newTodo = document.createElement("li");
    newTodo.classList.add("todos-list_item");
    newTodo.setAttribute("id", todo.id);
    newTodo.addEventListener("click", (e) => {
      const target = e.target as HTMLButtonElement;
      const currentTarget = e.currentTarget as HTMLButtonElement;

      if (target && currentTarget) {
        const clickedTodosId = currentTarget.getAttribute("id");
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

    // if (todo.category === "undone") {
    newTodo.innerHTML = `<h3>${todo.title}</h3>
    <p>
    Description: ${todo.description}
    </p>
    <p>
       Creation Date:${convertTimeStamp(todo.timeStamp[0])}
        </p>
        <p>
        Last modified:${convertTimeStamp(
          todo.timeStamp[todo.timeStamp.length - 1]
        )}
        </p>
    <button class="todos-list_remove">
      <i class="fa-solid fa-trash"></i>
    </button>
    <button class="${
      todo.category === "undone" ? "todos-list_done" : "todos-list_undone"
    }">${todo.category === "undone" ? "I've Done This" : "Undone This"}</button>
    `;
    todo.category === "undone"
      ? unDoneConatiner!.appendChild(newTodo)
      : doneConatiner!.appendChild(newTodo);
  });
  sessionStorage.setItem("wave", JSON.stringify(todosList));
};
