import Project from "./project";
import { compareAsc, toDate } from 'date-fns'
import Tasks from "./task";

export default class ToDoList{
    constructor(){
        this.projects = [];
        this.projects.push(new Project("Inbox"));
        this.projects.push(new Project("Today"));
        this.projects.push(new Project("Week"));
    }

    setProjects(projects){
        this.projects = projects;
    }
    getProjects(){
        return this.projects;
    }

    getProject(projectName){
        return this.projects.find((project) => project.getName() == projectName);
    }

    contains(projectName) {
        return this.projects.some((project) => project.getName() === projectName);
    }

    addProject(newProject){
        if (this.contains(newProject.getName())) return;
        this.projects.push(newProject);
    }

    deleteProject(projectName){
        const projectToDelete = this.getProject(projectName);
        if (projectToDelete) {
            this.projects.splice(this.projects.indexOf(projectToDelete), 1);
        }
    }

    updateTodayProject() {
        this.getProject("Today").setTasks([]);
        const todayProject = this.getProject("Today");
        this.projects.forEach(
            (project) =>{
                if (project.getName() != 'Today' && project.getName() != 'Week'){
                    let todayTasks = project.getTasksToday();
                    for (const task of todayTasks){
                        todayProject.addTask(task);
                    }
                }
            }
        )
    }

    updateWeekProject() {
        this.getProject("Week").setTasks([]);  
        const weeklyProject = this.getProject("Week");
    
        this.projects.forEach((project) => {
            if (project.getName() != 'Today' && project.getName() != 'Week') {
                let weekTasks = project.getWeeklyTasks(); 
                for (const task of weekTasks) {
                    weeklyProject.addTask(task);  
                }
            }
        });
    
        
        weeklyProject.setTasks(
            weeklyProject
                .getTasks()  
                .sort((taskA, taskB) => 
                    compareAsc(
                        toDate(new Date(taskA.getDateFormatted())),  
                        toDate(new Date(taskB.getDateFormatted()))   
                    )
                )
        );
    }
}