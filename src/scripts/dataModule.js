import projectManager from "./projectManagerModule";
import Project from "./projectModule";

const storageManager = () => {

    const saveToLocalStorage = () => {  
        const projects = projectManager.getProjects();
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    const getFromLocalStorage = () => {
        const projects = localStorage.getItem('projects');

        if (projects) {
            /**
             * When dom is loaded, this method is initialized
             * Map returns an array which is responsible for
             * creating new instances of the Project class based
             * on the ones saved in local storage, hence preserving
             * their functionality
             */
            console.log('Fetched from local storage:', projects);
            return JSON.parse(projects).map(project => new Project(project.name));
        } else {
            return [];
        }
    }

    // const updateLocalStorage = (updatedItem, type = 'todo') => {
    //     const currentState = getFromLocalStorage();

    //     if (type === 'todo') {
    //         currentState.map((project) => {
    //             project.todos = project.todos.map((todo) => {
    //                 // identifies correct todo using id
    //                 if (todo.id == updatedItem.id) {
    //                     // actual update happens here
    //                     const updatedTodo = {...todo, ...updatedItem}; 
    //                     return updatedTodo;
    //                 }

    //                 return todo;
    //             });

    //             return project;
    //         });
    //     } else if (type === 'project') {
    //             currentState.map((project) => {
    //                 if (project.id == updatedItem.id) {
    //                     const updatedProject = {...project, ...updatedItem};
    //                     return updatedProject;
    //                 }
                    
    //                 return project;
    //         });
    //     }

    //     saveToLocalStorage();
    // }

    const initalizeLocalStorage = () => {
        const projects = getFromLocalStorage();
    }

    return {
        initalizeLocalStorage,
        saveToLocalStorage,
        getFromLocalStorage,
        // updateLocalStorage,
    }
}

export default storageManager;