// Define UI Vars
const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


loadEventListners()

function loadEventListners () {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add Task Event
   form.addEventListener('submit', addTask)
   // Remove Task Event
   tasklist.addEventListener('click', removeTask)
   // Clear Tasks
   clearBtn.addEventListener('click', clearTasks)
   // Filter Tasks
   filter.addEventListener('keyup', filterTasks)
}

// Get Tasks
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task){
        // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // // Create a new link element
    const link = document.createElement('a');
    // // Add class
    link.className = 'delete-item secondary-content';
    // // Add icon html
    link.innerHTML = '<i class= "fa fa-remove"></i>';
    // // Append the link to li
    li.appendChild(link);
    // // Append li to ul
    tasklist.appendChild(li);
    })
}

// Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add task')
    }

    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // // Create a new link element
    const link = document.createElement('a');
    // // Add class
    link.className = 'delete-item secondary-content';
    // // Add icon html
    link.innerHTML = '<i class= "fa fa-remove"></i>';
    // // Append the link to li
    li.appendChild(link);
    // // Append li to ul
    tasklist.appendChild(li);

    // Store task in Local Storage
    storeTaskInLocalStorage(taskInput.value);
    //  // Clear input
     taskInput.value = '';

    // console.log(li)

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure')) {
            e.target.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks () {
    // tasklist.innerHTML = '';

    // Faster
    while(tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild)
    }

    // Clear from Ls
    clearTasksFromLocalStorage()
}

// Clear tasks from Ls
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase()
    document.querySelectorAll('.collection-item').forEach(
        (function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        })
    )
}




