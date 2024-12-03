import Todo from "./todoModule";
import storageManager from "./dataModule";
class Project {

    constructor (name) {
        this.id = this.generateId();
        this.name = name;
        this.todos = [];
    }

    generateId() {
        const currentProjects = storageManager().getFromLocalStorage();
        let newId = 0;
        
        currentProjects.forEach((project) => {
            if (project.id > newId) {
                newId = project.id;
            }
        });

        return newId + 1;
    }

    addTodo(newTodo) {
        // console.log(this.getTodos());
        const todo = new Todo(newTodo.title, newTodo.description, newTodo.dueDate, newTodo.priority);
        this.todos.push(todo);

        // const projects = StorageManager().getFromLocalStorage();
        // projects.forEach((project) => {
        //     project.todos.forEach((projectTodo) => {
        //         // StorageManager().saveToLocalStorage();
        //     });
        // });
    }

    removeTodo(title) {
        this.todos = this.todos.filter(todo => todo.title !== title);
    }
    
    editTodo(baseTodo, updateTodo) {
        const todoIndex = this.todos.findIndex(todo => todo.id == baseTodo.id);
        // console.log('update todo', updateTodo);
        // console.log(todoIndex);
        // console.log(this.todos[todoIndex]);
        this.todos[todoIndex].title = updateTodo.title;
        this.todos[todoIndex].description = updateTodo.description;
        this.todos[todoIndex].dueDate = updateTodo.dueDate;
        this.todos[todoIndex].priority = updateTodo.priority;
    }

    getTodos() {
        return this.todos;
    }
}

export default Project