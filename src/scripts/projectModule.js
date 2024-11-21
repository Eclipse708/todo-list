class Project {
    constructor (name) {
        this.name = name;
        this.todos = [];
    }

    addTodo(todo) {
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