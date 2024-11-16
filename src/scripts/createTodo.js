export {todo}

function todo() {
   
    const createTodo = (title,description, dueDate, priority, notes, checkList) => {
        return {
            title,
            description,
            dueDate,
            priority,
            notes, 
           checkList
        }
    }
}