class Todo {
   
    constructor (title,description, dueDate, priority, notes, checkList)  {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checkList = checkList;
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