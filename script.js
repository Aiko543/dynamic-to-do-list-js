document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn'); // Button to add a task
    const taskInput = document.getElementById('task-input'); // Input field for the task
    const taskList = document.getElementById('task-list'); // List to display tasks

    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Initialize tasks from localStorage or an empty array

    // Load tasks from localStorage
    tasks.forEach(function(task) {
        createTaskElement(task);
    });

    // Function to create a task <li> with delete button
    function createTaskElement(taskText) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.classList.add('remove-btn');
        deleteButton.addEventListener('click', function () {
            taskList.removeChild(listItem);
            tasks = tasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    }

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Save to local storage
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Add to DOM
        createTaskElement(taskText);

        // Clear input
        taskInput.value = '';
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
