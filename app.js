const input = document.querySelector("[data-input]");
const list = document.querySelector("[data-list]");
const form = document.querySelector("form");
const clearCompletedBtn = document.querySelector("[data-clear-completed]");
const lengthTodos = document.querySelector("[data-length-todos]");
const card = document.querySelector(".card");
const cardBody = document.querySelector(".card-bottom");
const toggleBtn = document.querySelector("#toggle-btn");
let darkMode = localStorage.getItem("dark-mode");

let TODOS = [];

function enableDarkMode() {
  toggleBtn.classList.replace("fa-moon", "fa-sun");
  document.body.classList.add("dark");

  localStorage.setItem("dark-mode", "enabled");
}

function disableDarkMode() {
  toggleBtn.classList.replace("fa-sun", "fa-moon");
  document.body.classList.remove("dark");

  localStorage.setItem("dark-mode", "disabled");
}

if (darkMode === "enabled") {
  enableDarkMode();
}

toggleBtn.addEventListener("click", () => {
  console.log("e");
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

  TODOS.forEach(
    (todo) =>
      (list.innerHTML += `<li id=${
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
  lengthTodos.innerText = TODOS.length;
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
    if (input.value === "") {
      input.classList.add("error");
      setTimeout(clearError, 1000);
    } else {
      // SUCCESS
      console.log(input.value);
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

  TODOS = TODOS.filter((todo) => parentEl.id != todo.id);

  updateTheTodosLength();
  console.log(TODOS);
}

// COMPLETE TODO
function completeTodo(e) {
  console.log(e.checked);
  console.log(e.parentElement.nextSibling);

  e.parentElement.nextSibling.classList.add("completedTodo");

  if (e.checked !== true) {
    e.parentElement.nextSibling.classList.remove("completedTodo");
  }

  TODOS.forEach((todo) => {
    if (e.parentElement.parentElement.id == todo.id) {
      todo.completed = !todo.completed;
    }
  });
  console.log(TODOS);
}

// CLEARING ALL COMPLETED TODOS
function clearCompleted() {
  TODOS = TODOS.filter((todo) => todo.completed !== true);
  updateTheTodosLength();
  console.log(TODOS);
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
  const onlyCompleted = TODOS.filter((todo) => todo.completed !== false);
  console.log(e.parentElement.children);

  if (onlyCompleted.length > 0) {
    list.innerHTML = "";

    for (const child of e.parentElement.children) {
      child.style.color = "";
    }
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
  const notCompleted = TODOS.filter((todo) => todo.completed !== true);

  if (notCompleted.length > 0) {
    list.innerHTML = "";

    for (const child of e.parentElement.children) {
      child.style.color = "";
    }
    e.style.color = "#3A7CFD";
  }

  notCompleted.forEach(
    (todo) =>
      (list.innerHTML += `<li id=${todo.id}><div class="badge"><input type="checkbox" onchange="completeTodo(this)"/></div><span>${todo.text}</span> <span onClick="deleteTodo(this)" class="delete">
      <img src="./images/delete.svg" width="15px" height="15px" alt="">
    </span></li>`)
  );
}

function personFactory(name, age) {
  sayName = () => {
    return name;
  };

  return { name, age, sayName };
}

const p1 = personFactory("Alex", 31);
console.log(p1.sayName());
