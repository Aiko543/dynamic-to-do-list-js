document.addEventListener('DOMContentLoaded', function () { // Ensure the DOM is fully loaded
    const addButton = document.getElementById('add-task-btn'); // Get the button element
    const taskInput = document.getElementById('task-input'); // Get the input field for tasks
    const taskList = document.getElementById('task-list'); // Get the list where tasks will be added

    function addTask() { // Define the function to add a task
        const taskText = taskInput.value.trim(); // Get the value from the input field and trim whitespace
        if (taskText === '') { // Check if the input is empty
            alert('Please enter a task.'); 
            return;
        }

        const listItem = document.createElement('li'); // Create a new list item element
        listItem.textContent = taskText; // Set the text content of the list item

        const deleteButton = document.createElement('button'); // Create a button to delete the task
        deleteButton.textContent = 'Remove'; // Set the text for the delete button
        deleteButton.className = 'remove-btn';// Add a class for styling
        deleteButton.addEventListener('click', function () { // Add an event listener to the delete button
            taskList.removeChild(listItem);
        });

        listItem.appendChild(deleteButton); // Append the delete button to the list item
        taskList.appendChild(listItem);// Append the list item to the task list
        taskInput.value = '';// Clear the input field after adding the task
    }

    addButton.addEventListener('click', addTask); // Add an event listener to the button to call addTask when clicked

    taskInput.addEventListener('keypress', function (event) { // Add an event listener to the input field for keypress events
        if (event.key === 'Enter') { // Check if the pressed key is 'Enter'
            addTask();
        }
    });
});
