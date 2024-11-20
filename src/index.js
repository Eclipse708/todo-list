import "./styles.css";
import { Todo } from "./scripts/todoModule";
import { Project } from "./scripts/projectModule";
import { projectManager } from "./scripts/projectManagerModule";

let defaultProject = projectManager;
console.log(defaultProject.getProjects());

let todo1 = new Todo("Finish Odin project", "Work on the todo list project", "2024-12-01", "high");
let project1 = new Project('New Project');

project1.addTodo(todo1);
defaultProject.addProject(project1);
console.log(defaultProject.getProjects());
// console.log(project1.getTodos());