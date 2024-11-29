import Project from "./projectModule";

const projectManager = (() => {
    let projects = [];
    const defaultProject = new Project('Default');
    projects.push(defaultProject);
    let currentProject = projects[0];

    const addProject = (name) => {
        const newProject = new Project(name);
        projects.push(newProject);
    };

    const removeProject = (name) => {
        projects = projects.filter(project => project.name !== name);
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
    }

    const getProjects = () => projects;

    const activeProject = (projectName) => {
       const projectIndex = projects.findIndex(project => project.name === projectName);
       currentProject = projects[projectIndex];
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