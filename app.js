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
  // Add task event
  form.addEventListener("submit", addTask);
}

// funtion to add a task - takes an event input
function addTask(e) {
  if (taskInput.value === '') {
    alert("No task entered - please add a task");
  }
  else {
    // create a new li, give it Materialize classes & append text node shwoing new task
    let li = document.createElement("li");
    li.className = "collection-item";
    let text = document.createTextNode(taskInput.value);
    li.appendChild(text);

    // create the link element and the inner remove icon
    let link = document.createElement("a");
    link.className = "delete-item secondary-content";
    let cross = document.createElement('i');
    cross.className = "fa fa-remove";

    // append the new elements together
    link.appendChild(cross);
    li.appendChild(link);
    taskList.appendChild(li);

    // clear the input field
    taskInput.value = '';
  }

  // prevent the default submit behaviour
  e.preventDefault();
}
