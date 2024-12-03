import storageManager from "./dataModule";

class Todo {
   
    constructor (title,description, dueDate, priority)  {
        this.id = this.generateId();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    generateId() {
        const currentTodos = storageManager().getFromLocalStorage();
        let newId = 0;
        
        currentTodos.forEach((project) => {
            project.todos.forEach((todo) => {
                if (todo.id > newId) {
                    newId = todo.id;
                }
            });
        });

        return newId + 1;
    }

    toggleCompleted(status) {
        this.completed = status;
    }

    setDueDate(newDueDate) {
        this.setDueDate = newDueDate;
    }
}

export default Todo