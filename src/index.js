import "./styles.css";
import homePage from "./home";
import UI from './UI';
import ToDoList from './todolist';

homePage();
const myToDoList = new ToDoList();
const ui = new UI(myToDoList);  // Create instance of UI
ui.addProjectBtns();  // Call instance method
ui.addTasksBtns();
