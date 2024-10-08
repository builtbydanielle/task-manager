let tasks = [];

// Handle form submission
document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskName = document.getElementById('task-name').value;
    
    if (!taskName) {
        alert('Please enter a task name.');
        return;
    }

    const taskData = { name: taskName, completed: false };
    tasks.push(taskData); // Add task to the array
    addTaskToUI(taskData); // Add task to the UI
    updateProgress(); // Update the progress bar and text

    // Reset the input field
    document.getElementById('task-name').value = '';
});

function addTaskToUI(task) {
    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    li.classList.add('task-item'); // Add the fade-in animation class

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
        task.completed = checkbox.checked;
        updateProgress();
    });

    const span = document.createElement('span');
    span.textContent = task.name;

    li.appendChild(checkbox);
    li.appendChild(span);
    taskList.appendChild(li);
}

function addTaskToUI(task) {
    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    li.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function() {
        task.completed = checkbox.checked;
        if (task.completed) {
            span.classList.add('completed');
        } else {
            span.classList.remove('completed');
        }
        updateProgress();
    });

    const span = document.createElement('span');
    span.textContent = task.name;
    if (task.completed) {
        span.classList.add('completed');
    }

    li.appendChild(checkbox);
    li.appendChild(span);
    taskList.appendChild(li);
}


// Function to update progress
function updateProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    // Update progress text
    document.getElementById('progress-text').textContent = `${completedTasks} of ${totalTasks} tasks completed`;

    // Update progress bar width
    const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
}
