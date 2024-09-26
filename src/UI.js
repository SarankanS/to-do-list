import Project from "./project";
import ToDoList from "./todolist";
import Task from "./task";

export default class UI {
    constructor(todoList) {
        this.toDoList = todoList; 
        this.currentProjectName = 'Inbox';
        //TODO find a better way
        window.addEventListener('DOMContentLoaded', () => {
            const inboxButton = document.querySelector('.inbox-btn'); 
            if (inboxButton) {
                inboxButton.click(); 
            }
        });
    }

    // Tasks

    createTask(e){
        e.preventDefault();
        const form = document.querySelector(".task-form");
        const taskName = form.querySelector("#task-name").value.trim();;
        const taskDesc = form.querySelector("#task-desc").value.trim();;
        const taskDateInput = form.querySelector("#task-due").value;

        const taskDate = taskDateInput ? taskDateInput : 'no due date';
        const task = new Task(taskName, taskDate, taskDesc);

        this.toDoList.getProject("Inbox").addTask(task);
        this.toDoList.getProject(this.currentProjectName).addTask(task);


        form.classList.add("hide-form");
        form.reset();

        this.addTaskBox(task); 
    }


    addTasksBtns(){
        const form = document.querySelector(".task-form");
        const addTaskPopupBtn = document.querySelector(".add-tsk-btn");
        const cancelTaskPopupBtn = document.querySelector("#taskCancelBtn");

        addTaskPopupBtn.addEventListener("click", this.showTaskForm);
        cancelTaskPopupBtn.addEventListener("click", (e) =>{
            e.preventDefault();
            form.reset();
            this.showTaskForm();
        });
        form.addEventListener("submit", (e) => this.createTask(e));

    }


    showTaskForm(){
        const form = document.querySelector(".task-form");
        form.classList.toggle("hide-form");
    }

    addTaskBox(task) {
        const addTaskButton = document.querySelector(".add-tsk-btn");
    
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
    
        
        const deleteContainer = document.createElement('div');
        deleteContainer.classList.add("complete-task");
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.classList.add('del-task');
        deleteContainer.appendChild(deleteButton);
    
        
        const taskNameDiv = document.createElement('div');
        taskNameDiv.classList.add('task-name');
        taskNameDiv.textContent = task.name; 
    
        
        const taskDescDiv = document.createElement('div');
        taskDescDiv.classList.add('task-desc');
        taskDescDiv.textContent = task.description; 

        const fullDescription = task.description;
        const maxChars = 100; 
        const truncatedDescription = fullDescription.length > maxChars 
            ? fullDescription.substring(0, maxChars) + '...' 
            : fullDescription;
        taskDescDiv.textContent = truncatedDescription; 
    
        taskDescDiv.addEventListener('click', () => {
            if (taskDescDiv.textContent === truncatedDescription) {
                taskDescDiv.textContent = fullDescription; 
            } else {
                taskDescDiv.textContent = truncatedDescription; 
            }
        });

        const taskDateDiv = document.createElement('div');
        taskDateDiv.classList.add('task-date');
        taskDateDiv.textContent = task.date; 
    
        taskDiv.appendChild(deleteContainer);
        taskDiv.appendChild(taskNameDiv);
        taskDiv.appendChild(taskDescDiv);
        taskDiv.appendChild(taskDateDiv);
    
        
        addTaskButton.insertAdjacentElement('beforebegin', taskDiv);
    }

    // Project

    createProject(e) {
        e.preventDefault();
        const form = document.querySelector(".proj-form");
        const projectName = form.querySelector("#project-name").value;

        const project = new Project(projectName);
        this.toDoList.addProject(project); 

        form.classList.add("hide-form");
        form.reset();

        this.addProjectBox(project.getName());
    }

    addProjectBtns() {
        const form = document.querySelector(".proj-form");
        const addPrjPopupBtn = document.querySelector(".add-prj-btn");
        
        const inboxButton = document.querySelector('.inbox-btn'); // Assuming you have a class for the Inbox button
        const todayButton = document.querySelector('.today-btn'); // Same for Today
        const upcomingButton = document.querySelector('.week-btn'); // Same for Upcoming
        
        const cancelButton = document.querySelector('#projCancelBtn');

        addPrjPopupBtn.addEventListener("click", this.showProjectForm);
        form.addEventListener("submit", (e) => this.createProject(e));
        
        inboxButton.addEventListener('click', () => this.openProject('Inbox'));
        todayButton.addEventListener('click', () => this.openProject('Today'));
        upcomingButton.addEventListener('click', () => this.openProject('Week')); // Change from 'Upcoming' to 'Week'
        cancelButton.addEventListener("click", (e) =>{
            e.preventDefault();
            form.reset();
            this.showProjectForm();
        });
    }

    showProjectForm() {
        const form = document.querySelector(".proj-form");
        form.classList.toggle("hide-form");
    }

    addProjectBox(name){
        const projectList = document.querySelector("#projects-container");
        const projectBox = document.createElement("button");
        const addProjectButton = projectList.querySelector('.add-prj-btn');
        projectBox.setAttribute("id", `${name}-box`);
        projectBox.classList.add("prj-btn");

        projectBox.textContent = name;
        addProjectButton.insertAdjacentElement('beforebegin', projectBox);
        projectBox.addEventListener("click", () => this.openProject(name));

    }

    openProject(name) {
        
        const title = document.querySelector("#project-title");
        title.textContent = name;

        const project = this.toDoList.getProject(name);
        const tasks = project.getTasks();

        this.currentProjectName = name; 
        this.renderTasks(tasks);
    }

    renderTasks(tasks) {
        const taskContainer = document.querySelector(".tasks-list"); 
        taskContainer.querySelectorAll('.task').forEach(task => task.remove());
        tasks.forEach(task => {
            this.addTaskBox(task); 
        });

    }
}


