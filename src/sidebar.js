export default function createSidebar() {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    const defaultProjs = document.createElement("div");
    defaultProjs.classList.add("dft-proj-list");

    //TODO: Add back later, when genearl add task functionality created
    // const addTaskButton = document.createElement('button');
    // addTaskButton.classList.add('general-add-task');
    // addTaskButton.innerHTML = '+ Add Task';

    const inboxButton = document.createElement('button');
    inboxButton.classList.add('inbox-btn');
    inboxButton.textContent = 'Inbox';

    const todayButton = document.createElement('button');
    todayButton.classList.add('today-btn');
    todayButton.textContent = 'Today';

    const upcomingButton = document.createElement('button');
    upcomingButton.classList.add('week-btn');
    upcomingButton.textContent = 'Weekly';
    
    //TODO: Add back later, when genearl add task functionality created 
    // defaultProjs.appendChild(addTaskButton);
    defaultProjs.appendChild(inboxButton);
    defaultProjs.appendChild(todayButton);
    defaultProjs.appendChild(upcomingButton);

    const projectsDiv = document.createElement('div');
    projectsDiv.classList.add('projects');

    const projectsHeading = document.createElement('h2');
    projectsHeading.textContent = 'Projects';
    projectsHeading.setAttribute("id", "projects");

    const addProjectButton = document.createElement('button');
    addProjectButton.classList.add('add-prj-btn');
    addProjectButton.textContent = '+ Add Project';

    const projectsContainer = document.createElement('div');  
    projectsContainer.setAttribute('id', 'projects-container');

    
    const form = document.createElement('form');
    form.classList.add('proj-form');
    form.classList.add('hide-form');

    const projNameLabel = document.createElement('label');
    projNameLabel.setAttribute('for', 'project-name');  

    const projNameInput = document.createElement('input');
    projNameInput.setAttribute('type', 'text');
    projNameInput.setAttribute('name', 'project-name');
    projNameInput.setAttribute('id', 'project-name');  
    projNameInput.setAttribute('placeholder', "Project Name");
    projNameInput.required = true;

    const projFormButtons = document.createElement("div");
    projFormButtons.setAttribute("id", "prjFormBtns");

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Add';
    submitButton.setAttribute("id", "submitProjBtn");

    const cancelButton = document.createElement('button');
    cancelButton.setAttribute("id", "projCancelBtn");
    cancelButton.textContent = "Cancel";

    projFormButtons.appendChild(submitButton);
    projFormButtons.appendChild(cancelButton);

    form.appendChild(projNameLabel);
    form.appendChild(projNameInput);
    form.appendChild(projFormButtons) ;
    
    projectsDiv.appendChild(projectsHeading);
    projectsDiv.appendChild(projectsContainer);  
    projectsContainer.appendChild(addProjectButton);
    projectsContainer.appendChild(form);

    sidebar.appendChild(defaultProjs);
    sidebar.appendChild(projectsDiv);

    return sidebar;
}
