
const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskDescriptionInput = document.getElementById('task-description');
const taskList = document.getElementById('task-list');

// Retrieve tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
const renderTasks = () => {
  // Clear task list
  taskList.innerHTML = '';

  // Render each task
  tasks.forEach((task, index) => {
    // Create task element
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    // Create task content
    const taskContent = `
      <div class="task-header">
        <h3 class="task-name">${task.name}</h3>
        <button onclick="deleteTask(${index})" class="delete-button">Delete</button>
      </div>
      <p class="task-description">${task.description}</p>
    `;

    // Set task content
    taskElement.innerHTML = taskContent;

    // Append task element to task list
    taskList.appendChild(taskElement);
  });
};

// Function to delete a task
const deleteTask = (index) => {
  // Remove task from tasks array
  tasks.splice(index, 1);

  // Save updated tasks array to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Render updated tasks
  renderTasks();
};

// Event listener for form submission
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();//this will stop form from submitting and page will not reload

  // Get task name and description from input fields
  const name = taskNameInput.value;
  const description = taskDescriptionInput.value;

  // Create new task object
  const newTask = {
    name,
    description
  };

  // Add new task to tasks array
  tasks.push(newTask);

  // Save tasks array to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Clear input fields
  taskNameInput.value = '';
  taskDescriptionInput.value = '';

  // Render updated tasks
  renderTasks();
});

// Render initial tasks
renderTasks();
