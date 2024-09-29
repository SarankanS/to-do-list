export default function createMain() {
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('main');

    const tasksDiv = document.createElement('div');
    tasksDiv.classList.add('tasks');

    const projectHeading = document.createElement('h2');
    projectHeading.setAttribute("id", "project-title");

    // Create a new div with class 'tasks-list'
    const tasksListDiv = document.createElement('div');
    tasksListDiv.classList.add('tasks-list');

    const addTskButton = document.createElement('button');
    addTskButton.classList.add('add-tsk-btn');
    addTskButton.textContent = '+ Add Task';

    const taskForm = document.createElement('form');
    taskForm.classList.add('task-form');
    taskForm.classList.add('hide-form');

    const taskNameLabel = document.createElement('label');
    taskNameLabel.setAttribute('for', 'task-name');

    const taskNameInput = document.createElement('input');
    taskNameInput.setAttribute('type', 'text');
    taskNameInput.setAttribute('name', 'task-name');
    taskNameInput.setAttribute('id', 'task-name');
    taskNameInput.setAttribute('placeholder', "Task Name");
    taskNameInput.required = true;

    const taskDescriptionLabel = document.createElement('label');
    taskDescriptionLabel.setAttribute('for', 'task-desc');

    const taskDescriptionInput = document.createElement('textarea');
    taskDescriptionInput.setAttribute('name', 'task-desc');
    taskDescriptionInput.setAttribute('id', 'task-desc');
    taskDescriptionInput.setAttribute('placeholder', "Task Description");
    taskDescriptionInput.rows = 3;

    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'task-due');

    const dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.setAttribute('name', 'task-due');
    dueDateInput.setAttribute('id', 'task-due');

    const taskFormButtons = document.createElement('div');
    taskFormButtons.setAttribute('id', 'taskFormBtns');

    const submitTaskButton = document.createElement('button');
    submitTaskButton.setAttribute('type', 'submit');
    submitTaskButton.textContent = 'Add';
    submitTaskButton.setAttribute("id", "submitTaskBtn");

    const cancelTaskButton = document.createElement('button');
    cancelTaskButton.setAttribute("id", "taskCancelBtn");
    cancelTaskButton.textContent = "Cancel";

    const bottomTaskFormDiv = document.createElement('div');
    bottomTaskFormDiv.setAttribute('id', 'bottom-task-form');

    bottomTaskFormDiv.appendChild(dueDateLabel);
    bottomTaskFormDiv.appendChild(dueDateInput);
    bottomTaskFormDiv.appendChild(taskFormButtons);

    taskFormButtons.appendChild(submitTaskButton);
    taskFormButtons.appendChild(cancelTaskButton);

    taskForm.appendChild(taskNameLabel);
    taskForm.appendChild(taskNameInput);
    taskForm.appendChild(taskDescriptionLabel);
    taskForm.appendChild(taskDescriptionInput);
    taskForm.appendChild(bottomTaskFormDiv);

    tasksListDiv.appendChild(addTskButton);
    tasksListDiv.appendChild(taskForm);

    tasksDiv.appendChild(projectHeading);
    tasksDiv.appendChild(tasksListDiv);

    mainDiv.appendChild(tasksDiv);

    return mainDiv;
}
