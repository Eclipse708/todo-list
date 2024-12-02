class Todo {
   
    constructor (id, title,description, dueDate, priority)  {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    toggleCompleted(status) {
        this.completed = status;
    }

    setDueDate(newDueDate) {
        this.setDueDate = newDueDate;
    }
}

export default Todo