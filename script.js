// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task when button is clicked
addTaskBtn.addEventListener("click", addTask);

// Add task when 'Enter' key is pressed
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Function to add a new task
function addTask() {
    let taskText = taskInput.value.trim(); // Remove extra spaces

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create a new list item
    let li = document.createElement("li");

    // Task text span
    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.addEventListener("click", toggleTask); // Mark as complete when clicked

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", deleteTask);

    // Append elements to list item
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    
    // Append list item to task list
    taskList.appendChild(li);

    // Save to local storage
    saveTasks();

    // Clear input field
    taskInput.value = "";
}

// Function to mark a task as completed
function toggleTask(event) {
    event.target.classList.toggle("completed");
    saveTasks();
}

// Function to delete a task
function deleteTask(event) {
    event.target.parentElement.remove();
    saveTasks();
}

// Function to save tasks in local storage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.firstChild.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        let li = document.createElement("li");

        let taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;
        if (task.completed) {
            taskSpan.classList.add("completed");
        }
        taskSpan.addEventListener("click", toggleTask);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", deleteTask);

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
