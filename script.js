document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    function loadTasks() {
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function(task) {
            createTaskElement(task);
        });
    }

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

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        createTaskElement(taskText);
        taskInput.value = '';
    }

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks on DOMContentLoaded
    loadTasks();
});
