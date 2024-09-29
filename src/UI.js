import Project from "./project";
import Task from "./task";
import Storage from './storage';

export default class UI {
    constructor() {
        // this.toDoList = todoList; 
        this.currentProjectName = 'Inbox';
        //TODO find a better way
        window.addEventListener('DOMContentLoaded', () => {
            this.toDoList =Storage.getToDoList();
            this.renderProjects();
            const inboxButton = document.querySelector('.inbox-btn'); 
            if (inboxButton) {
                inboxButton.click(); 
            }
        });
    }


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
        this.updateTodayTasks();
        this.updateWeeklyTasks();
        Storage.saveToDoList(this.toDoList);
        
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
        taskDiv.setAttribute('data-task-name', task.getName()); 

        

        const deleteContainer = document.createElement('div');
        deleteContainer.classList.add("complete-task");
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.classList.add('del-task');
        deleteContainer.appendChild(deleteButton);

        deleteButton.addEventListener("click", ()=>{
             this.removeTaskBox(task);
        })
    
        taskDiv.addEventListener("dblclick", ()=>{this.editTask(task)})


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

    removeTaskBox(task){
        this.toDoList.getProject(this.currentProjectName).deleteTask(task.getName());
        const taskDiv = document.querySelector(`[data-task-name="${task.getName()}"]`);
        taskDiv.remove();
        Storage.saveToDoList(this.toDoList);

    }

    editTask(task) {
        const fullscreen = document.createElement('div');
        fullscreen.setAttribute("id", "fullscreen-task-modal");
        fullscreen.classList.add('fullscreen-modal');
    
        const taskNameLabel = document.createElement('label');
        taskNameLabel.textContent = "Task Name:";
        const taskNameInput = document.createElement('input');
        taskNameInput.type = 'text';
        taskNameInput.value = task.getName();
    
        const taskDescLabel = document.createElement('label');
        taskDescLabel.textContent = "Task Description:";
        const taskDescInput = document.createElement('textarea');
        taskDescInput.value = task.getDescription();
    
        const taskDateLabel = document.createElement('label');
        taskDateLabel.textContent = "Due Date:";
        const taskDateInput = document.createElement('input');
        taskDateInput.type = 'date';
        taskDateInput.value = task.getDueDate();
    
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.classList.add('save-btn');
        saveButton.addEventListener('click', () => {
            const taskDiv = document.querySelector(`[data-task-name="${task.getName()}"]`);
            task.setName(taskNameInput.value);
            taskDiv.setAttribute('data-task-name', task.getName()); 

            task.setDescription(taskDescInput.value);
            const taskDate = taskDateInput.value ? taskDateInput.value : 'no due date';
            task.setDueDate(taskDate);
    
            this.updateTaskUI(task);
            Storage.saveToDoList(this.toDoList);
            fullscreen.remove();
        });
    
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('cancel-btn');
        cancelButton.addEventListener('click', () => {
            fullscreen.remove();
        });
    
        fullscreen.appendChild(taskNameLabel);
        fullscreen.appendChild(taskNameInput);
        fullscreen.appendChild(taskDescLabel);
        fullscreen.appendChild(taskDescInput);
        fullscreen.appendChild(taskDateLabel);
        fullscreen.appendChild(taskDateInput);
        fullscreen.appendChild(saveButton);
        fullscreen.appendChild(cancelButton);
    
        document.body.appendChild(fullscreen);
    }
    
    
    updateTaskUI(task) {
        const taskDiv = document.querySelector(`[data-task-name="${task.getName()}"]`);
        if (taskDiv) {
            const taskNameDiv = taskDiv.querySelector('.task-name');
            const taskDescDiv = taskDiv.querySelector('.task-desc');
            const taskDateDiv = taskDiv.querySelector('.task-date');
    
            
            taskNameDiv.textContent = task.getName();
            taskDescDiv.textContent = task.getDescription();
            taskDateDiv.textContent = task.getDueDate();
    
            
            taskDiv.setAttribute('data-task-name', task.getName());
        }
        
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
        Storage.saveToDoList(this.toDoList);
    }

    addProjectBtns() {
        const form = document.querySelector(".proj-form");
        const addPrjPopupBtn = document.querySelector(".add-prj-btn");
        
        const inboxButton = document.querySelector('.inbox-btn');
        const todayButton = document.querySelector('.today-btn');
        const upcomingButton = document.querySelector('.week-btn');
        
        const cancelButton = document.querySelector('#projCancelBtn');

        addPrjPopupBtn.addEventListener("click", this.showProjectForm);
        form.addEventListener("submit", (e) => this.createProject(e));
        
        inboxButton.addEventListener('click', () => this.openProject('Inbox'));
        todayButton.addEventListener('click', () => this.openProject('Today'));
        upcomingButton.addEventListener('click', () => this.openProject('Week')); 
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

    // addProjectBox(name){
    //     const projectList = document.querySelector("#projects-container");
    //     const projectBox = document.createElement("button");
    //     const addProjectButton = projectList.querySelector('.add-prj-btn');
    //     projectBox.setAttribute("id", `${name}-box`);
    //     projectBox.classList.add("prj-btn");

    //     projectBox.textContent = name;
    //     addProjectButton.insertAdjacentElement('beforebegin', projectBox);
    //     projectBox.addEventListener("click", () => this.openProject(name));

    // }
    addProjectBox(name){
        const projectList = document.querySelector("#projects-container");
        const projBoxContainer = document.createElement("div");
        projBoxContainer.classList.add("proj-box-container");
        projBoxContainer.setAttribute("id", `${name}-box`);


        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.classList.add('del-proj');
        deleteButton.textContent = "X";


        const projectBox = document.createElement("button");
        const addProjectButton = projectList.querySelector('.add-prj-btn');
        // projectBox.setAttribute("id", `${name}-box`);
        projectBox.classList.add("prj-btn");
        projectBox.textContent = name;

        projBoxContainer.appendChild(projectBox);
        projBoxContainer.appendChild(deleteButton);

        addProjectButton.insertAdjacentElement('beforebegin', projBoxContainer);
        projectBox.addEventListener("click", () => this.openProject(name));
        deleteButton.addEventListener("click", () => this.removeProject(name));

    }

    openProject(name) {
        
        const title = document.querySelector("#project-title");
        title.textContent = name;

        const project = this.toDoList.getProject(name);
        const tasks = project.getTasks();

        this.currentProjectName = name; 
        this.renderTasks(tasks);

        const addTaskButton = document.querySelector(".add-tsk-btn");
        if (name === "Today" || name === "Week") {
            addTaskButton.style.display = 'none'; 
        } else {
            addTaskButton.style.display = 'inline-block'; 
        }
    }

    removeProject(name){
        this.toDoList.deleteProject(name);
        const projectDiv = document.querySelector(`#${name}-box`);
        projectDiv.remove();
        Storage.saveToDoList(this.toDoList); 

    }
    

    renderTasks(tasks) {
        const taskContainer = document.querySelector(".tasks-list"); 
        taskContainer.querySelectorAll('.task').forEach(task => task.remove());
        tasks.forEach(task => {
            this.addTaskBox(task); 
        });

    }

    updateTodayTasks(){
        const projects = this.toDoList.getProjects();
        projects.forEach((project) => {
            if (project.getName()== 'Today' || project.getName()=='Week'){ return;}
            let todayTasks = project.getTasksToday();
            todayTasks.forEach((task)=>{
                this.toDoList.getProject("Today").addTask(task);
                Storage.saveToDoList(this.toDoList);

            })
            
        })
    }
    updateWeeklyTasks(){
        const projects = this.toDoList.getProjects();
        projects.forEach((project) => {
            if (project.getName()== 'Today' || project.getName()=='Week'){ return;}
            let weeklyTasks = project.getWeeklyTasks();
            weeklyTasks.forEach((task)=>{
                this.toDoList.getProject("Week").addTask(task);
                Storage.saveToDoList(this.toDoList);

            })
            
        })
    }

    renderProjects() {
        const projects = this.toDoList.getProjects(); 
        
        const projectList = document.querySelector("#projects-container");
        projectList.querySelectorAll('.prj-btn').forEach(button => button.remove());
    
        projects.forEach(project => {
            if (project.getName() == 'Today' || project.getName()=='Week' || project.getName()=='Inbox'){ return;}
            this.addProjectBox(project.getName());
        });
    }
    

}


