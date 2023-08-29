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
