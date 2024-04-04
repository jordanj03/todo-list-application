window.addEventListener("load", () => {
  const list = document.querySelector(".list-container");
  const input = document.querySelector("#input-text");
  const addButton = document.querySelector(".btn-submit");
  const subText = document.querySelector(".sub-text");
  const localStorage = window.localStorage;
  let localItems = JSON.parse(window.localStorage.getItem("TASKS"));
  let items = [];
  // localStorage.clear();
  if (localItems !== null && localItems.length > 0) {
    // console.log(localItems[0].completed);
    items = localItems;
    subText.innerHTML = "Tasks!";
    // console.log(items);
  }

  const addTodo = (objArr) => {
    for (let i = 0; i < objArr.length; i++) {
      const todoContainer = document.createElement("div");
      todoContainer.classList.add("todo-container");
      const todo = document.createElement("div");
      todo.classList.add("todo");
      const task = document.createElement("input");
      task.value = objArr[i].text;
      task.setAttribute("readonly", "readonly");
      task.classList.add("todo-item");
      todo.appendChild(task);

      const actions = document.createElement("div");
      actions.classList.add("actions");
      const editBtn = document.createElement("button");
      editBtn.classList.add("btn", "btn-edit");
      editBtn.innerText = "Edit";
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("btn", "btn-delete");
      deleteBtn.innerText = "Delete";
      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      list.appendChild(todoContainer);
      todoContainer.appendChild(todo);
      todoContainer.appendChild(actions);
      input.value = "";

      if (objArr[i].completed) task.classList.add("completed");

      task.addEventListener("click", () => {
        if (task.readOnly) {
          objArr.completed = !objArr.completed;
          task.classList.toggle("completed");
          items[i].completed = objArr.completed;
          localStorage.setItem("TASKS", JSON.stringify(items));
        }
      });

      editBtn.addEventListener("click", () => {
        if (task.hasAttribute("readonly")) {
          editBtn.innerText = "Save";
          editBtn.classList.add("save");
          task.removeAttribute("readonly");
          task.focus();
        } else {
          editBtn.innerText = "Edit";
          editBtn.classList.remove("save");
          task.setAttribute("readonly", "readonly");
          items[i].text = task.value;
          localStorage.setItem("TASKS", JSON.stringify(items));
        }
      });

      deleteBtn.addEventListener("click", () => {
        todoContainer.remove();
        items.length === 1
          ? ((items = []), (subText.innerHTML = "No tasks!"))
          : items.splice(i, 1);
        localStorage.setItem("TASKS", JSON.stringify(items));
      });
    }
  };

  addTodo(items);

  addButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (input.value === "") {
      input.setAttribute("placeholder", "Please enter a task");
      return;
    }
    if (subText.innerHTML != "Tasks:") subText.innerHTML = "Tasks:";
    let obj = { text: input.value, completed: false };
    items.push(obj);
    addTodo([obj]);
    localStorage.setItem("TASKS", JSON.stringify(items));
    console.log(items.length);
  });
});
