// Function to save tasks to local storage
function saveTasks(user, tasks) {
    localStorage.setItem(user, JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks(user) {
    const tasks = localStorage.getItem(user);
    return tasks ? JSON.parse(tasks) : [];
}

// Add task (used in input.html)
function addTask() {
    const user = document.getElementById('userInputSelect').value;
    const task = document.getElementById('taskInput').value;
    const duration = document.getElementById('durationInputSelect').value;

    if (task) {
        const tasks = loadTasks(user);
        tasks.push({ task, duration });
        saveTasks(user, tasks);
        document.getElementById('taskInput').value = ''; // Clear input field
        alert('Task added successfully!');
    } else {
        alert('Please enter a task.');
    }
}

// Get a random task (used in index.html)
function getRandomTask() {
    const user = document.getElementById('userSelect').value;
    const duration = document.getElementById('durationSelect').value;
    const tasks = loadTasks(user).filter(t => t.duration === duration);

    if (tasks.length > 0) {
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        document.getElementById('taskDisplay').innerText = randomTask.task;
    } else {
        document.getElementById('taskDisplay').innerText = 'No tasks available for this duration.';
    }
}

// Display tasks (used in tasks.html)
function displayTasks() {
    const user = document.getElementById('userTasksSelect').value;
    const tasks = loadTasks(user);
    const tasksDisplay = document.getElementById('tasksDisplay');
    tasksDisplay.innerHTML = '';

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.innerText = `${task.task} (${task.duration} hour${task.duration > 1 ? 's' : ''})`;
        tasksDisplay.appendChild(taskDiv);
    });
}

// Event listeners for buttons
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addTask');
    const getTaskButton = document.getElementById('getTask');
    const userTasksSelect = document.getElementById('userTasksSelect');

    if (addButton) addButton.addEventListener('click', addTask);
    if (getTaskButton) getTaskButton.addEventListener('click', getRandomTask);
    if (userTasksSelect) userTasksSelect.addEventListener('change', displayTasks);

    // Initial display of tasks
    if (userTasksSelect) displayTasks();
});
