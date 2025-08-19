// script.js

// Run after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // ---- Select DOM Elements ----
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList  = document.getElementById('task-list');

    // ---- Local Storage Helpers ----
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    function saveStoredTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // ---- Load tasks from Local Storage and render them ----
    function loadTasks() {
        const storedTasks = getStoredTasks();
        storedTasks.forEach(taskText => addTask(taskText, false)); // false => don't re-save while loading
    }

    // ---- Add Task (optionally save to Local Storage) ----
    // taskTextParam is optional; when omitted we read from the input field.
    function addTask(taskTextParam, save = true) {
        const taskText = (typeof taskTextParam === 'string' ? taskTextParam : taskInput.value).trim();

        // Validate input
        if (taskText === '') {
            // Only alert when the user manually tries to add an empty task
            if (typeof taskTextParam !== 'string') {
                alert('Please enter a task.');
            }
            return;
        }

        // Create <li> for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create "Remove" button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); // required: use classList.add

        // Remove handler: remove from DOM and Local Storage
        removeBtn.onclick = function () {
            taskList.removeChild(li);

            const tasks = getStoredTasks();
            const idx = tasks.indexOf(taskText); // remove only one matching entry
            if (idx > -1) {
                tasks.splice(idx, 1);
                saveStoredTasks(tasks);
            }
        };

        // Assemble and insert into the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input if this was a manual add
        if (typeof taskTextParam !== 'string') {
            taskInput.value = '';
        }

        // Save to Local Storage if requested
        if (save) {
            const tasks = getStoredTasks();
            tasks.push(taskText);
            saveStoredTasks(tasks);
        }
    }

    // ---- Event Listeners ----
    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // ---- Initialize: load persisted tasks ----
    loadTasks();
});
