const input = document.querySelector("[data-input]");
const list = document.querySelector("[data-list]");
const form = document.querySelector("form");

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
      //success
      console.log(input.value);
      addNewTodo();
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
  li.innerHTML = `<div class="badge"><input type="checkbox" onchange="completeTodo(this)"/></div><span>${newTodo.text}</span><button onclick="deleteTodo(this)">delete</button>`;
  console.log(li);
  list.appendChild(li);
  TODOS.push(newTodo);
  console.log(TODOS);
  input.value = "";
}

TODOS.forEach(
  (todo) =>
    (list.innerHTML += `<li id=${todo.id}><div class="badge"><input type="checkbox" onchange="completeTodo(this)"/></div><span>${todo.text}</span><button onClick="deleteTodo(this)">delete</button></li>`)
);

function deleteTodo(e) {
  const parentEl = e.parentElement;
  parentEl.remove();

  TODOS = TODOS.filter((todo) => parentEl.id != todo.id);
  console.log(TODOS);
}

function completeTodo(e) {
  console.log(e.checked);
  console.log(e.parentElement.parentElement);

  TODOS.forEach((todo) => {
    if (e.parentElement.parentElement.id === todo.id) {
      TODOS
    }
  });

  console.log(TODOS);
}
