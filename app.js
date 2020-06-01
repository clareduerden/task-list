// DEFINE OUR UI VARS
// get task-form - form element
const form = document.querySelector("#task-form");
// get collection - ul element
const taskList = document.querySelector(".collection");
// get our a tag button element
const clearBtn = document.querySelector(".clear-tasks");
// get our input tag for filter
const filter = document.querySelector("#filter");
// get out input for a new task
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM load event for existing tasks in LS
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add events for adding and removing tasks
  form.addEventListener("submit", addTask);
  // event delegation - listener applied to the entire ul
  taskList.addEventListener("click", deleteTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}

// Load any existing tasks from LS
function getTasks() {
  let tasks;
  // If it is empty then initialise an empty array
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  }
  // If there is something there then convert it from a string to an array
  else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    const text = document.createTextNode(task);
    li.appendChild(text);

    // create the link element and the inner remove icon
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    const cross = document.createElement('i');
    cross.className = "fa fa-remove";

    // append the new elements together
    link.appendChild(cross);
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

// funtion to add a task - takes an event input
function addTask(e) {
  if (taskInput.value === '') {
    alert("No task entered - please add a task");
  }
  else {
    // create a new li, give it Materialize classes & append text node shwoing new task
    const li = document.createElement("li");
    li.className = "collection-item";
    const text = document.createTextNode(taskInput.value);
    li.appendChild(text);

    // create the link element and the inner remove icon
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    const cross = document.createElement('i');
    cross.className = "fa fa-remove";

    // append the new elements together
    link.appendChild(cross);
    li.appendChild(link);
    taskList.appendChild(li);

    // Enter into Local Storage
    storeTaskInLocal(taskInput.value);

    // clear the input field
    taskInput.value = '';
  }
  // prevent the default submit behaviour
  e.preventDefault();
}

function storeTaskInLocal(task) {
  let tasks;
  // If it is empty then initialise an empty array
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  }
  // If there is something there then convert it from a string to an array
  else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // push the task onto the end of the array
  tasks.push(task);
  //make tasks a strong and put it into local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(e) {
  // using event delegation so first check the click is in the right place
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure you want to delete this task?")) {
      // e.target is the i element - so the li is the parent's parent!
      const liToRemove = e.target.parentElement.parentElement;
      console.log(liToRemove);
      taskList.removeChild(liToRemove);
      // Remove item from Local Storage
      removeTaskFromLocal(liToRemove);
    }
  }
}

// Remove a task from S
function removeTaskFromLocal(li) {
  let tasks;
  // If it is empty then initialise an empty array
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  }
  // If there is something there then convert to an array
  else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  // loop through task array items to find a match - if found, then delete the item
  tasks.forEach(function (task, index) {
    if (task === li.textContent) {
      // delete one item from the index position
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks(e) {
  // put all of the existing lis into a nodelist
  let lis = document.querySelectorAll("li.collection-item");
  // for each item in the nodelist - remove it from the taskList
  lis.forEach(function (li) {
    taskList.removeChild(li);
    // removeTaskFromLocal(li);
    clearLocalStorage();
  });

  // while (taskList.firstChild) {
  //   taskList.removeChild(taskList.firstChild);
  //   console.log(taskList.firstChild);
  //   // removeTaskFromLocal(taskList.firstChild);
  // }
}

function clearLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  // Get the text input into the filter and make it lower case so we can compare
  const text = e.target.value.toLowerCase();
  console.log(text);

  // get a nodelist of all the li items
  const tasks = document.querySelectorAll(".collection-item");

  // loop through all lis and check if the filter term is in any of them
  tasks.forEach(function (task) {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) != -1) {
      task.style.display = "block";
    }
    else {
      task.style.display = "none";
    }
  });
}