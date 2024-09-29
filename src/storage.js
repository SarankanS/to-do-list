import ToDoList from "./todolist";
import Project from "./project";
import Task from "./task";
export default class Storage {
    static saveToDoList(data) {
        localStorage.setItem('todoList', JSON.stringify(data));
    }

    static getToDoList() {
        const data = JSON.parse(localStorage.getItem('todoList'));
        if (data) {
            // Rebuild the entire todo list from local storage
            const todoList = Object.assign(new ToDoList(), data);
            todoList.setProjects(
                todoList.getProjects().map(project => Object.assign(new Project(), project))
            );
            todoList.getProjects().forEach(project => {
                project.setTasks(project.getTasks().map(task => Object.assign(new Task(), task)));
            });
            return todoList;
        }
        return new ToDoList(); // Return empty ToDoList if no data found
    }
}