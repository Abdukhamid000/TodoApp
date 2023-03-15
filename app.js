const input = document.querySelector("[data-input]");
const list = document.querySelector("[data-list]");
const form = document.querySelector("form");
const clearCompletedBtn = document.querySelector("[data-clear-completed]");
const lengthTodos = document.querySelector("[data-length-todos]");
// const card = document.querySelector(".card");

new Sortable(list, {
  animation: 350,
});

let TODOS = [
  {
    id: 1,
    text: "Jog around the park 3x",
    completed: false,
  },
  {
    id: 2,
    text: "ME too",
    completed: false,
  },
];

// FOR TESTING INITIAL TODO_ITEMS
TODOS.forEach(
  (todo) =>
    (list.innerHTML += `<li id=${todo.id}><div class="badge"><input type="checkbox" onchange="completeTodo(this)"/></div><span>${todo.text}</span> <span onClick="deleteTodo(this)" class="delete">
    <img src="./images/delete.svg" width="15px" height="15px" alt="">
  </span></li>`)
);

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
  console.log(li);
  list.appendChild(li);
  TODOS.push(newTodo);
  console.log(TODOS);
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
