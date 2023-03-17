const input = document.querySelector("[data-input]");
const list = document.querySelector("[data-list]");
const form = document.querySelector("form");
const clearCompletedBtn = document.querySelector("[data-clear-completed]");
const lengthTodos = document.querySelector("[data-length-todos]");
const card = document.querySelector(".card");
const cardBody = document.querySelector(".card-bottom");
const toggleBtn = document.querySelector("#toggle-btn");
const backFon = document.querySelector(".backFon");
let darkMode = localStorage.getItem("dark-mode");

let TODOS = [
  {
    id: 1,
    text: "😎 MY TODO APP",
    completed: false,
  },
];

if (!localStorage.getItem("todos")) {
  localStorage.setItem("todos", JSON.stringify(TODOS));
} else {
  TODOS = JSON.parse(localStorage.getItem("todos"));
  console.log(TODOS);
}

function saveToLocalStorage(newTodo) {
  if (!localStorage.getItem("todos")) {
    TODOS.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(TODOS));
  } else {
    TODOS = JSON.parse(localStorage.getItem("todos"));
    TODOS.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(TODOS));
  }
  updateTheTodosLength();
}

function enableDarkMode() {
  toggleBtn.classList.replace("fa-moon", "fa-sun");
  document.body.classList.add("dark");
  backFon.classList.replace("backFon", "backFonDark");

  localStorage.setItem("dark-mode", "enabled");
}

function disableDarkMode() {
  toggleBtn.classList.replace("fa-sun", "fa-moon");
  document.body.classList.remove("dark");
  backFon.classList.replace("backFonDark", "backFon");

  localStorage.setItem("dark-mode", "disabled");
}

if (darkMode === "enabled") {
  enableDarkMode();
}

toggleBtn.addEventListener("click", () => {
  darkMode = localStorage.getItem("dark-mode");
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

new Sortable(list, {
  animation: 350,
});

function showAllTodos(e) {
  if (TODOS.length > 0) {
    list.innerHTML = "";

    if (e) {
      for (const child of e.parentElement.children) {
        child.style.color = "";
      }
      e.style.color = "#3A7CFD";
    }
  }
  TODOS = JSON.parse(localStorage.getItem("todos"));
  input.removeAttribute("disabled");
  TODOS.forEach(
    (todo) =>
      (list.innerHTML += `<li onclick="completeTodoLi(this)"  id=${
        todo.id
      }><div class="badge"><input type="checkbox" ${
        todo.completed && "checked"
      } onchange="completeTodo(this)"/></div><span class=${
        todo.completed && "completedTodo"
      } >${todo.text}</span> <span onClick="deleteTodo(this)" class="delete">
      <img src="./images/delete.svg" width="15px" height="15px" alt="">
    </span></li>`)
  );
}
// FOR TESTING INITIAL TODO_ITEMS
showAllTodos();

function updateTheTodosLength() {
  lengthTodos.innerText = JSON.parse(localStorage.getItem("todos")).length;
}
updateTheTodosLength();

clearCompletedBtn.addEventListener("click", clearCompleted);

function clearError() {
  input.classList.remove("error");
}

form.addEventListener("keydown", (e) => {
  //checking keydown is enter
  if (e.keyCode === 13) {
    //check weather input is empty or not
    e.preventDefault();
    if (input.value.trim() === "") {
      input.classList.add("error");
      setTimeout(clearError, 1000);
    } else {
      // SUCCESS
      addNewTodo();
      updateTheTodosLength();
    }
  }
});

function addNewTodo() {
  const newTodo = {
    id: Math.random(),
    text: input.value,
    completed: false,
  };

  saveToLocalStorage(newTodo);

  const li = document.createElement("li");
  li.setAttribute("id", newTodo.id);
  li.innerHTML = `<div class="badge"><input type="checkbox" onchange="completeTodo(this)"/></div><span>${newTodo.text}</span> <span onClick=deleteTodo(this) class="delete">
  <img src="./images/delete.svg" width="15px" height="15px" alt="">
</span>`;

  list.appendChild(li);
  TODOS.push(newTodo);

  input.value = "";
}

function deleteTodo(e) {
  const parentEl = e.parentElement;
  parentEl.remove();

  TODOS = JSON.parse(localStorage.getItem("todos"));
  TODOS = TODOS.filter((todo) => parentEl.id != todo.id);
  localStorage.setItem("todos", JSON.stringify(TODOS));
  updateTheTodosLength();
}

// function completeTodoLi(e) {
//   console.log(e.children);
//   console.log(e);
// }

// COMPLETE TODO
function completeTodo(e) {
  e.parentElement.nextSibling.classList.add("completedTodo");

  if (e.checked !== true) {
    e.parentElement.nextSibling.classList.remove("completedTodo");
  }
  TODOS = JSON.parse(localStorage.getItem("todos"));
  TODOS.forEach((todo) => {
    if (e.parentElement.parentElement.id == todo.id) {
      todo.completed = !todo.completed;
    }
  });
  localStorage.setItem("todos", JSON.stringify(TODOS));
}

// CLEARING ALL COMPLETED TODOS
function clearCompleted() {
  TODOS = JSON.parse(localStorage.getItem("todos"));
  TODOS = TODOS.filter((todo) => todo.completed !== true);
  localStorage.setItem("todos", JSON.stringify(TODOS));

  updateTheTodosLength();

  const allListItems = document.querySelectorAll("li");
  console.log(allListItems);
  allListItems.forEach((listItem) => {
    if (listItem.childNodes[0].children[0].checked === true) {
      listItem.remove();
    }
  });
}

// show only completed
function ShowOnlyCompletedTodos(e) {
  input.setAttribute("disabled", "");
  TODOS = JSON.parse(localStorage.getItem("todos"));

  const onlyCompleted = TODOS.filter((todo) => todo.completed !== false);

  for (const child of e.parentElement.children) {
    child.style.color = "";
  }

  if (onlyCompleted.length > 0) {
    list.innerHTML = "";
    e.style.color = "#3A7CFD";
  } else {
    list.innerHTML = "<li>😜 OOPS!</li>";
    e.style.color = "#3A7CFD";
  }

  onlyCompleted.forEach(
    (todo) =>
      (list.innerHTML += `<li id=${todo.id}><div class="badge"><input type="checkbox" checked onchange="completeTodo(this)"/></div><span class="completedTodo">${todo.text}</span> <span onClick="deleteTodo(this)" class="delete">
      <img src="./images/delete.svg" width="15px" height="15px" alt="">
    </span></li>`)
  );
  return onlyCompleted;
}

function showOnlyActive(e) {
  input.setAttribute("disabled", "");
  TODOS = JSON.parse(localStorage.getItem("todos"));
  const notCompleted = TODOS.filter((todo) => todo.completed !== true);

  for (const child of e.parentElement.children) {
    child.style.color = "";
  }
  if (notCompleted.length > 0) {
    list.innerHTML = "";
    e.style.color = "#3A7CFD";
  } else {
    e.style.color = "#3A7CFD";
    list.innerHTML = "<li>😜 OOPS!</li>";
  }

  notCompleted.forEach(
    (todo) =>
      (list.innerHTML += `<li id=${todo.id}><div class="badge"><input type="checkbox" onchange="completeTodo(this)"/></div><span>${todo.text}</span> <span onClick="deleteTodo(this)" class="delete">
      <img src="./images/delete.svg" width="15px" height="15px" alt="">
    </span></li>`)
  );
}
