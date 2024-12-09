import Project from "./projectModule";
import storageManager from "./dataModule";

const projectManager = (() => {
    let projects = storageManager().getFromLocalStorage() || [];
    
    if (projects.length === 0) {
        const defaultProject = new Project('Default');
        projects.push(defaultProject);
    }

    let currentProject = projects[0];

    const addProject = (name) => {
        const newProject = new Project(name);
        projects.push(newProject);
        
        // update local storage
        storageManager().saveToLocalStorage(projects);
    };

    const removeProject = (name) => {
        projects = projects.filter(project => project.name !== name);
        storageManager().saveToLocalStorage(projects);
    };

    const renameProject = (baseProjectName, newProjectName) => {
        if (newProjectName === '') {
            return 1;
        }
        
        const projectIndex = projects.findIndex(project => project.name == baseProjectName);
        // console.log(projects[projectIndex].name);
        // console.log(newProjectName)
        // console.log(baseProjectName)
        projects[projectIndex].name = newProjectName;
        storageManager().saveToLocalStorage(projects);
    }

    const getProjects = () => projects;

    const activeProject = (projectName) => {
       const projectIndex = projects.findIndex(project => project.name === projectName);
       if (projectIndex !== -1) {
            currentProject = projects[projectIndex];
            storageManager().saveToLocalStorage(projects);
        }
        
       return currentProject;
    }

    const getCurrentProject = () => currentProject;

    return {
        addProject, 
        removeProject, 
        getProjects, 
        activeProject, 
        getCurrentProject,
        renameProject,
    };
})();

export default projectManager;