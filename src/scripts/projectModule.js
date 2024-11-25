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
        this.todos = this.todos.filter(todo => todo.title !== title);
    }
    
    editTodo(baseTodo, updateTodo) {
        const todoIndex = this.todos.findIndex(todo => todo.title == baseTodo.title);
        console.log('update todo', updateTodo);
        console.log(todoIndex);
        console.log(this.todos[todoIndex]);
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