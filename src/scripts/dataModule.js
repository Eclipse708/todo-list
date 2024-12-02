import projectManager from "./projectManagerModule";

const storageManager = () => {

    const saveToLocalStorage = () => {
        const projects = projectManager.getProjects();
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    const getFromLocalStorage = () => {
        const projects = localStorage.getItem('projects');

        if (projects) {
            return JSON.parse(projects);
        } else {
            return [];
        }
    }

    const updateLocalStorage = (updatedItem, type = 'todo') => {
        const currentState = getFromLocalStorage();

        if (type === 'todo') {
            currentState.map((project) => {
                project.todos = project.todos.map((todo) => {
                    // identifies correct todo, title is used as id
                    if (todo.title == updatedItem.title) {
                        // actual update happens here
                        const updatedTodo = {...todo, ...updatedItem}; 
                        return updatedTodo;
                    }

                    return todo;
                });

                return project;
            });
        } else if (type === 'project') {
                currentState.map((project) => {
                    if (project.name == updatedItem.name) {
                        const updatedProject = {...project, ...updatedItem};
                        return updatedProject;
                    }
                    
                    return project;
            });
        }

        saveToLocalStorage();
    }

    const generateId = (type) => {
        const currentState = getFromLocalStorage();
        if (type === 'todo') {
            currentState.map((project) => {
                project.todos  = project.todos.map((todo) => {
                    
                });
            });
        }
    }

    const init = () => {
        saveToLocalStorage();
    }

    return {
        init,
        getFromLocalStorage,
        updateLocalStorage,
    }
}

export default storageManager;