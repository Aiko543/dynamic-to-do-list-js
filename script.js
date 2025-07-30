document.addEventListener('DOMContentLoaded', function () { // Ensure the DOM is fully loaded before running the script
    const addButton = document.getElementById('add-task-btn'); // Get the button to add tasks
    const taskInput = document.getElementById('task-input'); // Get the input field for new tasks
    const taskList = document.getElementById('task-list'); // Get the list element to display tasks

    let tasks = []; // Initialize an empty array to hold tasks

    function loadTasks() {
        tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Load tasks from localStorage or initialize to an empty array
        tasks.forEach(function(task) { // Iterate over each task and create a list item
            createTaskElement(task);
        });
    }

    function createTaskElement(taskText) { // Function to create a new task list item
        const listItem = document.createElement('li'); // Create a new list item element
        listItem.textContent = taskText; // Set the text content to the task text

        const deleteButton = document.createElement('button'); // Delete button to remove the task
        deleteButton.textContent = 'Remove'; // Set the button text
        deleteButton.classList.add('remove-btn'); // Add a class for styling
        deleteButton.addEventListener('click', function () { // Event listener for the delete button
            taskList.removeChild(listItem);
            tasks = tasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        listItem.appendChild(deleteButton); // Append the delete button to the list item
        taskList.appendChild(listItem); // Append the list item to the task list
    }

    function addTask() { // Function to add a new task
        const taskText = taskInput.value.trim(); // Get the value from the input field and trim whitespace
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        tasks.push(taskText); // Add the new task to the tasks array
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save the updated tasks array to localStorage
        createTaskElement(taskText); // Create a new task element and append it to the list
        taskInput.value = ''; // Clear the input field after adding the task
    }

    addButton.addEventListener('click', addTask); // Event listener for the add button to trigger adding a task
    taskInput.addEventListener('keypress', function (event) { // Event listener for the input field to add a task on Enter key press
        if (event.key === 'Enter') { // Check if the pressed key is Enter
            addTask(); // Call the addTask function
        }
    });

    // Load tasks on DOMContentLoaded
    loadTasks();
});
