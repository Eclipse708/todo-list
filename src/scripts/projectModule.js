import Todo from "./todoModule";
class Project {
    constructor (name) {
        this.name = name;
        this.todos = [];
    }

    addTodo(newTodo) {
        const todo = new Todo(newTodo.title, newTodo.description, newTodo.dueDate, newTodo.priority);
        this.todos.push(todo);
    }

    removeTodo(title) {
        this.todos.filter(todo => todo.title != title);
    }

    getTodos() {
        return this.todos;
    }
}

export default Project