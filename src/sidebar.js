export default function createSidebar() {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    const defaultProjs = document.createElement("div");
    defaultProjs.classList.add("dft-proj-list");

    const addTaskButton = document.createElement('button');
    addTaskButton.classList.add('dft-prj-btn');
    addTaskButton.innerHTML = '+ Add Task';

    const inboxButton = document.createElement('button');
    inboxButton.classList.add('dft-prj-btn');
    inboxButton.textContent = 'Inbox';

    const todayButton = document.createElement('button');
    todayButton.classList.add('dft-prj-btn');
    todayButton.textContent = 'Today';

    const upcomingButton = document.createElement('button');
    upcomingButton.classList.add('dft-prj-btn');
    upcomingButton.textContent = 'Upcoming';

    defaultProjs.appendChild(addTaskButton);
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
    addProjectButton.innerHTML = '+ Add Project';

    const projectsContainer = document.createElement('div');  
    projectsContainer.setAttribute('id', 'projects-container');

    projectsDiv.appendChild(projectsHeading);
    projectsDiv.appendChild(addProjectButton);
    projectsDiv.appendChild(projectsContainer);  

    sidebar.appendChild(defaultProjs);
    sidebar.appendChild(projectsDiv);

    return sidebar;
}
