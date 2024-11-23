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
        projects = projects.filter(project => project.name != name);
    };

    const getProjects = () => projects;

    const activeProject = (projectName) => {
       const projectIndex = projects.findIndex(project => project.name === projectName);
       currentProject = projects[projectIndex];
    //    console.log(currentProject);
    }

    return {addProject, removeProject, getProjects, activeProject, currentProject};
})();

export default projectManager;