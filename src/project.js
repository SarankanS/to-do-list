import { toDate, isToday, isThisWeek} from 'date-fns'
export default class Project{
    constructor(name){
        this.name = name;
        this.tasks = [];
    }

    setName(name){
        this.name = name;
    }

    getName(){
        return this.name;
    }

    setTasks(tasks){
        this.tasks = tasks;
    }
    
    getTasks(){
        return this.tasks;
    }

    getTask(taskName){
        return this.tasks.find((task) => task.getName() == taskName);
    }

    contains(taskName){
        return  this.tasks.some((task) => taskName == task.getName());
    }

    addTask(newTask){
        if (this.contains(newTask.getName())) return;
        this.tasks.push(newTask);
    }

    deleteTask(taskName){
        this.tasks = this.tasks.filter((task) => task.getName() != taskName);
    }

    getTasksToday(){
        return this.tasks.filter((task)=>{
            const taskDate = new Date(task.getFormattedDate());
            return isToday(toDate(taskDate));
        })
    }

    getWeeklyTasks(){
        return this.tasks.filter((task)=>{
            const taskDate = new Date(task.getFormattedDate());
            console.log( isThisWeek(toDate(taskDate)));
            return isThisWeek(toDate(taskDate));
        })
    }
}