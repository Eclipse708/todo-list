class Todo {
   
    constructor (title,description, dueDate, priority, notes)  {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = false;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }

    setDueDate(newDueDate) {
        this.setDueDate = newDueDate;
    }
}

export default Todo