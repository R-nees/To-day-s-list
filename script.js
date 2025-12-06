// DOM elements
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

// Load saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

function addTask() {
  const text = input.value.trim();
  if (text === "") return;

  tasks.push({
    id: Date.now(),
    text,
    completed: false,
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.classList.toggle("completed", task.completed);

    li.innerHTML = `
      <span onclick="toggleTask(${task.id})">${task.text}</span>
      <button onclick="deleteTask(${task.id})">X</button>
    `;

    taskList.appendChild(li);
  });

  taskCount.textContent = tasks.length;
}

addBtn.addEventListener("click", addTask);
input.addEventListener("keyup", e => {
  if (e.key === "Enter") addTask();
});
