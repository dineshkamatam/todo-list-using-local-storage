// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoLists = document.querySelector(".todo-lists");
const filterOption = document.querySelector(".filter-todo");

//event listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoLists.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// functions
function addTodo(event) {
  //preventing form from submmiting
  event.preventDefault();
  //Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //add todo to local storage
  saveLocalTodos(todoInput.value);

  //Check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></li>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //Check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></li>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // append TO list
  todoLists.appendChild(todoDiv);

  //clear TODO input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //delete TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  //Check Mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoLists.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //check
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //check
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></li>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></li>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // append TO list
    todoLists.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  //check
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  console.log(todo.children[0].innerText);
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
