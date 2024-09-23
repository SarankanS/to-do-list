export default function createMain() {
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('main');

    const tasksDiv = document.createElement('div');
    tasksDiv.classList.add('tasks');

    const projectHeading = document.createElement('h2');
    projectHeading.setAttribute("id", "project-title");
    

    
    const addTskButton = document.createElement('button');
    addTskButton.classList.add('add-tsk-btn');
    addTskButton.textContent = '+ Add Task';

    tasksDiv.appendChild(projectHeading);
    tasksDiv.appendChild(addTskButton);

    mainDiv.appendChild(tasksDiv);

    return mainDiv;
}
